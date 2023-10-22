import { Meta, StoryObj } from '@storybook/react';

import { Content as ContentComponent } from '../src';
import { getIconsArg } from './arg-types';

const meta: Meta<typeof ContentComponent> = {
  title: 'Helpers/Content',
  component: ContentComponent,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'radio' },
    },
    medium: { control: 'boolean' },
    leftIcon: getIconsArg(),
    rightIcon: getIconsArg(),
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof ContentComponent>;

export const Content: Story = {
  args: {
    children: 'Content',
    size: 'm',
    medium: false,
    leftIcon: undefined,
    rightIcon: undefined,
  },
};
