import axios from 'axios';

const TOKEN_KEY = 'auth_token';

// Cliente axios centralizado; baseURL vem de variável de ambiente Vite.
export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Intercepta requests para anexar o JWT salvo (quando existir).
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { TOKEN_KEY };
