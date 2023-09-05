import { Meta, StoryObj } from '@storybook/react';
import { Content } from '../dist';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';

const icons = { undefined, ArrowLongLeftIcon, ArrowLongRightIcon };

const meta: Meta<typeof Content> = {
  title: 'Helpers/Content',
  component: Content,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'inline-radio' },
    },
    medium: { control: 'boolean' },
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

type Story = StoryObj<typeof Content>;

export const Variant: Story = {
  args: {
    children: 'Content',
    size: 'm',
    medium: false,
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
  },
};
