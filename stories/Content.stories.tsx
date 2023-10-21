import { Meta, StoryObj } from '@storybook/react';

import { Content } from '../src';
import { getIconsArg } from './arg-types';

const meta: Meta<typeof Content> = {
  title: 'Helpers/Content',
  component: Content,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'inline-radio' },
    },
    medium: { control: 'boolean' },
    leftIcon: getIconsArg(),
    rightIcon: getIconsArg(),
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Content>;

export const Variant: Story = {
  args: {
    children: 'Content',
    size: 'm',
    medium: false,
    leftIcon: undefined,
    rightIcon: undefined,
  },
};
