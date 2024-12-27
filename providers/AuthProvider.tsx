/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { apiClient, useUser, User, auth } from '@/lib/apiClient';

interface AuthContextType {
  user: User | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, error, isLoading } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const token = document.cookie.includes('access_token=');
      if (user && !error && token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        if (pathname?.startsWith('/dashboard') || 
            pathname?.startsWith('/settings') || 
            pathname?.startsWith('/profile')) {
          router.push('/auth/login');
        }
      }
    };

    checkAuth();
  }, [user, error, pathname, router]);
  const login = async (email: string, password: string) => {
    try {
      const response = await auth.login(email, password)
         // Set tokens in cookies (httpOnly for security)
      document.cookie = `access_token=${response.access}; path=/; secure; samesite=strict`;
      document.cookie = `refresh_token=${response.refresh}; path=/; secure; samesite=strict`;
      
      router.push('/dashboard');
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout/');
      // Clear cookies
      document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      apiClient.clearTokens();
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
