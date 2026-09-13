'use client';

import Content from '@/components/helpers/content';
import Icon from '@/components/helpers/icon';
import {
  ButtonOrLinkHTMLAttrs,
  ButtonOrLinkType,
  ColorType,
  LinkComponentType,
  LoadingType,
  SizeType,
  TextClassNameType,
  ThemeType,
  WithIconsType,
} from '@/types';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { ElementType, Ref, useEffect, useRef, useState } from 'react';

import useMergeRefs from '@/hooks/use-merge-refs';

type BaseButtonProps = Omit<ButtonOrLinkHTMLAttrs, 'children'> &
  LinkComponentType &
  LoadingType &
  ColorType &
  SizeType &
  ThemeType &
  WithIconsType &
  TextClassNameType;

export interface ButtonProps extends BaseButtonProps {
  children?: string;
  ref?: Ref<ButtonOrLinkType>;
}

const Button = (props: ButtonProps) => {
  const {
    size = 'm',
    theme = 'filled',
    color = 'primary',
    loading = false,
    disabled = false,
    type = 'button',
    target = '_self',
    href: externalHref,
    linkComponent,
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

  const internalRef = useRef<ButtonOrLinkType>(null);
  const ref = useMergeRefs(internalRef, externalRef);

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (internalRef.current) {
      setWidth(internalRef.current.offsetWidth);
    }
  }, [internalRef, children, size, leftIcon, rightIcon]);

  let href = externalHref ? externalHref : undefined;

  if (disabled) {
    href = undefined;
  }

  // у задизейбленной ссылки href снят, а кастомный link-компонент (например NextLink)
  // без href падает — поэтому в этом случае рендерим обычный <a>
  let Component: ElementType = 'button';

  if (href && linkComponent) {
    Component = linkComponent;
  } else if (externalHref) {
    Component = 'a';
  }

  return (
    <Component
      {...rest}
      ref={ref}
      className={clsx(
        'pbc pbc:inline-flex pbc:w-max pbc:max-xs:w-full pbc:flex-nowrap pbc:items-center pbc:cursor-pointer pbc:justify-center pbc:transition-colors pbc:duration-150',
        size === 'xs' && 'pbc:py-4 pbc:px-8 pbc:rounded-6 pbc:h-26',
        size === 's' && 'pbc:py-8 pbc:px-12 pbc:rounded-8 pbc:h-34',
        size === 'm' && 'pbc:py-12 pbc:px-16 pbc:rounded-12 pbc:h-48',
        size === 'l' && 'pbc:py-16 pbc:px-20 pbc:rounded-16 pbc:h-62',
        theme === 'filled' && 'pbc:text-text-contrast',
        theme === 'filled' && color === 'primary' && 'pbc:bg-primary-300 pbc:hover:bg-primary-400',
        theme === 'filled' && color === 'secondary' && 'pbc:bg-secondary-300 pbc:hover:bg-secondary-400',
        theme === 'filled' && color === 'success' && 'pbc:bg-success-300 pbc:hover:bg-success-400',
        theme === 'filled' && color === 'danger' && 'pbc:bg-danger-300 pbc:hover:bg-danger-400',
        theme === 'filled' && disabled && !loading && 'pbc:bg-secondary-100! pbc:text-text-secondary!',
        theme !== 'filled' && color === 'primary' && 'pbc:text-primary-400',
        theme !== 'filled' && color === 'secondary' && 'pbc:text-text-primary',
        theme !== 'filled' && color === 'success' && 'pbc:text-success-400',
        theme !== 'filled' && color === 'danger' && 'pbc:text-danger-400',
        theme === 'light' && color === 'primary' && 'pbc:bg-primary-100 pbc:hover:bg-primary-200',
        theme === 'light' && color === 'secondary' && 'pbc:bg-secondary-100 pbc:hover:bg-secondary-200',
        theme === 'light' && color === 'success' && 'pbc:bg-success-100 pbc:hover:bg-success-200',
        theme === 'light' && color === 'danger' && 'pbc:bg-danger-100 pbc:hover:bg-danger-200',
        theme === 'light' && disabled && !loading && 'pbc:bg-secondary-100! pbc:text-text-secondary!',
        theme === 'border' && 'pbc:border pbc:border-solid pbc:hover:border-transparent',
        theme === 'border' && color === 'primary' && 'pbc:border-primary-200 pbc:hover:bg-primary-100',
        theme === 'border' && color === 'secondary' && 'pbc:border-secondary-200 pbc:hover:bg-secondary-100',
        theme === 'border' && color === 'success' && 'pbc:border-success-200 pbc:hover:bg-success-100',
        theme === 'border' && color === 'danger' && 'pbc:border-danger-200 pbc:hover:bg-danger-100',
        theme === 'border' && disabled && !loading && 'pbc:border-secondary-200! pbc:text-text-secondary!',
        theme === 'ghost' && color === 'primary' && 'pbc:hover:bg-primary-100',
        theme === 'ghost' && color === 'secondary' && 'pbc:hover:bg-secondary-100',
        theme === 'ghost' && color === 'success' && 'pbc:hover:bg-success-100',
        theme === 'ghost' && color === 'danger' && 'pbc:hover:bg-danger-100',
        color === 'primary' && 'pbc:focus:outline-outline-primary pbc:outline-4 pbc:outline-offset-0',
        color === 'secondary' && 'pbc:focus:outline-outline-secondary pbc:outline-4 pbc:outline-offset-0',
        color === 'success' && 'pbc:focus:outline-outline-success pbc:outline-4 pbc:outline-offset-0',
        color === 'danger' && 'pbc:focus:outline-outline-danger pbc:outline-4 pbc:outline-offset-0',
        theme === 'ghost' && disabled && !loading && 'pbc:text-text-secondary!',
        (theme === 'border' || theme === 'ghost') && 'pbc:bg-transparent',
        (disabled || loading) && 'pbc:cursor-default!',
        className,
      )}
      type={externalHref ? undefined : type}
      href={href}
      target={externalHref ? target : undefined}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      style={{ width: loading ? width : undefined }}
    >
      {loading ? (
        <Icon tag={ArrowPathIcon} size={size === 'xs' ? 's' : size} className={clsx('pbc:animate-spin pbc:transition')} />
      ) : (
        <Content
          size={size === 'xs' ? 's' : size}
          leftIcon={leftIcon}
          leftIconClassName={leftIconClassName}
          rightIcon={rightIcon}
          rightIconClassName={rightIconClassName}
          medium={true}
          className={textClassName}
        >
          {children}
        </Content>
      )}
    </Component>
  );
};

Button.displayName = 'Button';
export default Button;
