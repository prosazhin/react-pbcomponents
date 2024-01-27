import { ComponentType, WithIconsType } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';

const sizes = {
  s: 'py-[4px] px-[8px]',
  m: 'py-[8px] px-[12px]',
};

const themes = {
  filled: {
    primary: 'bg-primary-main text-white',
    secondary: 'bg-secondary-main text-white',
    success: 'bg-success-main text-white',
    danger: 'bg-danger-main text-white',
  },
  light: {
    primary: 'bg-primary-lighter text-primary-main',
    secondary: 'bg-secondary-lighter text-base-main',
    success: 'bg-success-lighter text-success-main',
    danger: 'bg-danger-lighter text-danger-main',
  },
  border: {
    primary: 'before:border-primary-main text-primary-main',
    secondary: 'before:border-secondary-main text-base-main',
    success: 'before:border-success-main text-success-main',
    danger: 'before:border-danger-main text-danger-main',
  },
};

type CombiningTypes = ComponentType & WithIconsType;

export type Props = CombiningTypes & {
  size: 's' | 'm';
  theme: 'filled' | 'light' | 'border';
  color: 'primary' | 'secondary' | 'success' | 'danger';
};

const Badge = ({ children, className, leftIcon, rightIcon, size, theme, color }: Props) => (
  <span
    className={clsx(
      'inline-flex relative w-max cursor-default flex-nowrap items-center justify-center rounded-full before:absolute before:rounded-full before:size-full',
      sizes[size],
      theme === 'border' && 'before:border',
      themes[theme][color],
      className,
    )}
  >
    <Content size='s' leftIcon={leftIcon} rightIcon={rightIcon} medium={true}>
      {children}
    </Content>
  </span>
);

export default Badge;
