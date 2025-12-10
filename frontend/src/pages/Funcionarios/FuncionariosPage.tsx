import { useEffect, useMemo, useState } from 'react';
import { axiosClient } from '../../api/axiosClient';
import type { StatusFuncionario } from './types';

type Funcionario = {
  id: number;
  nome: string;
  dataAdmissao: string;
  salario: number;
  status: StatusFuncionario;
  createdAt?: string;
  updatedAt?: string;
};

type FuncionarioForm = {
  nome: string;
  dataAdmissao: string;
  salario: string;
  status: StatusFuncionario;
};

const STATUS_OPTIONS: StatusFuncionario[] = ['ATIVO', 'INATIVO'];

// Tela de funcionários: lista com filtros e formulário de criação usando a API real.
export default function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const [filtroNome, setFiltroNome] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<StatusFuncionario | ''>('');

  const [form, setForm] = useState<FuncionarioForm>({
    nome: '',
    dataAdmissao: '',
    salario: '',
    status: 'ATIVO',
  });

  const filtros = useMemo(
    () => ({
      nome: filtroNome || undefined,
      status: filtroStatus || undefined,
    }),
    [filtroNome, filtroStatus],
  );

  const carregarFuncionarios = async () => {
    setLoading(true);
    setErro(null);
    try {
      const { data } = await axiosClient.get<Funcionario[]>('/api/funcionarios', {
        params: filtros,
      });
      setFuncionarios(data);
    } catch (e) {
      setErro('Não foi possível carregar os funcionários.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarFuncionarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros.nome, filtros.status]);

  const handleCreate = async () => {
    if (!form.nome || !form.dataAdmissao || !form.salario) {
      setErro('Preencha todos os campos.');
      return;
    }
    setErro(null);
    setLoading(true);
    try {
      await axiosClient.post('/api/funcionarios', {
        nome: form.nome,
        dataAdmissao: form.dataAdmissao,
        salario: Number(form.salario),
        status: form.status,
      });
      setForm({ nome: '', dataAdmissao: '', salario: '', status: 'ATIVO' });
      await carregarFuncionarios();
    } catch (e) {
      setErro('Erro ao salvar funcionário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">Funcionários</p>
          <h2>Lista de colaboradores</h2>
        </div>
      </header>

      <div className="card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <label>
            Filtro por nome
            <input
              type="text"
              value={filtroNome}
              onChange={(e) => setFiltroNome(e.target.value)}
              placeholder="Buscar por nome"
            />
          </label>
        </div>
        <div>
          <label>
            Status
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value as StatusFuncionario | '')}
            >
              <option value="">Todos</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button className="primary" onClick={carregarFuncionarios} disabled={loading}>
          {loading ? 'Carregando...' : 'Recarregar'}
        </button>
      </div>

      <div className="card">
        <h3>Novo funcionário</h3>
        <div className="auth-form">
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
            Data de admissão
            <input
              type="date"
              value={form.dataAdmissao}
              onChange={(e) => setForm((prev) => ({ ...prev, dataAdmissao: e.target.value }))}
            />
          </label>
          <label>
            Salário
            <input
              type="number"
              step="0.01"
              value={form.salario}
              onChange={(e) => setForm((prev) => ({ ...prev, salario: e.target.value }))}
              placeholder="0,00"
            />
          </label>
          <label>
            Status
            <select
              value={form.status}
              onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as StatusFuncionario }))}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <button className="primary" onClick={handleCreate} disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
          {erro && <p className="auth-error">{erro}</p>}
        </div>
      </div>

      <div className="card">
        {loading && <p>Carregando...</p>}
        {!loading && (
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Data de Admissão</th>
                <th>Salário (R$)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.map((f) => (
                <tr key={f.id}>
                  <td>{f.nome}</td>
                  <td>{new Date(f.dataAdmissao).toLocaleDateString('pt-BR')}</td>
                  <td>{f.salario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td>
                    <span className={`tag tag--${f.status.toLowerCase()}`}>{f.status}</span>
                  </td>
                </tr>
              ))}
              {!funcionarios.length && (
                <tr>
                  <td colSpan={4}>Nenhum funcionário encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
