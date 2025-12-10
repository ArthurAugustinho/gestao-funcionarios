# Gestão de Colaboradores

Aplicação full stack para gestão de funcionários/colaboradores: autenticação, cadastro, listagem, edição, filtro por status, exclusão e gestão de usuários.

## Tecnologias utilizadas
- **Backend:** Java 17, Spring Boot (Web, Data JPA, Security com JWT), Flyway, PostgreSQL
- **Frontend:** React, TypeScript, Vite, Axios
- **Infraestrutura:** Docker, Docker Compose, Nginx (para servir a SPA)

## Arquitetura / Organização do projeto
- **Backend:** código Java/Spring na pasta `src/` (camadas Controller / Service / Repository / Entity).
- **Frontend:** código React/TypeScript na pasta `frontend/`.
- **Infra:** `docker-compose.yml` na raiz orquestrando db, backend e frontend; Dockerfile do backend na raiz; Dockerfile/Nginx do frontend em `frontend/`.

## Requisitos para rodar o projeto
- Docker instalado.
- Docker Compose instalado.
- (Opcional) Git para clonar o repositório.
> Com Docker Compose não é necessário instalar Java, Node, etc.

## Passo a passo para rodar a aplicação (do zero)
1. Clonar o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <PASTA_DO_REPOSITORIO>
   ```
2. Criar um `.env` na raiz a partir do `.env.example`, definindo usuário/senha do banco e variáveis de API.
3. Subir tudo com Docker Compose:
   ```bash
   docker compose up --build
   ```
4. Acessos:
   - Frontend: http://localhost:3000
   - API: http://localhost:8080
5. Para parar: `Ctrl + C` no terminal ou `docker compose down`.

## Usuário padrão
Credenciais seed (apenas para testes), criadas via Flyway V2:
```bash
email: admin@sistema.com
senha: admin123
```

## Principais funcionalidades
- Login na aplicação (JWT).
- Listagem de colaboradores.
- Filtro por nome e status (ATIVO/INATIVO).
- Cadastro de novo colaborador.
- Edição e exclusão de colaborador.
- Tela de gestão de usuários (cadastro/listagem).
> MVP focado em avaliação técnica.

## Como rodar backend e frontend separadamente (opcional)
- **Backend (local):**
  ```bash
  ./mvnw spring-boot:run
  ```
  API em `http://localhost:8080` (configure `SPRING_DATASOURCE_*` no ambiente).
- **Frontend (local):**
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
  Use `VITE_API_URL=http://localhost:8080` no `.env` do frontend em modo dev.
> O caminho recomendado para teste é via Docker Compose.

