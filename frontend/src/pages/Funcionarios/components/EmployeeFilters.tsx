import { useMemo } from 'react';
import type { StatusFuncionario } from '../types';

type Props = {
  nome: string;
  status: StatusFuncionario | '';
  onChangeNome: (value: string) => void;
  onChangeStatus: (value: StatusFuncionario | '') => void;
  onSearch: () => void;
  loading: boolean;
};

// Filtros por nome/status com botão de busca.
export function EmployeeFilters({ nome, status, onChangeNome, onChangeStatus, onSearch, loading }: Props) {
  const statusOptions = useMemo<StatusFuncionario[]>(() => ['ATIVO', 'INATIVO'], []);

  return (
    <div className="card card--section">
      <div className="card__header">
        <div>
          <p className="card__eyebrow">Filtros</p>
          <h3 className="card__title">Buscar colaboradores</h3>
          <p className="card__subtitle">Refine por nome ou status e recarregue a lista.</p>
        </div>
      </div>
      <div className="filters-grid">
        <div className="form-control filters-row">
          <label className="form-label">Filtro por nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => onChangeNome(e.target.value)}
            placeholder="Buscar por nome"
          />
        </div>
        <div className="form-control filters-row">
          <label className="form-label">Status</label>
          <select value={status} onChange={(e) => onChangeStatus(e.target.value as StatusFuncionario | '')}>
            <option value="">Todos</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="filters-actions">
          <button className="primary" onClick={onSearch} disabled={loading}>
            {loading ? 'Carregando...' : 'Recarregar'}
          </button>
        </div>
      </div>
    </div>
  );
}
