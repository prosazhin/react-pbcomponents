import * as heroicons from '@heroicons/react/24/outline';
import { Button as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Button/Button',
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
    textClassName: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    size: {
      options: ['xs', 's', 'm', 'l'],
      control: 'radio',
      defaultValue: { summary: 'm' },
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
    loading: {
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
    theme: {
      options: ['filled', 'light', 'border', 'ghost'],
      control: { type: 'radio' },
      defaultValue: { summary: 'filled' },
    },
    color: {
      options: ['primary', 'secondary', 'success', 'danger'],
      control: { type: 'radio' },
      defaultValue: { summary: 'primary' },
    },
  },
  args: {
    children: 'Button',
    size: 'm',
    theme: 'filled',
    color: 'primary',
    disabled: false,
    loading: false,
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
    children,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    size,
    theme,
    color,
    disabled,
    loading,
    className,
    textClassName,
    onClick,
    type,
    href,
    target,
  }) => (
    <Component
      size={size}
      theme={theme}
      color={color}
      disabled={disabled}
      loading={loading}
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
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Button: Story = {
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `<Button theme="filled" color="primary" size="m">
  Button
</Button>`,
      },
    },
  },
};
