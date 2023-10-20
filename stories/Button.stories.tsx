import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../dist';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';

const icons = { undefined, ArrowLongLeftIcon, ArrowLongRightIcon };


const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    size: {
      options: ['xs', 's', 'm', 'l'],
      control: { type: 'inline-radio' },
    },
    theme: {
      options: ['filled', 'light', 'border', 'ghost'],
      control: { type: 'inline-radio' },
    },
    color: {
      options: ['primary','secondary','success','danger'],
      control: { type: 'inline-radio' },
    },
    isDisabled: {
      control: 'boolean',
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

type Story = StoryObj<typeof Button>;

export const Variant: Story = {
  args: {
    children: 'text',
    size: 'm',
    theme: 'filled',
    color: 'primary',
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
  }
};
