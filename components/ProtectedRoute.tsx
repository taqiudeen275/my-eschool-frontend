'use client'
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/auth/login');
      }
    }, [isLoading, isAuthenticated, router]);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    return isAuthenticated ? children : null;
  }