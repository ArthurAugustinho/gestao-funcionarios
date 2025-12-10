import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import LoginPage from '../pages/Login';
import FuncionariosPage from '../pages/Funcionarios/FuncionariosPage';
import UsuariosPage from '../pages/Usuarios/UsuariosPage';
import RegisterPage from '../pages/Register/RegisterPage';
import { PrivateRoute } from './PrivateRoute';

// Define as rotas da aplicação SPA e protege /funcionarios e /usuarios com checagem de token.
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
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
      <Route
        path="/usuarios"
        element={
          <PrivateRoute>
            <Layout>
              <UsuariosPage />
            </Layout>
          </PrivateRoute>
        }
      />
      {/* Redireciona desconhecidos para login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
