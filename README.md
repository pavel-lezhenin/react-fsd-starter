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
│   ├── header/       # App header with navigation
│   ├── layout/       # Page layouts
│   └── theme-switcher/ # Dark/light mode toggle
├── features/         # User interactions
│   ├── auth/         # Authentication feature
│   ├── session/      # Session management
│   └── toast/        # Toast notifications
├── entities/         # Business entities
│   └── user/         # User entity (api, ui)
└── shared/           # Reusable code without business logic
    ├── api/          # API client
    ├── config/       # Environment, routes
    ├── hooks/        # Custom React hooks
    ├── lib/          # Utilities
    ├── mocks/        # MSW handlers for BFF
    ├── types/        # Shared types
    └── ui/           # UI component library
```

## UI Components

| Component | Description |
|-----------|-------------|
| Button | Primary actions with variants |
| Input | Text input with validation |
| Textarea | Multiline text input |
| Select | Dropdown selection |
| Checkbox | Toggle options |
| Card | Content container |
| Modal | Dialog overlay with focus trap |
| Tabs | Tabbed content |
| Table | Data display |
| Badge | Status indicators |
| Alert | Notifications |
| Dropdown | Context menus |
| Tooltip | Hover hints |
| Avatar | User images with fallback |
| Skeleton | Loading placeholders |
| ErrorBoundary | Error handling |
| PageLoader | Loading states |

## Custom Hooks

| Hook | Description |
|------|-------------|
| useDisclosure | Modal/dropdown state |
| useMediaQuery | Responsive breakpoints |
| useDebounce | Input optimization |
| useLocalStorage | Persistence |
| useTheme | Dark mode toggle |

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

## Testing

Tests use **co-location** pattern (next to source files):

```
src/
├── shared/
│   ├── hooks/
│   │   ├── useDisclosure.ts
│   │   └── useDisclosure.test.ts     ← Unit test
│   └── ui/
│       └── Button/
│           ├── Button.tsx
│           └── Button.test.tsx       ← Component test
├── tests/
│   └── setup.ts                     ← Test configuration
└── e2e/
    ├── auth.spec.ts                 ← E2E tests
    └── landing.spec.ts
```

**Coverage requirement:** 80% (lines, functions, branches, statements)

## License

MIT
