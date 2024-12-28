/* eslint-disable @typescript-eslint/no-explicit-any */
// apiClient.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
}

interface AuthTokens {
  access: string;
  refresh: string;
}

class DjangoApiClient {
  private axiosInstance: AxiosInstance;
  private refreshTokenPromise: Promise<string> | null = null;

  constructor(config: ApiClientConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      withCredentials: true, // Important for cookies to work cross-domain
    });

    // Add request interceptor to always include the latest access token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = Cookies.get('access_token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for handling token refresh
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // Check if error is 401 and we haven't already tried refreshing
        if (
          error.response?.status === 401 && 
          !originalRequest._retry &&
          // Prevent infinite loop by not retrying on the refresh token endpoint
          !originalRequest.url?.includes('token/refresh/')
        ) {
          originalRequest._retry = true;

          try {
            // Get a new access token
            const newAccessToken = await this.refreshAccessToken();
            
            // Update the failed request's authorization header
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            
            // Retry the original request
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            // If refresh fails, clear tokens and reject
            this.clearTokens();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Token management methods with cookies
  setTokens(tokens: AuthTokens): void {
    // Set cookies with appropriate security options
    Cookies.set('access_token', tokens.access, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: 1, // 1 day for access token
      path: '/'
    });
    
    Cookies.set('refresh_token', tokens.refresh, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: 7, // 7 days for refresh token
      path: '/'
    });
  }

  clearTokens(): void {
    Cookies.remove('access_token', { path: '/' });
    Cookies.remove('refresh_token', { path: '/' });
  }

  private async refreshAccessToken(): Promise<string> {
    // Ensure we only make one refresh request at a time
    if (!this.refreshTokenPromise) {
      this.refreshTokenPromise = (async () => {
        const refreshToken = Cookies.get('refresh_token');
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        try {
          // Create a new axios instance for refresh request to avoid interceptors
          const response = await axios.post(
            `${this.axiosInstance.defaults.baseURL}/token/refresh/`,
            { refresh: refreshToken },
            { withCredentials: true }
          );

          const { access } = response.data;
          
          // Update access token cookie
          Cookies.set('access_token', access, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: 1,
            path: '/'
          });
          
          return access;
        } finally {
          this.refreshTokenPromise = null;
        }
      })();
    }

    return this.refreshTokenPromise;
  }

  // Generic request methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}

// Create and export a singleton instance
export const apiClient = new DjangoApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
});

// Type definitions for your API responses
export interface User {
  id: number;
  email: string;
  username: string;
  roles: string[];
  permissions: string[];
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

// API hooks using SWR
import useSWR, { SWRConfiguration } from 'swr';

export function useUser(config?: SWRConfiguration) {
  const res = useSWR<User>('/users/me/', (url) => apiClient.get(url), config);
  console.log("RES:", res);
  return res;
}

// Authentication helper functions
export const auth = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/token/', {
      email,
      password,
    });
    apiClient.setTokens(response);
    return response;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout/');
    apiClient.clearTokens();
  },

  async register(userData: {
    email: string;
    password: string;
    username: string;
  }): Promise<User> {
    return apiClient.post<User>('/auth/register/', userData);
  },
};