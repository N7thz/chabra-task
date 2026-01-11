# Chabra Tasks

<!-- Adicione sua imagem aqui -->

## 📋 Sobre o Projeto

**Chabra Tasks** é uma aplicação web moderna de gerenciamento de tarefas e projetos desenvolvida com Next.js 16. O sistema oferece uma interface intuitiva para organização de cards, listas e espaços de trabalho, com funcionalidades avançadas de colaboração e notificações em tempo real.

## 🚀 Tecnologias

### Core
- **Next.js 16.1.1** - Framework React com suporte a Server Components
- **React 19.2.3** - Biblioteca JavaScript para interfaces
- **TypeScript 5** - Tipagem estática
- **TailwindCSS 4.1.12** - Framework CSS utility-first

### Backend & Database
- **Prisma 7.0.1** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados relacional (Neon)
- **Better Auth 1.3.9** - Sistema de autenticação
- **bcryptjs** - Hash de senhas

### UI & Componentes
- **Radix UI** - Componentes acessíveis e customizáveis
- **Lucide React** - Biblioteca de ícones
- **Framer Motion (motion)** - Animações
- **@dnd-kit** - Drag and Drop
- **Sonner** - Notificações toast
- **React Hook Form** - Gerenciamento de formulários
- **Zod 4.1.5** - Validação de schemas

### Utilitários
- **TanStack Query** - Gerenciamento de estado e cache
- **date-fns** - Manipulação de datas
- **XLSX** - Exportação para Excel
- **Web Push** - Notificações push
- **Next Themes** - Suporte a temas claro/escuro

## 📁 Estrutura do Projeto

```
chabra-task/
├── prisma/
│   ├── migrations/              # Migrações do banco de dados
│   └── schema.prisma            # Schema do Prisma
├── public/
│   ├── icon-192x192.png         # PWA icons
│   ├── icon-512x512.png
│   └── sw.js                    # Service Worker
├── src/
│   ├── actions/                 # Server Actions do Next.js
│   ├── app/                     # App Router do Next.js
│   │   ├── (pages)/
│   │   │   ├── (private)/       # Rotas privadas (autenticadas)
│   │   │   │   ├── cards/[id]/  # Detalhes do card
│   │   │   │   ├── home/        # Página inicial
│   │   │   │   ├── settings/    # Configurações
│   │   │   │   └── space/[space]/ # Espaço de trabalho
│   │   │   └── (public)/        # Rotas públicas
│   │   │       ├── sign-in/     # Login
│   │   │       └── sign-up/     # Cadastro
│   │   ├── layout.tsx           # Layout raiz
│   │   └── globals.css          # Estilos globais
│   ├── components/              # Componentes React
│   │   ├── card-page/           # Componentes da página de cards
│   │   ├── drag-in-drop/        # Sistema drag and drop
│   │   ├── forms/               # Formulários
│   │   ├── home-content/        # Conteúdo da home
│   │   ├── list-container/      # Container de listas
│   │   ├── magicui/             # Componentes de UI customizados
│   │   ├── notifications/       # Sistema de notificações
│   │   ├── sidebar/             # Barra lateral
│   │   └── ui/                  # Componentes UI base
│   ├── functions/               # Funções utilitárias
│   ├── hooks/                   # Custom React Hooks
│   ├── lib/                     # Bibliotecas e configurações
│   │   ├── auth.ts              # Configuração Better Auth
│   │   └── prisma.ts            # Cliente Prisma
│   ├── providers/               # Context Providers
│   │   ├── loading-provider/    # Provider de loading
│   │   └── theme-provider/      # Provider de tema
│   ├── schemas/                 # Schemas Zod para validação
│   ├── types/                   # Definições de tipos TypeScript
│   └── utils/                   # Funções utilitárias
├── .env                         # Variáveis de ambiente
├── .eslintrc.json              # Configuração ESLint
├── .prettierrc.json            # Configuração Prettier
├── package.json                # Dependências e scripts
├── postcss.config.mjs          # Configuração PostCSS
├── prisma.config.ts            # Configuração Prisma
└── tsconfig.json               # Configuração TypeScript
```

## 🗄️ Modelo de Dados

O sistema possui as seguintes entidades principais:

### 👤 User (Usuário)
- Autenticação com email e senha
- Roles: ADMIN, USER, TECHNICIAN, ANALYST, SUPERVISOR
- Gerenciamento de perfil com imagem
- Sistema de banimento com expiração

### 📊 Space (Espaço)
- Agrupamento de listas
- Pertence a um usuário
- Nome único

### 📋 List (Lista)
- Pertence a um espaço
- Pode ter cor personalizada
- Contém múltiplos cards

### 🎯 Card (Card de Tarefa)
- Campos: título, CNPJ, descrição, prazo (term)
- Prioridades: URGENT, HIGH, MID, LOW
- Status: PENDING, IN_PROGRESS, COMPLETED
- Labels customizáveis
- Múltiplos donos (ownersId)
- Cor personalizada

### ✅ Task (Subtarefa)
- Pertence a um card
- Checkbox de conclusão
- Prazo opcional
- Múltiplos responsáveis

### 💬 Comments (Comentários)
- Comentários em cards
- Autor vinculado

### 📝 Activity (Atividades)
- Log de ações no card
- Rastreamento de mudanças

### 🔔 Notification (Notificações)
- Sistema de notificações para usuários
- Suporte a múltiplos destinatários
- Controle de leitura e exclusão

### 🔐 Session & Account
- Gerenciamento de sessões
- Suporte a múltiplos provedores de autenticação

## ⚙️ Funcionalidades Principais

### 🎯 Gerenciamento de Tarefas
- ✅ Criação, edição e exclusão de cards
- ✅ Organização em listas e espaços
- ✅ Drag and drop entre listas
- ✅ Priorização de tarefas (Urgente, Alta, Média, Baixa)
- ✅ Status de progresso (Pendente, Em Progresso, Concluído)
- ✅ Subtarefas (tasks) dentro dos cards
- ✅ Labels e tags customizáveis

### 👥 Colaboração
- ✅ Atribuição de múltiplos responsáveis
- ✅ Sistema de comentários
- ✅ Log de atividades
- ✅ Notificações em tempo real

### 🎨 Interface
- ✅ Tema claro/escuro
- ✅ Design responsivo
- ✅ Animações suaves
- ✅ Componentes acessíveis (Radix UI)

### 🔒 Segurança & Autenticação
- ✅ Autenticação segura com Better Auth
- ✅ Gerenciamento de sessões
- ✅ Controle de acesso baseado em roles
- ✅ Sistema de banimento de usuários

### 📊 Exportação & Relatórios
- ✅ Exportação para Excel (XLSX)
- ✅ Histórico de atividades

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento com Turbopack

# Database
npm run migrate          # Executa migrações do Prisma
npm run reset            # Reseta o banco de dados
npm run studio           # Abre Prisma Studio
npm run db:generate      # Gera Prisma Client
npm run db:migrate:deploy # Deploy de migrações em produção

# Build & Deploy
npm run build            # Build de produção
npm run start            # Inicia servidor de produção

# Qualidade de Código
npm run lint             # Executa ESLint
npm run lint:fix         # Corrige problemas do ESLint
npm run format           # Formata código com Prettier
npm run format:check     # Verifica formatação
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 20+
- PostgreSQL
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd chabra-task
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```env
DATABASE_URL='postgresql://user:password@host:port/database'
BETTER_AUTH_SECRET='seu-secret-aqui'
```

4. Execute as migrações do banco:
```bash
npm run migrate
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

6. Acesse `http://localhost:3000`

## 📊 Análise de Código

O projeto utiliza:
- **ESLint** - Linting com configuração Next.js e Prettier
- **Prettier** - Formatação de código
- **TypeScript strict mode** - Tipagem rigorosa
- **Prisma** - Type-safe database client

## 🌟 Funcionalidades Avançadas

- 📱 **PWA Ready** - Ícones e Service Worker configurados
- 🔄 **Real-time** - Atualizações em tempo real com TanStack Query
- 🎨 **Themes** - Sistema de temas personalizável
- 📊 **Analytics** - Integração com Vercel Analytics
- 🔔 **Push Notifications** - Notificações web push
- 🖼️ **Image Cropper** - Recorte de imagens de perfil
- 📱 **Responsive** - Design adaptável a todos os dispositivos

## 📝 Licença

Este projeto é privado e não possui licença pública.

---

Desenvolvido com ❤️ usando Next.js e TypeScript
