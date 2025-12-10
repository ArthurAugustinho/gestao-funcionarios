import { useEffect, useState } from 'react';
import type { StatusFuncionario } from '../types';

export type EmployeeFormValues = {
  nome: string;
  dataAdmissao: string;
  salario: string;
  status: StatusFuncionario;
};

type Props = {
  mode: 'create' | 'edit';
  initialData?: EmployeeFormValues;
  onSubmit: (values: EmployeeFormValues) => void;
  onCancel?: () => void;
  loading: boolean;
};

// Formulário reutilizável para criar/editar funcionário.
export function EmployeeForm({ mode, initialData, onSubmit, onCancel, loading }: Props) {
  const [values, setValues] = useState<EmployeeFormValues>(
    initialData ?? { nome: '', dataAdmissao: '', salario: '', status: 'ATIVO' },
  );

  useEffect(() => {
    if (initialData) {
      setValues(initialData);
    }
  }, [initialData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="card card--section">
      <div className="card__header">
        <div>
          <p className="card__eyebrow">{mode === 'create' ? 'Novo' : 'Edição'}</p>
          <h3 className="card__title">{mode === 'create' ? 'Novo colaborador' : 'Editar colaborador'}</h3>
          <p className="card__subtitle">Preencha os dados do colaborador e salve as alterações.</p>
        </div>
      </div>
      <form className="auth-form form-grid" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="form-label">Nome</label>
          <input
            type="text"
            value={values.nome}
            onChange={(e) => setValues((prev) => ({ ...prev, nome: e.target.value }))}
            placeholder="Nome completo"
            required
          />
        </div>
        <div className="form-control">
          <label className="form-label">Data de admissão</label>
          <input
            type="date"
            value={values.dataAdmissao}
            onChange={(e) => setValues((prev) => ({ ...prev, dataAdmissao: e.target.value }))}
            required
          />
        </div>
        <div className="form-control">
          <label className="form-label">Salário</label>
          <input
            type="number"
            step="0.01"
            value={values.salario}
            onChange={(e) => setValues((prev) => ({ ...prev, salario: e.target.value }))}
            placeholder="0,00"
            required
          />
        </div>
        <div className="form-control">
          <label className="form-label">Status</label>
          <select
            value={values.status}
            onChange={(e) => setValues((prev) => ({ ...prev, status: e.target.value as StatusFuncionario }))}
          >
            <option value="ATIVO">ATIVO</option>
            <option value="INATIVO">INATIVO</option>
          </select>
        </div>

        <div className="form-actions">
          <button className="primary" type="submit" disabled={loading}>
            {loading ? 'Salvando...' : mode === 'create' ? 'Salvar' : 'Atualizar'}
          </button>
          {mode === 'edit' && onCancel && (
            <button type="button" className="secondary" onClick={onCancel} disabled={loading}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
