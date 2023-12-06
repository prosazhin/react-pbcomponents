import {Meta, StoryObj} from '@storybook/react';
import { Tabs as Component } from '../src';


type Story = StoryObj<typeof Component>;

const meta: Meta<typeof Component> = {
  title: 'Components/Tabs',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    },
}
export default meta;



export const Tabs: Story = {
  args: {
    tabs: ['test', 'test2', 'test3'],
    initialActiveTab: 1,
  },
};
