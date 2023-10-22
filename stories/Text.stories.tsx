import { Meta, StoryObj } from '@storybook/react';

import { Text as TextComponent } from '../src';

const meta: Meta<typeof TextComponent> = {
  title: 'Helpers/Text',
  component: TextComponent,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'radio' },
    },
    medium: { control: 'boolean' },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof TextComponent>;

export const Text: Story = {
  args: {
    children: 'label',
    size: 'm',
    medium: false,
  },
};
