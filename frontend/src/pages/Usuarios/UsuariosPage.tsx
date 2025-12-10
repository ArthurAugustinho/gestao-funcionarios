import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { axiosClient } from '../../api/axiosClient';

type Usuario = {
  id: number;
  nome: string;
  email: string;
  role: string;
};

type UsuarioForm = {
  nome: string;
  email: string;
  senha: string;
  role: string;
};

// Tela protegida de usuários: lista e cria novos usuários via API.
export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [form, setForm] = useState<UsuarioForm>({
    nome: '',
    email: '',
    senha: '',
    role: 'ADMIN',
  });
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const carregarUsuarios = async () => {
    setErro(null);
    try {
      const { data } = await axiosClient.get<Usuario[]>('/api/usuarios');
      setUsuarios(data);
    } catch (e) {
      setErro('Não foi possível carregar os usuários.');
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMensagem(null);
    setErro(null);

    if (!form.nome || !form.email || !form.senha || !form.role) {
      setErro('Preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      await axiosClient.post('/api/usuarios', {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        role: form.role,
      });
      setForm({ nome: '', email: '', senha: '', role: 'ADMIN' });
      setMensagem('Usuário criado com sucesso.');
      await carregarUsuarios();
    } catch (e) {
      setErro('Erro ao criar usuário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">Usuários</p>
          <h2>Gestão de Usuários</h2>
        </div>
      </header>

      <div className="card">
        <h3>Novo usuário</h3>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Nome
            <input
              type="text"
              value={form.nome}
              onChange={(e) => setForm((prev) => ({ ...prev, nome: e.target.value }))}
              placeholder="Nome completo"
            />
          </label>
          <label>
            E-mail
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="usuario@sistema.com"
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              value={form.senha}
              onChange={(e) => setForm((prev) => ({ ...prev, senha: e.target.value }))}
              placeholder="••••••••"
            />
          </label>
          <label>
            Papel (role)
            <select
              value={form.role}
              onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
            >
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
            </select>
          </label>
          {erro && <p className="auth-error">{erro}</p>}
          {mensagem && <p className="auth-success">{mensagem}</p>}
          <button className="primary" type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </form>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Papel</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.nome}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
            {!usuarios.length && (
              <tr>
                <td colSpan={3}>Nenhum usuário encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
