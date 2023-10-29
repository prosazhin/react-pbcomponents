import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { Button as Component } from '../src';
import { getIconsArg } from './arg-types';

const meta: Meta<typeof Component> = {
  title: 'Components/Button',
  component: Component,
  render: (args) => {
    const asArgs = {
      button: {
        type: 'button',
        onClick: () => {
          // eslint-disable-next-line no-console
          console.log('Click');
        },
      },
      a: {
        href: '#',
        target: '_self',
      },
    };

    return <Component {...args} {...asArgs[args.as]} />;
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    as: {
      options: ['button', 'a'],
      control: { type: 'radio' },
    },
    size: {
      options: ['xs', 's', 'm', 'l'],
      control: { type: 'radio' },
    },
    theme: {
      options: ['filled', 'light', 'border', 'ghost'],
      control: { type: 'radio' },
    },
    color: {
      options: ['primary', 'secondary', 'success', 'danger'],
      control: { type: 'radio' },
    },
    isDisabled: {
      control: 'boolean',
    },
    isLoading: {
      control: 'boolean',
    },
    leftIcon: getIconsArg(),
    rightIcon: getIconsArg(),
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Button: Story = {
  args: {
    children: 'Button',
    as: 'button',
    size: 's',
    theme: 'filled',
    color: 'primary',
    leftIcon: undefined,
    rightIcon: undefined,
    isDisabled: false,
    isLoading: false,
  },
};
