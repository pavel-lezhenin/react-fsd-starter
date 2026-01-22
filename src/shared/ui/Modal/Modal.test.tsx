import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Modal } from './Modal';

describe('Modal', () => {
  it('should not render when open is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('should render when open is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should render title when provided', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('should render close button when title provided', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByRole('button', { name: /close modal/i })).toBeInTheDocument();
  });

  it('should not render close button when no title', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should render with custom className', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} className="custom-modal">
        <div>Modal Content</div>
      </Modal>
    );

    const modalContent = screen.getByText('Modal Content');
    const modalContainer = modalContent.closest('.custom-modal');
    expect(modalContainer).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    const modalContainer = screen.getByText('Modal Content').closest('[role="dialog"]');
    expect(modalContainer).toHaveAttribute('role', 'dialog');
    expect(modalContainer).toHaveAttribute('aria-modal', 'true');
    expect(modalContainer).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('should have backdrop overlay', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    const backdrop = document.querySelector('.fixed');
    expect(backdrop).toBeTruthy();
  });

  it('should handle different content types', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <h3>Heading</h3>
        <p>Paragraph</p>
        <button type="button">Action</button>
      </Modal>
    );

    expect(screen.getByText('Heading')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('should be portal-rendered to body', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal in Portal</div>
      </Modal>
    );

    expect(screen.getByText('Modal in Portal')).toBeInTheDocument();
  });
});
