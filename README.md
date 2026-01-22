# React FSD Starter

Enterprise-ready React template with Feature-Sliced Design architecture.

## Features

- 🏗️ **Feature-Sliced Design** — scalable architecture pattern
- ⚡ **Vite** — fast build tool with HMR
- 🎨 **Tailwind CSS** — utility-first styling
- 📦 **Zustand** — lightweight state management
- 🔄 **TanStack Query** — server state management
- 📝 **React Hook Form + Zod** — form handling with validation
- 🧪 **Vitest + Testing Library** — unit & component testing
- 🎭 **Playwright** — E2E testing
- 📚 **Storybook** — component documentation
- 🔒 **TypeScript** — strict type safety
- ♿ **Accessibility** — WCAG compliant

## Quick Start

```bash
pnpm install
pnpm dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run tests in watch mode |
| `pnpm test:unit` | Run unit tests |
| `pnpm test:e2e` | Run E2E tests |
| `pnpm lint` | Lint code |
| `pnpm typecheck` | Type check |
| `pnpm storybook` | Start Storybook |

## Architecture (FSD)

```
src/
├── app/              # Application initialization, providers, styles
│   ├── providers/    # React context providers, router
│   └── styles/       # Global styles
├── pages/            # Route entry points (composition only)
│   ├── landing/
│   ├── auth/
│   ├── cabinet/
│   └── admin/
├── widgets/          # Composite UI blocks
├── features/         # User interactions
│   ├── auth/         # Authentication feature
│   ├── session/      # Session management
│   └── toast/        # Toast notifications
├── entities/         # Business entities
└── shared/           # Reusable code without business logic
    ├── api/          # API client
    ├── config/       # Environment, routes
    ├── lib/          # Utilities
    ├── types/        # Shared types
    └── ui/           # UI components (Button, Input, etc.)
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
VITE_API_URL=http://localhost:3001/api
VITE_PORT=3000
VITE_ENABLE_MSW=true
```

## Pages

- `/` — Landing page
- `/login` — Login page
- `/register` — Registration page
- `/cabinet` — Personal cabinet (protected)
- `/admin` — Admin dashboard (admin only)

## License

MIT
