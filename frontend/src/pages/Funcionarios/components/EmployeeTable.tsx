import type { Funcionario, StatusFuncionario } from '../types';

type Props = {
  funcionarios: Funcionario[];
  onEdit: (funcionario: Funcionario) => void;
  onDelete: (id: number) => void;
  deletingId?: number | null;
};

const statusClass = (status: StatusFuncionario) => `tag tag--${status.toLowerCase()}`;

// Tabela com ações de editar/excluir.
export function EmployeeTable({ funcionarios, onEdit, onDelete, deletingId }: Props) {
  return (
    <div className="card card--section">
      <div className="card__header">
        <div>
          <p className="card__eyebrow">Lista</p>
          <h3 className="card__title">Colaboradores</h3>
          <p className="card__subtitle">Visualize, edite ou exclua colaboradores existentes.</p>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data de Admissão</th>
              <th>Salário</th>
              <th>Status</th>
              <th style={{ width: '160px' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((f) => (
              <tr key={f.id}>
                <td>{f.nome}</td>
                <td>{f.dataFormatada}</td>
                <td>{f.salarioFormatado}</td>
                <td>
                  <span className={statusClass(f.status)}>{f.status}</span>
                </td>
                <td>
                  <div className="table-actions">
                    <button onClick={() => onEdit(f)} aria-label={`Editar ${f.nome}`}>
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(f.id)}
                      className="danger"
                      disabled={deletingId === f.id}
                      aria-label={`Excluir ${f.nome}`}
                    >
                      {deletingId === f.id ? 'Excluindo...' : 'Excluir'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!funcionarios.length && (
              <tr>
                <td colSpan={5}>Nenhum colaborador encontrado com os filtros atuais.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
