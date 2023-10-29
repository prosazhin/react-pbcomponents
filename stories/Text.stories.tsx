import { Meta, StoryObj } from '@storybook/react';

import { Text as Component } from '../src';

const meta: Meta<typeof Component> = {
  title: 'Helpers/Text',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'radio' },
    },
    medium: { control: 'boolean' },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Text: Story = {
  args: {
    children: 'label',
    size: 'm',
    medium: false,
  },
};
