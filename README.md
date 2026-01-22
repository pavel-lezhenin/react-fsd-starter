# React FSD Starter

> **Enterprise-grade React template** with Feature-Sliced Design architecture and production-ready tooling

## 🏢 **When to Use This Template**

### ✅ **Perfect For:**
- **Medium to Large Teams (5+ developers)** — Clear architecture boundaries prevent conflicts
- **Long-term Projects (6+ months)** — Architecture scales gracefully with complexity
- **Feature-Rich Applications** — Multiple domains, complex business logic
- **Enterprise Projects** — Strict code quality, documentation, and testing requirements
- **Teams Learning Architecture** — FSD provides clear guidelines and patterns

### ❌ **NOT Recommended For:**
- **Small Projects/MVPs** — Architecture overhead outweighs benefits
- **Simple Landing Pages** — Use Next.js or simple Vite setup instead
- **Prototypes/Demos** — Too much structure for quick iterations
- **Solo Developer Projects** — Consider simpler folder structure
- **Tight Deadlines (<1 month)** — Learning curve may slow initial development

## 👥 **Team Size & Complexity Guidelines**

| Team Size | Project Duration | Complexity | Recommendation |
|-----------|------------------|------------|---------------|
| 1-2 devs | <3 months | Simple | ❌ Use simpler structure |
| 3-5 devs | 3-6 months | Medium | ⚠️ Consider if team knows FSD |
| 5+ devs | 6+ months | Complex | ✅ **Perfect fit** |
| Any size | Enterprise | High | ✅ **Highly recommended** |

## 📋 **Style Guide & Standards**

This template enforces **strict development standards**:

### **Code Quality**
- ✅ **TypeScript Strict Mode** — `noUncheckedIndexedAccess`, `noImplicitReturns`
- ✅ **ESLint Rules** — React best practices, accessibility, imports
- ✅ **Prettier Formatting** — Consistent code style
- ✅ **Husky Pre-commit Hooks** — Prevents bad commits

### **Testing Requirements**
- ✅ **80% Coverage Minimum** (lines, functions, branches, statements)
- ✅ **Unit Tests** — Every utility function and hook
- ✅ **Component Tests** — User interactions and edge cases
- ✅ **E2E Tests** — Critical user journeys
- ✅ **Accessibility Testing** — WCAG compliance

### **Architecture Principles**
- ✅ **Feature-Sliced Design** — Standardized layer structure
- ✅ **Import Rules** — Enforced dependency direction
- ✅ **Composition over Logic** — Pages only orchestrate, don't implement
- ✅ **Colocation** — Tests and stories next to components

### **Documentation Standards**
- ✅ **JSDoc for Public APIs** — Every exported function
- ✅ **Storybook for Components** — Usage examples and props
- ✅ **README for Features** — Purpose and usage guidelines


## 🎯 Features

### **Architecture & Structure**
- 🏗️ **Feature-Sliced Design** — Scalable, team-friendly architecture
- 📁 **Enforced Layer Dependencies** — `app` → `pages` → `widgets` → `features` → `entities` → `shared`
- 🔒 **Import Validation** — ESLint rules prevent architectural violations

### **Development Experience**
- ⚡ **Vite** — Fast builds, instant HMR, optimized production bundles
- 🎨 **Tailwind CSS** — Utility-first CSS with design tokens
- 🔧 **TypeScript Strict** — Maximum type safety with strict configuration
- 🪝 **Custom Hooks** — Reusable logic for common patterns

### **State Management**
- 📦 **Zustand** — Lightweight, TypeScript-friendly global state
- 🔄 **TanStack Query** — Server state, caching, synchronization
- 📝 **React Hook Form + Zod** — Type-safe form validation

### **Testing & Quality**
- 🧪 **Vitest + Testing Library** — Fast unit & component testing
- 🎭 **Playwright** — Reliable E2E testing with auto-wait
- 📚 **Storybook** — Component playground and documentation
- ♿ **Accessibility** — WCAG guidelines, a11y testing

### **Security & Best Practices**
- 🔐 **Authentication Flow** — Login, logout, protected routes
- 🛡️ **Security Headers** — CSP, HSTS, XSS protection
- 🕵️ **Mock Service Worker** — API mocking for development/testing

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

### **Layer Structure & Responsibility**

```
src/
├── app/              # 🚀 Application layer - initialization, global setup
│   ├── providers/    # React context, router, query client setup
│   └── styles/       # Global CSS, Tailwind configuration
│
├── pages/            # 📄 Pages layer - route composition ONLY
│   ├── landing/      # Landing page (/): widgets composition
│   ├── auth/         # Auth pages (/login, /register): forms + auth logic
│   ├── cabinet/      # User dashboard (/cabinet): protected content
│   └── admin/        # Admin panel (/admin): admin-only functionality
│
├── widgets/          # 🧩 Widgets layer - complex UI blocks
│   ├── header/       # Site header: navigation, user menu, theme toggle
│   ├── layout/       # Main layout: header + content wrapper
│   └── theme-switcher/ # Theme switching widget
│
├── features/         # ⚙️ Features layer - business logic slices
│   ├── auth/         # Authentication: login, logout, register
│   ├── session/      # Session management: user state, persistence
│   └── toast/        # Notification system: success, error messages
│
├── entities/         # 🏢 Entities layer - business domain models
│   └── user/         # User entity: types, API, components
│       ├── api/      # User-related API calls
│       └── ui/       # User-specific components (avatar, card)
│
└── shared/           # 🔧 Shared layer - reusable utilities
    ├── ui/           # Generic UI components (button, input, modal)
    ├── api/          # HTTP client, common API logic
    ├── lib/          # Utilities (cn, formatters, validators)
    ├── hooks/        # Generic hooks (useDebounce, useLocalStorage)
    ├── config/       # Constants, environment, routes
    └── types/        # Global TypeScript types
```

### **🔒 Import Rules (ESLint Enforced)**

```typescript
// ✅ ALLOWED - Lower layers can import from higher layers
import { Button } from '@/shared/ui'           // shared → shared
import { userApi } from '@/entities/user'      // features → entities
import { LoginForm } from '@/features/auth'    // pages → features

// ❌ FORBIDDEN - Higher layers cannot import from lower layers
import { UserCard } from '@/widgets/user'      // shared ← widgets (NO!)
import { authApi } from '@/features/auth'      // entities ← features (NO!)

// ❌ FORBIDDEN - Same layer cross-imports (except shared)
import { cartStore } from '@/features/cart'    // features/auth ← features/cart (NO!)
```

### **📝 Layer Guidelines**

| Layer | Can Import From | Purpose | Example |
|-------|----------------|---------|---------|
| `app` | All layers | App initialization, providers | Router, QueryClient setup |
| `pages` | widgets, features, entities, shared | Route composition ONLY | Landing page assembling widgets |
| `widgets` | features, entities, shared | Complex UI blocks | Header with auth + navigation |
| `features` | entities, shared | Business logic slices | Login/logout functionality |
| `entities` | shared | Business domain models | User data, API, basic UI |
| `shared` | Only shared | Generic utilities | Button, API client, hooks |

### **⚡ Why FSD Works for Teams**

1. **🎯 Clear Boundaries** — Everyone knows where code belongs
2. **🔄 Parallel Development** — Teams work on different features without conflicts  
3. **📈 Scalable Growth** — Add new features without architectural debt
4. **🧪 Testable Structure** — Each layer can be tested in isolation
5. **📚 Self-Documenting** — Folder structure tells the story
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
