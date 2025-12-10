import { createContext, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';

type UserInfo = {
  nome: string;
  email: string;
  role?: string;
} | null;

type AuthContextType = {
  user: UserInfo;
  token: string | null;
  login: (token: string, user: UserInfo) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provedor simples de autenticação; guarda token/usuário em memória.
export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserInfo>(null);

  const login = (newToken: string, userInfo: UserInfo) => {
    setToken(newToken);
    setUser(userInfo);
    // Aqui poderíamos persistir no localStorage.
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, token, login, logout }),
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return ctx;
}
