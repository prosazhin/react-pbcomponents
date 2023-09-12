import { Meta, StoryObj } from '@storybook/react';
import { Text } from '../dist';

const meta: Meta<typeof Text> = {
  title: 'Helpers/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'inline-radio' },
    },
    medium: { control: 'boolean' },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Variant: Story = {
  args: {
    children: 'label',
    size: 'm',
    medium: false,
    className: '',
  },
};
