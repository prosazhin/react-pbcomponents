import { DefaultPropsType, HeroIconType } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';

const sizes = {
  xs: 'py-[4px] px-[8px]',
  s: 'py-[8px] px-[12px]',
  m: 'py-[12px] px-[16px]',
  l: 'py-[18px] px-[24px]',
};

const themes = {
  filled: {
    primary: 'bg-primary-main border-primary-main text-white',
    secondary: 'bg-secondary-main border-secondary-main text-white',
    success: 'bg-success-main border-success-main text-white',
    danger: 'bg-danger-main border-danger-main text-white',
    disabled: 'bg-secondary-lighter border-secondary-lighter text-base-light',
  },
  light: {
    primary: 'bg-primary-lighter border-primary-lighter text-primary-main',
    secondary: 'bg-secondary-lighter border-secondary-lighter text-base-main',
    success: 'bg-success-lighter border-success-lighter text-success-main',
    danger: 'bg-danger-lighter border-danger-lighter text-danger-main',
    disabled: 'bg-secondary-lighter border-secondary-lighter text-base-light',
  },
  border: {
    primary: 'bg-transparent border-primary-light text-primary-main',
    secondary: 'bg-transparent border-secondary-light text-base-main',
    success: 'bg-transparent border-success-light text-success-main',
    danger: 'bg-transparent border-danger-light text-danger-main',
    disabled: 'bg-transparent border-secondary-lighter text-base-light',
  },
  ghost: {
    primary: 'bg-transparent border-transparent text-primary-main',
    secondary: 'bg-transparent border-transparent text-base-main',
    success: 'bg-transparent border-transparent text-success-main',
    danger: 'bg-transparent border-transparent text-danger-main',
    disabled: 'bg-primary-transparent border-transparent text-base-light',
  },
};

const THEME_HOVER = {
  filled: {
    primary: 'bg-primary-primary-darker text-white ',
    secondary: 'bg-secondary-darker text-white',
    success: 'bg-success-darker text-white',
    danger: 'bg-danger-main text-white',
  },
  light: {
    primary: 'bg-primary-light text-primary-main',
    secondary: 'bg-secondary-light text-base-main',
    success: 'bg-success-light text-success-main',
    danger: 'bg-danger-light text-danger-main',
  },
  border: {
    primary: 'bg-primary-lighter text-primary-main',
    secondary: 'bg-secondary-lighter text-base-main',
    success: 'bg-success-lighter text-success-main',
    danger: 'bg-danger-lighter text-danger-main',
  },
  ghost: {
    primary: 'bg-primary-transparent text-primary-main',
    secondary: 'bg-secondary-lighter text-base-main',
    success: 'bg-success-transparent text-success-main',
    danger: 'bg-danger-lighter text-danger-main',
  },
};

export type Props = DefaultPropsType<{
  as?: React.ElementType;
  size: 'xs' | 's' | 'm' | 'l';
  theme: 'filled' | 'light' | 'border' | 'ghost';
  color: 'primary' | 'secondary' | 'success' | 'danger';
  leftIcon?: HeroIconType;
  rightIcon?: HeroIconType;
  isDisabled?: boolean;
}>;

const Button = ({
  as: Component = 'button',
  children,
  size,
  theme,
  color,
  className,
  leftIcon,
  rightIcon,
  isDisabled = false,
  ...rest
}: Props) => (
  <Component
    className={clsx(
      'box-border inline-flex w-max flex-nowrap items-center justify-center rounded-full border transition-colors',
      { 'cursor-default disabled:opacity-75': isDisabled, [THEME_HOVER[theme][color]]: !isDisabled },
      sizes[size],
      isDisabled ? themes[theme].disabled : themes[theme][color],
      className,
    )}
    {...rest}
  >
    <Content size={size === 'xs' ? 's' : size} leftIcon={leftIcon} rightIcon={rightIcon}>
      {children}
    </Content>
  </Component>
);

export default Button;
