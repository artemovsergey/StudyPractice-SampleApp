'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const loadUserFromStorage = useAuthStore(s => s.loadUserFromStorage);

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  return <>{children}</>;
}