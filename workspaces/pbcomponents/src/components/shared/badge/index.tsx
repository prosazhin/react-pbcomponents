'use client';

import Content from '@/components/helpers/content';
import { ColorType, SMSizeType, TextClassNameType, WithIconsType } from '@/types';
import clsx from 'clsx';
import { HTMLAttributes, Ref } from 'react';

type BaseBadgeProps = HTMLAttributes<HTMLSpanElement> & WithIconsType & SMSizeType & ColorType & TextClassNameType;
export interface BadgeProps extends BaseBadgeProps {
  theme?: 'filled' | 'light' | 'border';
  ref?: Ref<HTMLSpanElement>;
}

const Badge = (props: BadgeProps) => {
  const {
    size = 'm',
    theme = 'filled',
    color = 'primary',
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    children,
    className,
    textClassName,
    ref: externalRef,
    ...rest
  } = props;

  return (
    <span
      {...rest}
      ref={externalRef}
      className={clsx(
        'pbc pbc:rounded-999 pbc:inline-flex pbc:w-max pbc:flex-nowrap pbc:items-center pbc:justify-center pbc:cursor-default!',
        size === 's' && 'pbc:py-4 pbc:px-8 pbc:h-26',
        size === 'm' && 'pbc:py-8 pbc:px-12 pbc:h-34',
        theme === 'filled' && 'pbc:text-text-contrast',
        theme === 'filled' && color === 'primary' && 'pbc:bg-primary-300',
        theme === 'filled' && color === 'secondary' && 'pbc:bg-secondary-300',
        theme === 'filled' && color === 'success' && 'pbc:bg-success-300',
        theme === 'filled' && color === 'danger' && 'pbc:bg-danger-300',
        theme !== 'filled' && color === 'primary' && 'pbc:text-primary-400',
        theme !== 'filled' && color === 'secondary' && 'pbc:text-text-primary',
        theme !== 'filled' && color === 'success' && 'pbc:text-success-400',
        theme !== 'filled' && color === 'danger' && 'pbc:text-danger-400',
        theme === 'light' && color === 'primary' && 'pbc:bg-primary-100',
        theme === 'light' && color === 'secondary' && 'pbc:bg-secondary-100',
        theme === 'light' && color === 'success' && 'pbc:bg-success-100',
        theme === 'light' && color === 'danger' && 'pbc:bg-danger-100',
        theme === 'border' && 'pbc:border',
        theme === 'border' && color === 'primary' && 'pbc:border-primary-300',
        theme === 'border' && color === 'secondary' && 'pbc:border-secondary-300',
        theme === 'border' && color === 'success' && 'pbc:border-success-300',
        theme === 'border' && color === 'danger' && 'pbc:border-danger-300',
        className,
      )}
    >
      <Content
        size='s'
        leftIcon={leftIcon}
        leftIconClassName={leftIconClassName}
        rightIcon={rightIcon}
        rightIconClassName={rightIconClassName}
        medium={true}
        className={textClassName}
      >
        {children}
      </Content>
    </span>
  );
};

Badge.displayName = 'Badge';
export default Badge;
