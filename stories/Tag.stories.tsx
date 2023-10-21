import { Meta, StoryObj } from '@storybook/react';

import { Tag } from '../src';
import { getIconsArg } from './arg-types';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    size: {
      options: ['xs', 's'],
      control: { type: 'inline-radio' },
    },
    theme: {
      options: ['light', 'border'],
      control: { type: 'inline-radio' },
    },
    isActive: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    leftIcon: getIconsArg(),
    rightIcon: getIconsArg(),
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Variant: Story = {
  args: {
    children: 'Tag',
    size: 'xs',
    theme: 'light',
    isActive: false,
    leftIcon: undefined,
    rightIcon: undefined,
  },
};
