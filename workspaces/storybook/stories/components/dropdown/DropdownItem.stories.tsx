import * as heroicons from '@heroicons/react/24/outline';
import { Badge, DropdownItem as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Dropdown/DropdownItem',
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
    children: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    className: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    wrapperClassName: {
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
    borderTop: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
    borderBottom: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
    badge: {
      options: [undefined, <Badge color='secondary'>badge</Badge>],
      control: {
        type: 'select',
        labels: {
          undefined,
          '[object Object]': 'Badge',
        },
      },
      defaultValue: { summary: undefined },
      table: { type: { summary: 'Button' } },
    },
  },
  args: {
    children: 'Dropdown Item',
    borderTop: false,
    borderBottom: false,
    badge: undefined,
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
    wrapperClassName: '',
    textClassName: '',
  },
  render: ({
    children,
    borderTop,
    borderBottom,
    badge,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    disabled,
    className,
    wrapperClassName,
    textClassName,
    onClick,
    type,
    href,
    target,
  }) => (
    <Component
      disabled={disabled}
      type={type}
      href={href}
      target={target}
      borderTop={borderTop}
      borderBottom={borderBottom}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      leftIconClassName={leftIconClassName ? leftIconClassName : undefined}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      rightIconClassName={rightIconClassName ? rightIconClassName : undefined}
      className={className ? className : undefined}
      wrapperClassName={wrapperClassName ? wrapperClassName : undefined}
      textClassName={textClassName ? textClassName : undefined}
      badge={badge}
      onClick={onClick}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DropdownItem: Story = {};
