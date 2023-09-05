import {Meta, StoryObj} from '@storybook/react';
import { Text } from '../dist';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Props } from '../src/components/shared/text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    label: 'label',
  },
  argTypes: {
    size: {
      options: ['s','m','l'],
      control: {
        type: 'select',
      },
    },
    weight: {
      options: ['medium','normal'],
      control: {
        type: 'select',
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
  }
};


export default meta;

type Story = StoryObj<typeof Text>;

export const Variant: Story = {
  args: {
    size: 's',
    weight: 'normal'
  }
};
