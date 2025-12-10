import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/AuthContext';
import LoginPage from '../pages/Login';
import FuncionariosPage from '../pages/Funcionarios/FuncionariosPage';

// Define as rotas da aplicação SPA.
export default function AppRouter() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/funcionarios"
        element={
          <Layout>
            <FuncionariosPage />
          </Layout>
        }
      />
      {/* Redireciona desconhecidos para login ou lista de funcionários conforme autenticado */}
      <Route
        path="*"
        element={<Navigate to={token ? '/funcionarios' : '/login'} replace />}
      />
    </Routes>
  );
}
