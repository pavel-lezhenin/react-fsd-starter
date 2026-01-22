import type { ReactNode } from 'react';

import { Header } from '@widgets/header';

interface MainLayoutProps {
  readonly children: ReactNode;
  readonly showHeader?: boolean;
}

export function MainLayout({ children, showHeader = true }: MainLayoutProps): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col">
      {showHeader && <Header />}
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <footer className="border-t py-6 text-center text-sm text-secondary">
        © {new Date().getFullYear()} React FSD Starter. MIT License.
      </footer>
    </div>
  );
}
