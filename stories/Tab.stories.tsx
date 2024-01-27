import { Meta, StoryObj } from '@storybook/react';

import { Tab as Component } from '../src';
import { getIconsArg } from './arg-types';

const meta: Meta<typeof Component> = {
  title: 'Helpers/Tab',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
    leftIcon: getIconsArg(),
    rightIcon: getIconsArg(),
    active: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    href: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Badge: Story = {
  args: {
    children: 'Tab',
    leftIcon: undefined,
    rightIcon: undefined,
    active: false,
    disabled: false,
    href: undefined,
  },
};
