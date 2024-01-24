import { Meta, StoryObj } from '@storybook/react';

import { Chekbox as Component } from '../src';

const meta: Meta<typeof Component> = {
  title: 'Helpers/Chekbox',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['s', 'm'],
      control: { type: 'radio' },
    },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Chekbox: Story = {
  args: {
    children: 'Chekbox',
    size: 'm',
  },
};
