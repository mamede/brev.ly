# 🔗 FTR - brev.ly

Um encurtador de URLs moderno e performático, construído com as melhores tecnologias.

## ✨ Funcionalidades

- 🎯 Criar links personalizados e encurtados
- 📊 Acompanhar quantidade de acessos
- 📋 Exportar relatórios em CSV
- 🚀 Redirecionamento rápido
- 💾 Armazenamento em nuvem (S3/R2)

## 🛠️ Tecnologias

### Backend
- **Fastify** - Framework web rápido e eficiente
- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - Type-safe database toolkit
- **Zod** - Validação de schemas
- **AWS S3/R2** - Armazenamento de arquivos

### Frontend
- **React** - Biblioteca UI
- **Vite** - Build tool ultrarrápido
- **TailwindCSS** - Estilização moderna
- **React Query** - Gerenciamento de estado
- **React Router** - Navegação

## 🚀 Como Usar

### Pré-requisitos

- Node.js 18+
- pnpm
- Docker & Docker Compose

### Instalação

1. Clone o repositório
```bash
git clone <seu-repositorio>
cd FTR
```

2. Instale as dependências

```bash
# Backend
cd server
pnpm install

# Frontend
cd ../web
pnpm install
```

3. Configure o ambiente

```bash
# Backend - criar arquivo .env na pasta server
cd server
cp .env.example .env
```

4. Suba o banco de dados

```bash
cd server
docker-compose up -d
```

5. Execute as migrations

```bash
cd server
pnpm db:migrate
```

### Executar o projeto

```bash
# Terminal 1 - Backend
cd server
pnpm dev

# Terminal 2 - Frontend
cd web
pnpm dev
```

Acesse:
- **Frontend**: http://localhost:5173
- **API**: http://localhost:3333
- **Swagger**: http://localhost:3333/docs

## 📁 Estrutura do Projeto

```
FTR/
├── server/          # Backend API
│   ├── src/
│   │   ├── app/     # Casos de uso e lógica de negócio
│   │   └── infra/   # Infraestrutura (DB, HTTP, Storage)
│   └── docker/      # Configurações Docker
└── web/             # Frontend React
    └── src/
        ├── components/  # Componentes reutilizáveis
        ├── pages/       # Páginas da aplicação
        └── hooks/       # Custom hooks
```

Feito com ❤️ por [Seu Nome]

