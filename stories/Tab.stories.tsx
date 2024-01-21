import { Meta, StoryObj } from '@storybook/react';

import { Tab as Component } from '../src';
import { getIconsArg } from './arg-types';

const meta: Meta<typeof Component> = {
  title: 'Helpers/Tab',
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
    children: 'Tab',
    leftIcon: undefined,
    rightIcon: undefined,
    isActive: false,
    isDisabled: false,
  },
};
