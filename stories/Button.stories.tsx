import { Meta, StoryObj } from '@storybook/react';

import { Button as Component } from '../src';
import { getIconsArg } from './arg-types';

const meta: Meta<typeof Component> = {
  title: 'Components/Button',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
    leftIcon: getIconsArg(),
    rightIcon: getIconsArg(),
    size: {
      options: ['xs', 's', 'm', 'l'],
      control: { type: 'radio' },
    },
    theme: {
      options: ['filled', 'light', 'border', 'ghost'],
      control: { type: 'radio' },
    },
    color: {
      options: ['primary', 'secondary', 'success', 'danger'],
      control: { type: 'radio' },
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    href: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Button: Story = {
  args: {
    children: 'Button',
    leftIcon: undefined,
    rightIcon: undefined,
    size: 's',
    theme: 'filled',
    color: 'primary',
    disabled: false,
    loading: false,
    href: undefined,
  },
};
