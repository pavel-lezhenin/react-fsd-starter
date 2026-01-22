import { Suspense } from 'react';

import { AppProviders } from '@app/providers';
import { AppRouter } from '@app/providers/router';
import { PageLoader } from '@shared/ui/PageLoader';

export function App(): JSX.Element {
  return (
    <AppProviders>
      <Suspense fallback={<PageLoader />}>
        <AppRouter />
      </Suspense>
    </AppProviders>
  );
}
