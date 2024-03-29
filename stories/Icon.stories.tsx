import { Meta, StoryObj } from '@storybook/react';

import { Icon as Component } from '../src';
import { getIconsArg } from './arg-types';

const meta: Meta<typeof Component> = {
  title: 'Helpers/Icon',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    name: getIconsArg(),
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'radio' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Button: Story = {
  args: {
    name: 'CheckCircleIcon',
    size: 'm',
  },
};
