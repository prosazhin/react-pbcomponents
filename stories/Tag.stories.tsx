import { Meta, StoryObj } from '@storybook/react';

import { Tag as TagComponent } from '../src';
import { getIconsArg } from './arg-types';

const meta: Meta<typeof TagComponent> = {
  title: 'Components/Tag',
  component: TagComponent,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    size: {
      options: ['xs', 's'],
      control: { type: 'radio' },
    },
    theme: {
      options: ['light', 'border'],
      control: { type: 'radio' },
    },
    isActive: {
      control: 'boolean',
    },
    leftIcon: getIconsArg(),
    rightIcon: getIconsArg(),
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof TagComponent>;

export const Tag: Story = {
  args: {
    children: 'Tag',
    size: 'xs',
    theme: 'light',
    isActive: false,
    leftIcon: undefined,
    rightIcon: undefined,
  },
};
