import { Collapse, CollapseGroup as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Collapse/CollapseGroup',
  component: Component,
  decorators: [
    (Story) => (
      <Container size='s'>
        <div style={{ paddingTop: '40px' }}>
          <Story />
        </div>
      </Container>
    ),
  ],
  argTypes: {
    className: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    children: {
      control: 'object',
      table: { type: { summary: 'Collapse[]' } },
      defaultValue: { summary: undefined },
    },
    name: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    joined: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
  },
  args: {
    children: ['One', 'Two', 'Three', 'Four', 'Five'].map((value, index) => (
      <Collapse key={index} summary={`Summary ${value}`} open={index === 0}>
        {value}
      </Collapse>
    )),
    name: 'preview',
    joined: false,
    className: '',
  },
  render: ({ children, className, name, joined }) => (
    <Component name={name} joined={joined} className={className ? className : undefined}>
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CollapseGroup: Story = {};
