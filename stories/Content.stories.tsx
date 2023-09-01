import {Meta, StoryObj} from '@storybook/react';
import { Content } from '../dist';

const meta: Meta<typeof Content> = {
  title: 'Components/Content',
  component: Content,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['S', 'M', 'L'],
      control: {
        type: 'select',
      },
      label: {
        control: {
          type: 'text',
        },
      },
      color: {
        options: ['text-black', 'text-white', 'text-gray-50'],
        control: {
          type: 'select',
        },
      },

    }
  }
};

export default meta;

type Story = StoryObj<typeof Content>;

export const Variant: Story = {
  args: {
    size: 'S',
    label: 'Content',
    color: 'text-black',
    isRightIcon: true,
    isLeftIcon: true,
  }
};

