import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Shared/UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    error: 'Password must be at least 6 characters',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    disabled: true,
    value: 'johndoe',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
  },
};
