import { Meta, StoryObj } from '@storybook/react';

import { TabItem as Component } from '../src';
import { getIconsArg } from './arg-types';

const meta: Meta<typeof Component> = {
  title: 'Components/TabItem',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    leftIcon: getIconsArg(),
    rightIcon: getIconsArg(),
    isActive: {
      control: 'boolean',
    },
    isDisabled: {
      control: 'boolean',
    },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Badge: Story = {
  args: {
    children: 'TabItem',
    leftIcon: undefined,
    rightIcon: undefined,
    isActive: false,
    isDisabled: false,
  },
};
