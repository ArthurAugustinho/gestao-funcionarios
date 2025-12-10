import axios from 'axios';

// Cliente axios centralizado; baseURL vem de variável de ambiente Vite.
export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptador de request para incluir JWT (pode ser ajustado depois).
axiosClient.interceptors.request.use((config) => {
  // Exemplos futuros: pegar token do localStorage/context e setar Authorization.
  return config;
});
