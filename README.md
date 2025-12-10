# Gestão de Funcionários

Backend em Spring Boot (Java 17) + frontend React/TypeScript (Vite) e PostgreSQL, com autenticação JWT e fluxo básico de funcionários.

## Tecnologias
- Java 17 / Spring Boot (JPA, Security, Flyway)
- React + TypeScript (Vite)
- PostgreSQL
- Docker / Docker Compose

## Executando com Docker Compose

1. Certifique-se de ter Docker e Docker Compose instalados.
2. Na raiz do repositório, rode:
   ```bash
   docker compose up --build
   ```
3. Acesse o frontend em: http://localhost:3000
4. A API estará em: http://localhost:8080
5. Credenciais seed (admin):
   - Email: `admin@sistema.com`
   - Senha: `admin123`

### Serviços
- **db**: PostgreSQL com base `gestao_funcionarios`
- **backend**: Spring Boot servindo na porta 8080
- **frontend**: SPA servida via Nginx na porta 3000

### Variáveis importantes
- Backend:
  - `SPRING_DATASOURCE_URL` (padrão: `jdbc:postgresql://db:5432/gestao_funcionarios`)
  - `SPRING_DATASOURCE_USERNAME` / `SPRING_DATASOURCE_PASSWORD`
- Frontend (build):
  - `VITE_API_URL` (padrão no compose: `http://localhost:8080`)

### Notas
- Flyway roda na inicialização do backend; certifique-se de que o Postgres está acessível.
- O frontend usa variáveis Vite em tempo de build; se alterar a URL da API, ajuste `VITE_API_URL` no `docker-compose.yml` ou passe por `--build-arg`.
