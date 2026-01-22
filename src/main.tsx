import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { App } from '@app/App';


import '@app/styles/index.css';

async function enableMocking(): Promise<void> {
  if (import.meta.env.VITE_ENABLE_MSW !== 'true') {
    return;
  }

  const { worker } = await import('@shared/mocks');
  await worker.start({
    onUnhandledRequest: 'bypass',
  });
}

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

void enableMocking().then(() => {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
