import {Meta, StoryObj} from '@storybook/react';
import { Content } from '../dist';

const meta: Meta<typeof Content> = {
  title: 'Components/Content',
  component: Content,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['s', 'm', 'l'],
      control: {
        type: 'select',
      },
      label: {
        control: {
          type: 'text',
        },
      },
      },

    }
};

export default meta;

type Story = StoryObj<typeof Content>;

export const Variant: Story = {
  args: {
    size: 's',
    label: 'Content',
    isRightIcon: true,
    isLeftIcon: true,
  }
};

