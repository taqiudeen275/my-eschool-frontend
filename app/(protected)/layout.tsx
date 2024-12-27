'use client';

import Loading from '@/components/Loading';
import { useAuth } from '@/providers/AuthProvider';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return isAuthenticated ? children : null;
}
