/* eslint-disable @typescript-eslint/no-explicit-any */
// apiClient.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

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
    });

    // Add response interceptor for handling token refresh
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newAccessToken = await this.refreshAccessToken();
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            // Handle refresh token failure (e.g., logout user)
            this.clearTokens();
            throw refreshError;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Token management methods
  setTokens(tokens: AuthTokens): void {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
    this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`;
  }

  clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete this.axiosInstance.defaults.headers.common['Authorization'];
  }

  private async refreshAccessToken(): Promise<string> {
    // Ensure we only make one refresh request at a time
    if (!this.refreshTokenPromise) {
      this.refreshTokenPromise = (async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        try {
          const response = await this.axiosInstance.post('/token/refresh/', {
            refresh: refreshToken,
          });

          const { access } = response.data;
          localStorage.setItem('access_token', access);
          this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
          
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
  console.log("RES:------", res)
  return res
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