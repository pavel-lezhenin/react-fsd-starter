import { Link } from 'react-router-dom';

import { Button } from '@shared/ui';
import { ROUTES } from '@shared/config';
import { MainLayout } from '@widgets/layout';

export default function LandingPage(): JSX.Element {
  return (
    <MainLayout showHeader={false}>
      <header className="border-b px-6 py-4">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="text-xl font-bold">React FSD Starter</span>
          <div className="flex gap-4">
            <Link to={ROUTES.LOGIN}>
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to={ROUTES.REGISTER}>
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="mb-6 text-5xl font-bold">
          Enterprise-Ready React Template
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-secondary">
          Feature-Sliced Design architecture, TypeScript, Tailwind CSS, 
          and all the best practices for building scalable applications.
        </p>
        <div className="flex gap-4">
          <Link to={ROUTES.REGISTER}>
            <Button size="lg">Start Building</Button>
          </Link>
          <a
            href="https://github.com/pavel-lezhenin/react-fsd-starter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg">
              View on GitHub
            </Button>
          </a>
        </div>
      </section>
    </MainLayout>
  );
}
