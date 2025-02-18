'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

interface AuthContextType {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string | null;
  } | null;
  loading: boolean;
  login: (provider?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(session?.user || null);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    } else {
      setUser(null);
    }
  }, [session]);

  const login = (provider: string = "github") => {
    signIn(provider);
  };

  const logout = () => {
    signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading: status === "loading", login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
