import { Meta, StoryObj } from '@storybook/react';

import { Content as Component } from '../src';
import { getIconsArg } from './arg-types';

const meta: Meta<typeof Component> = {
  title: 'Helpers/Content',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
    leftIcon: getIconsArg(),
    rightIcon: getIconsArg(),
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'radio' },
    },
    medium: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Content: Story = {
  args: {
    children: 'Content',
    leftIcon: undefined,
    rightIcon: undefined,
    size: 'm',
    medium: false,
  },
};
