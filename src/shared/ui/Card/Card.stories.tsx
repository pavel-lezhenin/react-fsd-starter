import type { Meta, StoryObj } from '@storybook/react';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from '@shared/ui/Button';

const meta: Meta<typeof Card> = {
  title: 'Shared/UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content and details.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <p>Simple card with just content.</p>
    </Card>
  ),
};

export const WithStats: Story = {
  render: () => (
    <Card className="w-[200px]">
      <CardHeader>
        <CardDescription>Total Users</CardDescription>
        <CardTitle as="h2" className="text-3xl">
          1,234
        </CardTitle>
      </CardHeader>
    </Card>
  ),
};
