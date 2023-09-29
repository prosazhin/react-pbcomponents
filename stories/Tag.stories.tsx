import { Meta, StoryObj } from '@storybook/react';
import { Tag } from '../dist';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';

const icons = { undefined, ArrowLongLeftIcon, ArrowLongRightIcon };

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    size: {
      options: ['xs', 's'],
      control: { type: 'inline-radio' },
    },
    theme: {
      options: ['light', 'border'],
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
    isActive: {
      options: [true, false],
      control: {type: 'inline-radio'},
    }
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Variant: Story = {
  args: {
    children: 'Tag',
    size: 'xs',
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
    isActive: false,
  },
};
