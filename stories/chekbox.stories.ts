import { Meta, StoryObj } from '@storybook/react';

import { Chekbox as Component } from '../src';

const meta: Meta<typeof Component> = {
  title: 'Components/Chekbox',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    labelPlace: {
      options: ['left', 'right'],
      control: { type: 'radio' },
    },
    size: {
      options: ['s', 'm'],
      control: { type: 'radio' },
    },
    checked: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Chekbox: Story = {
  args: {
    label: 'Chekbox',
    labelPlace: 'right',
    size: 'm',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
};
