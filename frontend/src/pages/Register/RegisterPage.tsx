import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosClient } from '../../api/axiosClient';

type FormState = {
  nome: string;
  email: string;
  senha: string;
};

// Tela pública de cadastro de usuário (sign up).
export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({ nome: '', email: '', senha: '' });
  const [erro, setErro] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErro(null);
    setMensagem(null);

    if (!form.nome || !form.email || !form.senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      await axiosClient.post('/api/usuarios', {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        role: 'USER',
      });
      setMensagem('Usuário criado com sucesso. Redirecionando para login...');
      setForm({ nome: '', email: '', senha: '' });
      setTimeout(() => navigate('/login'), 1200);
    } catch (e: any) {
      const status = e?.response?.status;
      if (status === 400) {
        setErro('E-mail já cadastrado ou dados inválidos.');
      } else {
        setErro('Erro ao criar usuário.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Cadastre-se</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Nome
            <input
              type="text"
              value={form.nome}
              onChange={(e) => setForm((prev) => ({ ...prev, nome: e.target.value }))}
              placeholder="Seu nome"
              required
            />
          </label>
          <label>
            E-mail
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="seuemail@sistema.com"
              required
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              value={form.senha}
              onChange={(e) => setForm((prev) => ({ ...prev, senha: e.target.value }))}
              placeholder="••••••••"
              required
            />
          </label>
          {erro && <p className="auth-error">{erro}</p>}
          {mensagem && <p className="auth-success">{mensagem}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Cadastrar'}
          </button>
        </form>
        <p style={{ marginTop: '1rem' }}>
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
