import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';

import { PolymorphicComponentPropsWithRef, WithIconsType } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';
import Icon from '@/components/helpers/icon';

const sizes = {
  xs: 'py-[4px] px-[8px] rounded-sm before:rounded-sm',
  s: 'py-[8px] px-[12px] rounded-md before:rounded-md',
  m: 'py-[12px] px-[16px] rounded-lg before:rounded-lg',
  l: 'py-[18px] px-[24px] rounded-xl before:rounded-xl',
};

const themes = {
  filled: {
    primary: 'bg-primary-main text-white hover:bg-primary-darker outline-primary',
    secondary: 'bg-secondary-main text-white hover:bg-secondary-darker outline-secondary',
    success: 'bg-success-main text-white hover:bg-success-darker outline-success',
    danger: 'bg-danger-main text-white hover:bg-danger-main outline-danger',
    disabled: 'bg-secondary-lighter text-base-light',
  },
  light: {
    primary: 'bg-primary-lighter text-primary-main hover:bg-primary-light outline-primary',
    secondary: 'bg-secondary-lighter text-base-main hover:bg-secondary-light outline-secondary',
    success: 'bg-success-lighter text-success-main hover:bg-success-light outline-success',
    danger: 'bg-danger-lighter text-danger-main hover:bg-danger-light outline-danger',
    disabled: 'bg-secondary-lighter text-base-light',
  },
  border: {
    primary:
      'before:border-primary-light text-primary-main hover:bg-primary-lighter before:hover:border-primary-lighter outline-primary',
    secondary:
      'before:border-secondary-light text-base-main hover:bg-secondary-lighter before:hover:border-secondary-lighter outline-secondary',
    success:
      'before:border-success-light text-success-main hover:bg-success-lighter before:hover:border-success-lighter outline-success',
    danger:
      'before:border-danger-light text-danger-main hover:bg-danger-lighter before:hover:border-danger-lighter outline-danger',
    disabled: 'before:border-secondary-lighter text-base-light',
  },
  ghost: {
    primary: 'text-primary-main hover:bg-primary-lighter outline-primary outline-primary',
    secondary: 'text-base-main hover:bg-secondary-lighter outline-secondary',
    success: 'text-success-main hover:bg-success-lighter outline-success',
    danger: 'text-danger-main hover:bg-danger-lighter outline-danger',
    disabled: 'text-base-light',
  },
};

export type Props<T extends React.ElementType> = PolymorphicComponentPropsWithRef<
  T,
  WithIconsType & {
    size: 'xs' | 's' | 'm' | 'l';
    theme: 'filled' | 'light' | 'border' | 'ghost';
    color: 'primary' | 'secondary' | 'success' | 'danger';
    loading?: boolean;
  }
>;

const Button = <T extends React.ElementType = 'button' | 'a'>({
  children,
  className,
  leftIcon,
  rightIcon,
  size,
  theme,
  color,
  loading,
  ...rest
}: Props<T>) => {
  const [width, setWidth] = useState<number>(0);
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const { href, disabled } = rest;
  const Component = href ? 'a' : 'button';

  useEffect(() => {
    if (ref && ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, [children, size, leftIcon, rightIcon]);

  return (
    <Component
      className={clsx(
        'inline-flex relative w-max cursor-pointer flex-nowrap items-center justify-center transition-colors before:absolute before:size-full before:transition-colors',
        sizes[size],
        theme === 'border' && 'before:border',
        disabled && !loading ? `${themes[theme].disabled} !cursor-not-allowed` : themes[theme][color],
        className,
      )}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      ref={ref}
      style={{ width: loading ? width : undefined }}
      {...rest}
    >
      {loading ? (
        <Icon
          name={ArrowPathIcon}
          size={size === 'xs' ? 's' : size}
          className={clsx(themes[theme][color], 'animate-spin transition')}
        />
      ) : (
        <Content size={size === 'xs' ? 's' : size} leftIcon={leftIcon} rightIcon={rightIcon} medium={true}>
          {children}
        </Content>
      )}
    </Component>
  );
};

export default Button;
