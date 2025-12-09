CREATE TABLE IF NOT EXISTS usuario (
    id           BIGSERIAL PRIMARY KEY,
    nome         VARCHAR(255) NOT NULL,
    email        VARCHAR(255) NOT NULL UNIQUE,
    senha_hash   VARCHAR(255) NOT NULL,
    role         VARCHAR(50)  NOT NULL,
    created_at   TIMESTAMP,
    updated_at   TIMESTAMP
);

CREATE TABLE IF NOT EXISTS funcionario (
    id              BIGSERIAL PRIMARY KEY,
    nome            VARCHAR(255) NOT NULL,
    data_admissao   DATE NOT NULL,
    salario         NUMERIC(15, 2) NOT NULL,
    status          VARCHAR(50) NOT NULL,
    created_at      TIMESTAMP,
    updated_at      TIMESTAMP
);
