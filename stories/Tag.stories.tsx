// import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Tag as Component } from '../src';
import { getIconsArg } from './arg-types';

const meta: Meta<typeof Component> = {
  title: 'Components/Tag',
  component: Component,
  // render: ({ ...args }) => {
  //   const asArgs = {
  //     button: {
  //       type: 'button',
  //       onClick: () => {
  //         // eslint-disable-next-line no-console
  //         console.log('Click');
  //       },
  //     },
  //     a: {
  //       href: '#',
  //       target: '_self',
  //     },
  //   };
  //   return <Component {...args} {...asArgs[args.as]} />;
  // },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    as: {
      options: ['button', 'a'],
      control: { type: 'radio' },
    },
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

type Story = StoryObj<typeof Component>;

export const Tag: Story = {
  args: {
    children: 'Tag',
    as: 'button',
    size: 'xs',
    theme: 'light',
    isActive: false,
    leftIcon: undefined,
    rightIcon: undefined,
  },
};
