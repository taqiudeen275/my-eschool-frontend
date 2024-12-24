// app/api/auth/logout/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(): Promise<Response> {
  // Delete cookies by setting their value to empty and maxAge to 0
  (await
        // Delete cookies by setting their value to empty and maxAge to 0
        cookies()).set({
    name: 'access_token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
    sameSite: 'strict',
  });

  (await cookies()).set({
    name: 'refresh_token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
    sameSite: 'strict',
  });

  return NextResponse.json({ message: 'Logout successful' });
}
