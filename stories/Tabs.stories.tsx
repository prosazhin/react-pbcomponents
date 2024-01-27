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
    options: ['test', 'test2', 'test3'].map((item) => ({ title: item })),
    display: 'title',
    defaultIndex: 0,
  },
};
