'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../auth/AuthContext';

const LOGIN_PATH = process.env.NEXT_PUBLIC_LOGIN_PATH || '/acces-prive-87';

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.replace(LOGIN_PATH);
    }
  }, [loading, session, router]);

  if (loading || !session) return null;

  return <>{children}</>;
}

export default RequireAdmin;
