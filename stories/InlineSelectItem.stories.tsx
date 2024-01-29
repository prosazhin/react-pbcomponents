import * as React from 'react'
import { Meta, StoryObj } from '@storybook/react';

import { InlineSelectItem as Component } from '../src';

const meta: Meta<typeof Component> = {
  title: 'Helpers/InlineSelectItem',
  component: Component,
  render: ({...args}) => {
    const asArgs = {
      button: {
        type: 'button',
        onClick: () => {
          // eslint-disable-next-line no-console
          console.log('Click');
        },
      },
    };

    return <Component {...args} {...asArgs[args.as]} />;
  },
  tags: ['autodocs'],
  argTypes: {
    children: {control: 'text'},
    size: {
      options: ['s', 'm'],
      control: {type: 'radio'},
    },
    isActive: {
      control: 'boolean',
    },
    className: {control: 'text'},
  }
};

export default meta;

type Story = StoryObj<typeof Component>;

export const InlineSelectItem: Story = {
  args: {
    children: 'Inline-Select-Item',
    size: 's',
    isActive: false,
  },
};
