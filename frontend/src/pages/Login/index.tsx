import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Tela de login simples que simula autenticação local.
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!email || !senha) {
      setErro('Informe email e senha');
      return;
    }
    // Simula login; aqui chamaremos a API real depois.
    login('jwt-falso', { nome: 'Usuário', email });
    navigate('/funcionarios');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@sistema.com"
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="•••••••"
            />
          </label>
          {erro && <p className="auth-error">{erro}</p>}
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
