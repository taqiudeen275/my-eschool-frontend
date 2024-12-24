  "use server"
import axios from 'axios';
import { cookies } from 'next/headers';

export async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  return accessToken;
}

export async function getRefreshToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;
  return refreshToken;
}

export async function isAuthenticated(): Promise<boolean> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return false;
  }

  try {
    // Verify the token with Django
    const res = await axios.post(`${process.env.NEXT_PUBLIC_DJANGO_BASE_URL}/api/token/verify/`, {
      token: accessToken,
    },{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (res.data.detail === "Token is invalid or expired"){
      return false;
    }else{
      return true
    }
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
}

// Function to refresh the access token
export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_DJANGO_BASE_URL}/api/token/refresh/`, {
      refresh: refreshToken,
    });

    // Update the access token cookie
    (await
          // Update the access token cookie
          cookies()).set({
      name: 'access_token',
      value: response.data.access,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 5, // 5 days (adjust)
      path: '/',
      sameSite: 'strict',
    });

    return response.data.access;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

// Example of a function to fetch data from a protected API route
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchProtectedData(accessToken: string, api:string): Promise<any | null> {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_BASE_URL}/${api}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching protected data:', error);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function postProtectedData(accessToken: string, api:string, data:any): Promise<any | null> {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_DJANGO_BASE_URL}/${api}`,
      data
    , {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating protected data:', error);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function putProtectedData(accessToken: string, api:string, data:any): Promise<any | null> {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_DJANGO_BASE_URL}/${api}`,
      data
    , {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating protected data:', error);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function patchProtectedData(accessToken: string, api:string, data:any): Promise<any | null> {
  try {
    const response = await axios.patch(`${process.env.NEXT_PUBLIC_DJANGO_BASE_URL}/${api}`,
      data
    , {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating protected data:', error);
    return null;
  }
}