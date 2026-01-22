import type { Meta, StoryObj } from '@storybook/react';

import { Dropdown, DropdownItem, DropdownSeparator, DropdownLabel } from './Dropdown';
import { Button } from '@shared/ui/Button';

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
      <DropdownItem onClick={() => console.log('Profile')}>Profile</DropdownItem>
      <DropdownItem onClick={() => console.log('Settings')}>Settings</DropdownItem>
      <DropdownItem onClick={() => console.log('Billing')}>Billing</DropdownItem>
      <DropdownSeparator />
      <DropdownItem destructive onClick={() => console.log('Logout')}>
        Logout
      </DropdownItem>
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
