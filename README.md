# Stock Management App 📦

A modern, full-featured stock management application built with Next.js 15, TypeScript, and Prisma. This application provides a comprehensive solution for managing product inventory, tracking stock movements, and monitoring low-stock notifications.

## ✨ Features

### 📊 **Product Management**

- ✅ Create, read, update, and delete products
- 📸 Product image upload and management with cropping functionality
- 💰 Price tracking and management
- 📝 Product descriptions and detailed information
- 📊 Inventory quantity tracking
- ⚠️ Minimum stock quantity alerts

### 📤 **Stock Exit Management**

- 🚀 Track product exits and movements
- 👤 User-based exit logging
- 🌍 Regional tracking for stock movements
- 📋 Detailed exit descriptions and notes
- ⏰ Timestamp tracking for all movements

### 🔔 **Smart Notifications**

- 📢 Real-time notifications for stock activities
- ⚠️ Low stock alerts when products reach minimum quantity
- 👁️ Mark notifications as read/unread
- 🗑️ Bulk notification management
- 🎯 Action-based notification categorization (CREATE, UPDATE, DELETE, MIN_QUANTITY)

### 📊 **Data Management**

- 📥 Bulk product import functionality
- 📤 Export capabilities with Excel support
- 🔄 Advanced filtering and search
- 📋 Data tables with sorting and pagination
- 📊 Stock count and analytics

### 🎨 **User Interface**

- 🌙 Dark/Light theme support
- 📱 Responsive design for all devices
- ⚡ Smooth animations with Framer Motion
- 🎛️ Modern UI components with Radix UI
- 🔍 Command palette for quick actions
- 📅 Date picker for time-based filtering

### 🔧 **Technical Features**

- ⚡ Server-side rendering with Next.js 15
- 🗄️ SQLite database with Prisma ORM
- 🔄 React Query for efficient data fetching
- 📝 Form validation with React Hook Form & Zod
- 🎨 Styling with Tailwind CSS
- 📁 File handling with Multer
- 🍞 Toast notifications with Sonner

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 15 with Turbopack
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, Lucide React
- **State Management:** React Query (TanStack)
- **Forms:** React Hook Form with Zod validation
- **Animations:** Framer Motion, Auto-animate
- **Tables:** TanStack Table

### Backend

- **Database:** SQLite with Prisma ORM
- **API Routes:** Next.js API Routes
- **File Upload:** Multer
- **Validation:** Zod

### Development Tools

- **Package Manager:** npm
- **Code Quality:** TypeScript
- **Testing:** Faker.js for mock data

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18+
- npm or yarn package manager
- Git

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd stoke-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up the database**

   ```bash
   # Run database migrations
   npm run migrate

   # (Optional) Reset database if needed
   npm run reset
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📜 Available Scripts

### Development

- `npm run dev` - Start development server with Turbopack
- `npm run migrate` - Run Prisma database migrations (development)
- `npm run reset` - Reset the database
- `npm run studio` - Open Prisma Studio for database management

### Production

- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run vercel-build` - Build command for Vercel deployment
- `npm run db:push` - Push schema to database (production)
- `npm run db:generate` - Generate Prisma client

### Code Quality

- `npm run lint` - Check for linting issues
- `npm run lint:fix` - Fix linting issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 📁 Project Structure

```
stoke-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (pages)/           # Page groups
│   │   │   ├── products/      # Product management pages
│   │   │   ├── products-exit/ # Stock exit pages
│   │   │   ├── create-products/ # Product creation
│   │   │   └── ...
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── actions/               # Server actions
│   │   ├── products/          # Product-related actions
│   │   ├── products-exit/     # Stock exit actions
│   │   └── notifications/     # Notification actions
│   ├── components/            # Reusable UI components
│   └── database/              # Database files
├── prisma/                    # Prisma schema and migrations
├── public/                    # Static assets
└── package.json               # Project dependencies
```

## 🗄️ Database Schema

The application uses three main models:

- **Product**: Core product information with inventory tracking
- **ProductExit**: Stock movement and exit tracking
- **Notification**: System notifications and alerts

## 🚀 Deploy na Produção

### Deploy na Vercel (Recomendado)

1. **Configure o banco de dados:**
   - Crie uma conta no [Neon](https://neon.tech) (PostgreSQL gratuito)
   - Obtenha a URL de conexão

2. **Faça o deploy:**

   ```bash
   # Clone e prepare o repositório
   git add .
   git commit -m "feat: preparar para deploy"
   git push origin main
   ```

3. **Configure na Vercel:**
   - Conecte seu repositório GitHub
   - Adicione as variáveis de ambiente:
     ```env
     DATABASE_URL=sua-url-postgresql
     NEXTAUTH_URL=https://seu-app.vercel.app
     NEXTAUTH_SECRET=sua-chave-secreta
     NEXT_PUBLIC_APP_URL=https://seu-app.vercel.app
     NODE_ENV=production
     ```

4. **Deploy automático:**
   - A Vercel fará o build automaticamente
   - Acesse sua URL: `https://seu-app.vercel.app`

### Guia Completo

Para instruções detalhadas, veja: [DEPLOY.md](./DEPLOY.md)

### Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

## 🔧 Configurações de Produção

### Banco de Dados

- **Desenvolvimento:** SQLite (local)
- **Produção:** PostgreSQL (Neon, PlanetScale, Supabase)

### Upload de Arquivos

- **Desenvolvimento:** Sistema de arquivos local
- **Produção:** Recomendado usar Cloudinary ou AWS S3

### Monitoramento

- Logs disponíveis no dashboard da Vercel
- Analytics integrado da Vercel
- Headers de segurança configurados

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Shadcn UI](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Database ORM with [Prisma](https://www.prisma.io/)

---

**Happy Stock Managing! 📦✨**
