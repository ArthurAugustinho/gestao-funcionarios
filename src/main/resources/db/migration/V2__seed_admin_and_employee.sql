INSERT INTO usuario (nome, email, senha_hash, role, created_at, updated_at)
VALUES (
    'Administrador',
    'admin@sistema.com',
    '$2b$10$vYcobDXe5Uy9qbe8YgDSXeNfGDQcM7EQqzMS9m/xLQjgXuXayWXAi',
    'ADMIN',
    NOW(),
    NOW()
);

INSERT INTO funcionario (nome, data_admissao, salario, status, created_at, updated_at)
VALUES (
    'Joao da Silva',
    DATE '2023-01-10',
    4500.00,
    'ATIVO',
    NOW(),
    NOW()
);
