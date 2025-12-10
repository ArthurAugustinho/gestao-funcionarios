// Tipos usados na página de Funcionários.
export type StatusFuncionario = 'ATIVO' | 'INATIVO';

export type Funcionario = {
  id: number;
  nome: string;
  dataAdmissao: string;
  salario: number;
  status: StatusFuncionario;
  createdAt?: string;
  updatedAt?: string;
  dataFormatada?: string;
  salarioFormatado?: string;
};
