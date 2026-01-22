import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Shared/UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany', disabled: true },
];

export const Default: Story = {
  args: {
    options: countries,
    placeholder: 'Select a country',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Country',
    options: countries,
    placeholder: 'Select a country',
  },
};

export const WithError: Story = {
  args: {
    label: 'Country',
    options: countries,
    placeholder: 'Select a country',
    error: 'Please select a country',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Country',
    options: countries,
    disabled: true,
  },
};
