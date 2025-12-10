import { useMemo } from 'react';
import type { StatusFuncionario } from './types';

type Funcionario = {
  id: number;
  nome: string;
  dataAdmissao: string;
  salario: number;
  status: StatusFuncionario;
};

// Tela simples listando funcionários mockados até integrar com API real.
export default function FuncionariosPage() {
  const funcionarios = useMemo<Funcionario[]>(
    () => [
      { id: 1, nome: 'João da Silva', dataAdmissao: '2023-01-10', salario: 4500, status: 'ATIVO' },
      { id: 2, nome: 'Maria Oliveira', dataAdmissao: '2024-03-05', salario: 5200, status: 'INATIVO' },
    ],
    [],
  );

  return (
    <section className="page">
      <header className="page__header">
        <div>
          <p className="page__eyebrow">Funcionários</p>
          <h2>Lista de colaboradores</h2>
        </div>
        <button className="primary">Novo funcionário</button>
      </header>

      <div className="card">
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
                <td>{f.dataAdmissao}</td>
                <td>{f.salario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td>
                  <span className={`tag tag--${f.status.toLowerCase()}`}>{f.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
