// app/api/auth/login/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import axios from 'axios';

interface LoginRequestBody {
  username: string;
  password: string;
}

interface TokenResponse {
  access: string;
  refresh: string;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body: LoginRequestBody = await request.json();
    const response = await axios.post<TokenResponse>(
      `${process.env.NEXT_PUBLIC_DJANGO_BASE_URL}/api/token/`,
      body
    );

    // Set HTTP-only cookies using the `cookies` API
    (await
          // Set HTTP-only cookies using the `cookies` API
          cookies()).set({
      name: 'access_token',
      value: response.data.access,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 5, // 5 days (adjust as needed)
      path: '/',
      sameSite: 'strict',
    });

    (await cookies()).set({
      name: 'refresh_token',
      value: response.data.refresh,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days (adjust as needed)
      path: '/',
      sameSite: 'strict',
    });
    console.log(response.data.refresh)
    return NextResponse.json({ message: 'Login successful' });
  } catch (error: unknown) {
    console.error('Login error:', error);

    const status = axios.isAxiosError(error) && error.response?.status ? error.response.status : 500;
    return NextResponse.json({ message: 'Login failed' }, { status });
  }
}
