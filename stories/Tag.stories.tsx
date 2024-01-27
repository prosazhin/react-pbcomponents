import { Meta, StoryObj } from '@storybook/react';

import { Tag as Component } from '../src';
import { getIconsArg } from './arg-types';

const meta: Meta<typeof Component> = {
  title: 'Components/Tag',
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
      options: ['light', 'border'],
      control: { type: 'radio' },
    },
    checked: {
      control: 'boolean',
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

export const Tag: Story = {
  args: {
    children: 'Tag',
    leftIcon: undefined,
    rightIcon: undefined,
    size: 's',
    theme: 'light',
    checked: false,
    disabled: false,
    loading: false,
    href: undefined,
  },
};
