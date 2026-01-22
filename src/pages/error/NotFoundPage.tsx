import { Link } from 'react-router-dom';

import { Button } from '@shared/ui';
import { ROUTES } from '@shared/config';

export default function NotFoundPage(): JSX.Element {
  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <p className="mb-8 text-xl text-secondary">Page not found</p>
      <Link to={ROUTES.HOME}>
        <Button>Go back home</Button>
      </Link>
    </main>
  );
}
