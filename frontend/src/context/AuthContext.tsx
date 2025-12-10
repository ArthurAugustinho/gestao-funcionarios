import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { axiosClient, TOKEN_KEY } from '../api/axiosClient';

type UserInfo = {
  nome: string;
  email: string;
  role?: string;
} | null;

type LoginResponse = {
  accessToken: string;
  nome: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  user: UserInfo;
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
};

const USER_KEY = 'auth_user';
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provedor de autenticação: chama API de login, guarda token/usuário e restaura do localStorage.
export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserInfo>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const login = async (email: string, senha: string) => {
    const { data } = await axiosClient.post<LoginResponse>('/api/auth/login', { email, senha });
    setToken(data.accessToken);
    setUser({ nome: data.nome, email: data.email, role: data.role });
    localStorage.setItem(TOKEN_KEY, data.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify({ nome: data.nome, email: data.email, role: data.role }));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
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
