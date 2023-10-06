import { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../dist';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';

const icons = { undefined, ArrowLongLeftIcon, ArrowLongRightIcon };

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    size: {
      options: ['xs', 's'],
      control: { type: 'inline-radio' },
    },
    theme: {
      options: ['filled', 'light', 'border'],
      control: { type: 'inline-radio' },
    },
    color: {
      options: ['primary','secondary','success','danger'],
      control: { type: 'inline-radio' },
    },
    leftIcon: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select',
        labels: {
          undefined: 'None',
          ArrowLongLeftIcon: 'Arrow Left',
          ArrowLongRightIcon: 'Arrow Right',
        },
      },
    },
    rightIcon: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select',
        labels: {
          undefined: 'None',
          ArrowLongLeftIcon: 'Arrow Left',
          ArrowLongRightIcon: 'Arrow Right',
        },
      },
    },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Variant: Story = {
  args: {
    children: 'Badge',
    size: 'xs',
    theme: 'filled',
    color: 'primary',
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
  },
};
