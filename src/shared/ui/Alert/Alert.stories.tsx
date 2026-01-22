import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Shared/UI/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is an informational alert message.',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Information',
    children: 'This is an informational alert with a title.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    children: 'Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Please review your input before continuing.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'Something went wrong. Please try again.',
  },
};

function DismissableAlertDemo(): JSX.Element {
  const [show, setShow] = useState(true);

  if (!show) {
    return (
      <button
        onClick={() => setShow(true)}
        className="text-primary underline"
      >
        Show alert again
      </button>
    );
  }

  return (
    <Alert variant="success" title="Dismissable" onClose={() => setShow(false)}>
      Click the X to dismiss this alert.
    </Alert>
  );
}

export const Dismissable: Story = {
  render: () => <DismissableAlertDemo />,
};
