import { Meta, StoryObj } from '@storybook/react';

import { Badge as Component } from '../src';
import { getIconsArg } from './arg-types';

const meta: Meta<typeof Component> = {
  title: 'Components/Badge',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
    leftIcon: getIconsArg(),
    rightIcon: getIconsArg(),
    size: {
      options: ['s', 'm'],
      control: { type: 'radio' },
    },
    theme: {
      options: ['filled', 'light', 'border'],
      control: { type: 'radio' },
    },
    color: {
      options: ['primary', 'secondary', 'success', 'danger'],
      control: { type: 'radio' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Badge: Story = {
  args: {
    children: 'Badge',
    leftIcon: undefined,
    rightIcon: undefined,
    size: 's',
    theme: 'filled',
    color: 'primary',
  },
};
