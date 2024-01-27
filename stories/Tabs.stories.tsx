import { Meta, StoryObj } from '@storybook/react';

import { Tabs as Component } from '../src';

const meta: Meta<typeof Component> = {
  title: 'Components/Tabs',
  component: Component,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Tabs: Story = {
  args: {
    options: ['1', '2', '3', '4'].map((item) => ({ title: `Tab #${item}` })),
    display: 'title',
    defaultIndex: 0,
  },
};
