import { ArrowPathIcon } from '@heroicons/react/24/solid';

import { DefaultPropsType, HeroIconType } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';

const sizes = {
  xs: 'py-[4px] px-[8px] rounded-sm before:rounded-sm',
  s: 'py-[8px] px-[12px] rounded-md before:rounded-md',
  m: 'py-[12px] px-[16px] rounded-lg before:rounded-lg',
  l: 'py-[18px] px-[24px] rounded-xl before:rounded-xl',
};

const themes = {
  filled: {
    primary: 'bg-primary-main text-white hover:bg-primary-darker',
    secondary: 'bg-secondary-main text-white hover:bg-secondary-darker',
    success: 'bg-success-main text-white hover:bg-success-darker',
    danger: 'bg-danger-main text-white hover:bg-danger-main',
    disabled: 'bg-secondary-lighter text-base-light',
  },
  light: {
    primary: 'bg-primary-lighter text-primary-main hover:bg-primary-light',
    secondary: 'bg-secondary-lighter text-base-main hover:bg-secondary-light',
    success: 'bg-success-lighter text-success-main hover:bg-success-light',
    danger: 'bg-danger-lighter text-danger-main hover:bg-danger-light',
    disabled: 'bg-secondary-lighter text-base-light',
  },
  border: {
    primary: 'before:border-primary-light text-primary-main hover:bg-primary-lighter before:hover:border-primary-lighter',
    secondary: 'before:border-secondary-light text-base-main hover:bg-secondary-lighter before:hover:border-secondary-lighter',
    success: 'before:border-success-light text-success-main hover:bg-success-lighter before:hover:border-success-lighter',
    danger: 'before:border-danger-light text-danger-main hover:bg-danger-lighter before:hover:border-danger-lighter',
    disabled: 'before:border-secondary-lighter text-base-light',
  },
  ghost: {
    primary: 'text-primary-main hover:bg-primary-lighter',
    secondary: 'text-base-main hover:bg-secondary-lighter',
    success: 'text-success-main hover:bg-success-lighter',
    danger: 'text-danger-main hover:bg-danger-lighter',
    disabled: 'text-base-light',
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
  isLoading?: boolean;
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
  isLoading = false,
  ...rest
}: Props) => (
  <Component
    className={clsx(
      'inline-flex relative w-max cursor-pointer flex-nowrap items-center justify-center transition-colors before:absolute before:w-full before:h-full before:transition-colors',
      sizes[size],
      theme === 'border' ? 'before:border' : '',
      isDisabled ? `cursor-not-allowed ${themes[theme].disabled}` : themes[theme][color],
      className,
    )}
    disabled={isDisabled}
    aria-disabled={isDisabled}
    {...rest}
  >
    {isLoading ? (
      <ArrowPathIcon className={clsx(themes[theme][color], 'animate-spin h-4 w-4')} />
    ) : (
      <Content size={size === 'xs' ? 's' : size} leftIcon={leftIcon} rightIcon={rightIcon} medium={true}>
        {children}
      </Content>
    )}
  </Component>
);

export default Button;
