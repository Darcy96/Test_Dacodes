'use client'

import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from './context/AuthContext'
import ReactQueryProvider from '@context/ReactQueryProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
