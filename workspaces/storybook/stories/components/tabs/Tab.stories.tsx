import * as heroicons from '@heroicons/react/24/outline';
import { Tab as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Tabs/Tab',
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
    textClassName: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    leftIcon: {
      options: [undefined, ...Object.keys(heroicons)],
      control: 'select',
      defaultValue: { summary: undefined },
      table: { type: { summary: 'svg' } },
    },
    leftIconClassName: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    rightIcon: {
      options: [undefined, ...Object.keys(heroicons)],
      control: 'select',
      defaultValue: { summary: undefined },
      table: { type: { summary: 'svg' } },
    },
    rightIconClassName: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    active: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
    disabled: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
    type: {
      options: ['button', 'reset', 'submit'],
      control: 'radio',
      defaultValue: { summary: 'button' },
      type: 'string',
    },
    onClick: {
      defaultValue: { summary: undefined },
      table: { type: { summary: '(event: Event) => void' } },
    },
    href: {
      control: 'text',
      defaultValue: { summary: undefined },
    },
    linkComponent: {
      control: false,
      defaultValue: { summary: 'a' },
      table: { type: { summary: 'React.ElementType' } },
    },
    target: {
      options: ['_self', '_blank'],
      control: 'radio',
      defaultValue: { summary: '_self' },
    },
    label: {
      control: 'text',
      defaultValue: { summary: undefined },
    },
  },
  args: {
    label: 'Tab',
    active: false,
    disabled: false,
    href: '#',
    target: '_self',
    type: 'button',
    onClick: () => {},
    leftIcon: undefined,
    leftIconClassName: '',
    rightIcon: undefined,
    rightIconClassName: '',
    className: '',
    textClassName: '',
  },
  render: ({
    label,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    active,
    disabled,
    href,
    target,
    type,
    onClick,
    className,
    textClassName,
  }) => (
    <Component
      label={label}
      active={active}
      disabled={disabled}
      type={type}
      href={href}
      target={target}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      leftIconClassName={leftIconClassName ? leftIconClassName : undefined}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      rightIconClassName={rightIconClassName ? rightIconClassName : undefined}
      className={className ? className : undefined}
      textClassName={textClassName ? textClassName : undefined}
      onClick={onClick}
    />
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Tab: Story = {};
