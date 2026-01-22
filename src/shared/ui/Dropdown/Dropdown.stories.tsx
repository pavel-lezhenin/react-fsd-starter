import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@shared/ui/Button';

import { Dropdown, DropdownItem, DropdownSeparator, DropdownLabel } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Shared/UI/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dropdown trigger={<Button variant="outline">Open Menu</Button>}>
      <DropdownLabel>My Account</DropdownLabel>
      <DropdownItem>Profile</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Billing</DropdownItem>
      <DropdownSeparator />
      <DropdownItem destructive>Logout</DropdownItem>
    </Dropdown>
  ),
};

export const AlignRight: Story = {
  render: () => (
    <Dropdown trigger={<Button variant="outline">Align Right</Button>} align="right">
      <DropdownItem>Option 1</DropdownItem>
      <DropdownItem>Option 2</DropdownItem>
      <DropdownItem>Option 3</DropdownItem>
    </Dropdown>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <Dropdown trigger={<Button variant="outline">With Disabled</Button>}>
      <DropdownItem>Available</DropdownItem>
      <DropdownItem disabled>Disabled</DropdownItem>
      <DropdownItem>Also Available</DropdownItem>
    </Dropdown>
  ),
};
