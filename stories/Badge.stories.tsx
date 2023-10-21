import { Meta, StoryObj } from '@storybook/react';

import { Badge } from '../src';
import { getIconsArg } from './arg-types';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    size: {
      options: ['xs', 's'],
      control: { type: 'inline-radio' },
    },
    theme: {
      options: ['filled', 'light', 'border'],
      control: { type: 'inline-radio' },
    },
    color: {
      options: ['primary', 'secondary', 'success', 'danger'],
      control: { type: 'inline-radio' },
    },
    leftIcon: getIconsArg(),
    rightIcon: getIconsArg(),
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Variant: Story = {
  args: {
    children: 'Badge',
    size: 'xs',
    theme: 'filled',
    color: 'primary',
    leftIcon: undefined,
    rightIcon: undefined,
  },
};
