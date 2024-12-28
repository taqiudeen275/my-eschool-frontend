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
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Add request interceptor to include the latest access token
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
        
        if (
          error.response?.status === 401 && 
          !originalRequest._retry &&
          !originalRequest.url?.includes('token/refresh/')
        ) {
          originalRequest._retry = true;

          try {
            const newAccessToken = await this.refreshAccessToken();
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            this.clearTokens();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  setTokens(tokens: AuthTokens): void {
    Cookies.set('access_token', tokens.access, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
    
    Cookies.set('refresh_token', tokens.refresh, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
  }

  clearTokens(): void {
    Cookies.remove('access_token', { path: '/' });
    Cookies.remove('refresh_token', { path: '/' });
  }

  private async refreshAccessToken(): Promise<string> {
    if (!this.refreshTokenPromise) {
      this.refreshTokenPromise = (async () => {
        const refreshToken = Cookies.get('refresh_token');
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        try {
          // Use the main axios instance but with the refresh token payload
          const response = await this.axiosInstance.post('/token/refresh/', {
            refresh: refreshToken  // This is what was missing - explicitly sending the refresh token
          });

          const { access } = response.data;
          
          // Update only the access token
          Cookies.set('access_token', access, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
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

export const apiClient = new DjangoApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
});

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

import useSWR, { SWRConfiguration } from 'swr';

export function useUser(config?: SWRConfiguration) {
  const res = useSWR<User>('/users/me/', (url) => apiClient.get(url), config);
  return res;
}

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