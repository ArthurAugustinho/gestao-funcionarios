import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import LoginPage from '../pages/Login';
import FuncionariosPage from '../pages/Funcionarios/FuncionariosPage';
import { PrivateRoute } from './PrivateRoute';

// Define as rotas da aplicação SPA e protege /funcionarios com checagem de token.
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/funcionarios"
        element={
          <PrivateRoute>
            <Layout>
              <FuncionariosPage />
            </Layout>
          </PrivateRoute>
        }
      />
      {/* Redireciona desconhecidos para login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
