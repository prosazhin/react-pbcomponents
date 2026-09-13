'use client';

import Content from '@/components/helpers/content';
import Badge, { BadgeProps } from '@/components/shared/badge';
import { ButtonOrLinkHTMLAttrs, LinkComponentType, TextClassNameType, WithIconsType, WrapperClassNameType } from '@/types';
import clsx from 'clsx';
import { ElementType, ReactElement } from 'react';

type BaseDropdownItemProps = Omit<ButtonOrLinkHTMLAttrs, 'children'> &
  LinkComponentType &
  WithIconsType &
  WrapperClassNameType &
  TextClassNameType;
export interface DropdownItemProps extends BaseDropdownItemProps {
  children?: string;
  badge?: ReactElement<BadgeProps>;
  borderTop?: boolean;
  borderBottom?: boolean;
}

const DropdownItem = (props: DropdownItemProps) => {
  const {
    disabled = false,
    borderTop = false,
    borderBottom = false,
    type = 'button',
    target = '_self',
    href: externalHref,
    linkComponent,
    badge,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    children,
    className,
    wrapperClassName,
    textClassName,
    ...rest
  } = props;

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
    <div
      className={clsx(
        'pbc:border pbc:border-solid pbc:border-transparent pbc:flex pbc:flex-col',
        borderTop && 'pbc:border-t-secondary-100 pbc:mt-8 pbc:pt-8',
        borderBottom && 'pbc:border-b-secondary-100 pbc:mb-8 pbc:pb-8',
        wrapperClassName,
      )}
    >
      <Component
        {...rest}
        className={clsx(
          'pbc pbc:w-full pbc:flex pbc:flex-row pbc:items-center pbc:gap-8 pbc:px-20 pbc:py-12 pbc:cursor-pointer pbc:transition-colors pbc:duration-150 pbc:rounded-12 pbc:max-h-48',
          'pbc:bg-transparent pbc:text-text-primary pbc:hover:bg-secondary-100',
          disabled && 'pbc:cursor-default! pbc:text-text-secondary! pbc:bg-transparent!',
          className,
        )}
        type={externalHref ? undefined : type}
        href={href}
        target={externalHref ? target : undefined}
        disabled={disabled}
        aria-disabled={disabled}
      >
        <Content
          size='m'
          leftIcon={leftIcon}
          leftIconClassName={leftIconClassName}
          rightIcon={rightIcon}
          rightIconClassName={rightIconClassName}
          className={clsx('pbc:w-full pbc:text-left', textClassName)}
        >
          {children}
        </Content>
        {badge && <Badge {...badge.props} size='s' />}
      </Component>
    </div>
  );
};

DropdownItem.displayName = 'DropdownItem';
export default DropdownItem;
