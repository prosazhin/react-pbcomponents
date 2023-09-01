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
      options: ['SR','SM','MR','MM','LR','LM'],
      control: {
        type: 'select',
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
    color: {
      options: ['base-main', 'blue-50', 'secondary-main'],
      control: {
        type: 'select',
      },
    }
  }
};


export default meta;

type Story = StoryObj<typeof Text>;

export const Variant: Story = {
  args: {
    size: 'SR',
    color: 'base-main'
  }
};
