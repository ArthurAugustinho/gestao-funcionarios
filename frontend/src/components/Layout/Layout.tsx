import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

type LayoutProps = {
  children: ReactNode;
};

// Layout com cabeçalho fixo, branding à esquerda e navegação/ação de logout à direita.
export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      <header className="layout__header">
        <span className="layout__brand">Gestão de colaboradores</span>
        <nav className="layout__nav">
          <Link to="/usuarios">Usuários</Link>
          <Link to="/funcionarios">Funcionários</Link>
          {user ? <button onClick={logout}>Sair</button> : <Link to="/login">Login</Link>}
        </nav>
      </header>
      <main className="layout__content">{children}</main>
    </div>
  );
}
