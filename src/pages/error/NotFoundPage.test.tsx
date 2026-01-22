import { render, screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  const renderWithRouter = (component: React.ReactElement): RenderResult => {
    return render(
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        {component}
      </BrowserRouter>
    );
  };

  it('should render 404 error message', () => {
    renderWithRouter(<NotFoundPage />);

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('should render page not found message', () => {
    renderWithRouter(<NotFoundPage />);

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it('should render link to home page', () => {
    renderWithRouter(<NotFoundPage />);

    const homeLink = screen.getByRole('link');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should render go home button text', () => {
    renderWithRouter(<NotFoundPage />);

    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });

  it('should have proper page structure', () => {
    const { container } = renderWithRouter(<NotFoundPage />);

    expect(container.firstElementChild).toBeInTheDocument();
  });

  it('should be accessible', () => {
    renderWithRouter(<NotFoundPage />);

    // Should have main heading
    const heading = screen.getByText('404');
    expect(heading).toBeInTheDocument();

    // Should have descriptive text
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it('should render without crashing', () => {
    expect(() => renderWithRouter(<NotFoundPage />)).not.toThrow();
  });
});
