// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/auth';
import { User } from '@/lib/types';
import axios from 'axios';

const DJANGO_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

// GET: Get a specific user
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await axios.get<User>(`${DJANGO_BASE_URL}/api/users/${params.id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

// PUT: Update a user
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userData: User = await request.json();
    const response = await axios.put<User>(`${DJANGO_BASE_URL}/api/users/${params.id}/`, userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE: Delete a user
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await axios.delete(`${DJANGO_BASE_URL}/api/users/${params.id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json({}, { status: 204 }); // No Content
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}