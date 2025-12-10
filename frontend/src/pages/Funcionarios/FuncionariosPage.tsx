import { useCallback, useEffect, useMemo, useState } from 'react';
import { axiosClient } from '../../api/axiosClient';
import type { Funcionario, StatusFuncionario } from './types';
import { EmployeeFilters } from './components/EmployeeFilters';
import { EmployeeForm, type EmployeeFormValues } from './components/EmployeeForm';
import { EmployeeTable } from './components/EmployeeTable';
import './styles.css';

const formatDate = (iso: string) => new Date(iso).toLocaleDateString('pt-BR');
const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const toFormValues = (func: Funcionario): EmployeeFormValues => ({
  nome: func.nome,
  dataAdmissao: func.dataAdmissao.slice(0, 10),
  salario: String(func.salario),
  status: func.status,
});

const toViewModel = (f: Funcionario): Funcionario => ({
  ...f,
  dataFormatada: formatDate(f.dataAdmissao),
  salarioFormatado: formatCurrency(f.salario),
});

// Página principal de funcionários com CRUD completo (GET, POST, PUT, DELETE) usando API autenticada.
export default function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [savingCreate, setSavingCreate] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);

  const [filtroNome, setFiltroNome] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<StatusFuncionario | ''>('');

  const [editing, setEditing] = useState<Funcionario | null>(null);

  const filtros = useMemo(
    () => ({
      nome: filtroNome || undefined,
      status: filtroStatus || undefined,
    }),
    [filtroNome, filtroStatus],
  );

  const carregarFuncionarios = useCallback(async () => {
    setLoadingList(true);
    setErro(null);
    try {
      const { data } = await axiosClient.get<Funcionario[]>('/api/funcionarios', { params: filtros });
      setFuncionarios(data.map(toViewModel));
    } catch (e) {
      setErro('Não foi possível carregar os funcionários.');
    } finally {
      setLoadingList(false);
    }
  }, [filtros]);

  useEffect(() => {
    carregarFuncionarios();
  }, [carregarFuncionarios]);

  const handleSubmit = async (values: EmployeeFormValues) => {
    setErro(null);
    setMensagem(null);
    const payload = {
      nome: values.nome,
      dataAdmissao: values.dataAdmissao,
      salario: Number(values.salario),
      status: values.status,
    };

    // Editar
    if (editing) {
      setSavingEdit(true);
      try {
        await axiosClient.put(`/api/funcionarios/${editing.id}`, payload);
        setMensagem('Funcionário atualizado com sucesso.');
        setEditing(null);
        await carregarFuncionarios();
      } catch (e) {
        setErro('Erro ao atualizar funcionário.');
      } finally {
        setSavingEdit(false);
      }
      return;
    }

    // Criar
    setSavingCreate(true);
    try {
      await axiosClient.post('/api/funcionarios', payload);
      setMensagem('Funcionário criado com sucesso.');
      await carregarFuncionarios();
    } catch (e) {
      setErro('Erro ao salvar funcionário.');
    } finally {
      setSavingCreate(false);
    }
  };

  const handleEdit = useCallback((funcionario: Funcionario) => {
    setEditing(funcionario);
    setMensagem(null);
    setErro(null);
  }, []);

  const handleCancelEdit = () => {
    setEditing(null);
  };

  const handleDelete = useCallback(
    async (id: number) => {
      const confirmar = window.confirm('Deseja realmente excluir este colaborador?');
      if (!confirmar) return;
      setDeletingId(id);
      setErro(null);
      setMensagem(null);
      try {
        await axiosClient.delete(`/api/funcionarios/${id}`);
        setMensagem('Funcionário excluído com sucesso.');
        setFuncionarios((prev) => prev.filter((f) => f.id !== id));
      } catch (e) {
        setErro('Erro ao excluir funcionário.');
      } finally {
        setDeletingId(null);
      }
    },
    [],
  );

  const formInitialData = editing ? toFormValues(editing) : undefined;
  const isSaving = editing ? savingEdit : savingCreate;

  return (
    <section className="page page--stack">
      <div className="page__container">
        <header className="page__header page__header--space">
          <div className="page__titles">
            <p className="page__breadcrumb">Home / Gestão de colaboradores</p>
            <h1 className="page__title">Gestão de colaboradores</h1>
            <p className="page__subtitle">Crie, edite e organize sua equipe.</p>
          </div>
        </header>

        <EmployeeFilters
          nome={filtroNome}
          status={filtroStatus}
          onChangeNome={setFiltroNome}
          onChangeStatus={setFiltroStatus}
          onSearch={carregarFuncionarios}
          loading={loadingList}
        />

        <EmployeeForm
          mode={editing ? 'edit' : 'create'}
          initialData={formInitialData}
          onSubmit={handleSubmit}
          onCancel={editing ? handleCancelEdit : undefined}
          loading={isSaving}
        />

        {erro && (
          <div className="card card--feedback auth-error" role="alert">
            {erro}
          </div>
        )}
        {mensagem && <div className="card card--feedback auth-success">{mensagem}</div>}

        <EmployeeTable
          funcionarios={funcionarios}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deletingId={deletingId}
        />

        {loadingList && <p style={{ marginTop: '0.5rem', textAlign: 'center' }}>Carregando...</p>}
      </div>
    </section>
  );
}
