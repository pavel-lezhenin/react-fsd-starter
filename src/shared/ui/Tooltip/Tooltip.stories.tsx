import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@shared/ui/Button';

import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Shared/UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip content="This is a tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export const Top: Story = {
  render: () => (
    <Tooltip content="Top tooltip" position="top">
      <Button variant="outline">Top</Button>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Tooltip content="Bottom tooltip" position="bottom">
      <Button variant="outline">Bottom</Button>
    </Tooltip>
  ),
};

export const Left: Story = {
  render: () => (
    <Tooltip content="Left tooltip" position="left">
      <Button variant="outline">Left</Button>
    </Tooltip>
  ),
};

export const Right: Story = {
  render: () => (
    <Tooltip content="Right tooltip" position="right">
      <Button variant="outline">Right</Button>
    </Tooltip>
  ),
};

export const AllPositions: Story = {
  render: () => (
    <div className="flex gap-8">
      <Tooltip content="Top" position="top"><Button variant="outline">Top</Button></Tooltip>
      <Tooltip content="Bottom" position="bottom"><Button variant="outline">Bottom</Button></Tooltip>
      <Tooltip content="Left" position="left"><Button variant="outline">Left</Button></Tooltip>
      <Tooltip content="Right" position="right"><Button variant="outline">Right</Button></Tooltip>
    </div>
  ),
};
