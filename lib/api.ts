// lib/api.ts
import { fetchProtectedData, getAccessToken, patchProtectedData } from './auth';
import axios, { AxiosError } from 'axios';
import { User } from './types';

const DJANGO_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('Unauthorized');
    }

    const response = fetchProtectedData(accessToken, "users/users/")
    return response;
  } catch (error) {
    handleApiError(error);
    return []; // Or handle the error as appropriate for your app
  }
};

export const createUser = async (userData: User): Promise<User> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('Unauthorized');
    }

    const response = await axios.post<User>(`${DJANGO_BASE_URL}/api/users/`, userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw new Error('Failed to create user');
  }
};

export const fetchUser = async (id: number): Promise<User> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('Unauthorized');
    }

    const response = await fetchProtectedData(accessToken, `users/users/${id}/`);
    return response;
  } catch (error) {
    handleApiError(error);
    throw new Error('Failed to fetch user');
  }
};

export const updateUser = async (id: number, userData: User): Promise<User> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('Unauthorized');
    }

    const response = await patchProtectedData(accessToken, `users/users/${id}/`, userData);
    return response;
  } catch (error) {
    handleApiError(error);
    throw new Error('Failed to update user');
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('Unauthorized');
    }

    await axios.delete(`${DJANGO_BASE_URL}/api/users/${id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    handleApiError(error);
    throw new Error('Failed to delete user');
  }
};

// Centralized error handling (optional, but recommended)
const handleApiError = (error: unknown): void => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    console.error('API Error:', axiosError.response?.data || axiosError.message);
  } else {
    console.error('An unexpected error occurred:', error);
  }
};