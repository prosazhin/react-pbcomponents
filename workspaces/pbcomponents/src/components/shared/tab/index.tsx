'use client';

import Content from '@/components/helpers/content';
import { ButtonOrLinkHTMLAttrs, ButtonOrLinkType, LinkComponentType, TextClassNameType, WithIconsType } from '@/types';
import clsx from 'clsx';
import { ElementType, Ref, useRef } from 'react';

import useMergeRefs from '@/hooks/use-merge-refs';

type BaseTabProps = ButtonOrLinkHTMLAttrs & LinkComponentType & WithIconsType & TextClassNameType;
export interface TabProps extends BaseTabProps {
  label?: string;
  active?: boolean;
  indicator?: boolean;
  ref?: Ref<ButtonOrLinkType>;
}

const Tab = (props: TabProps) => {
  const {
    label,
    active = false,
    indicator = true,
    disabled = false,
    type = 'button',
    target = '_self',
    href: externalHref,
    linkComponent,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    className,
    textClassName,
    ref: externalRef,
    ...rest
  } = props;

  const internalRef = useRef<ButtonOrLinkType>(null);
  const ref = useMergeRefs(internalRef, externalRef);

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
        'pbc pbc:text-text-primary pbc:cursor-pointer pbc:hover:text-text-primary pbc:inline-flex pbc:w-max pbc:flex-nowrap pbc:items-center pbc:justify-center pbc:group pbc:relative pbc:p-0 pbc:pb-12 pbc:bg-transparent',
        indicator &&
          'pbc:after:absolute pbc:after:rounded-999 pbc:after:inset-x-0 pbc:after:bottom-0 pbc:after:z-1 pbc:after:h-2 pbc:after:w-full pbc:after:transition-colors pbc:duration-150',
        active && 'pbc:text-primary-400',
        active && indicator && 'pbc:after:bg-primary-300',
        disabled && 'pbc:text-text-secondary!',
        disabled && indicator && 'pbc:after:hidden!',
        className,
      )}
      type={externalHref ? undefined : type}
      href={href}
      target={externalHref ? target : undefined}
      disabled={disabled}
      aria-disabled={disabled}
    >
      <Content
        className={clsx(
          'pbc:group-hover:bg-secondary-100 pbc:rounded-8 pbc:px-8 pbc:py-2 pbc:transition-colors pbc:duration-150',
          disabled && 'pbc:text-text-secondary! pbc:bg-transparent!',
          textClassName,
        )}
        size='m'
        leftIcon={leftIcon}
        leftIconClassName={leftIconClassName}
        rightIcon={rightIcon}
        rightIconClassName={rightIconClassName}
        medium={true}
      >
        {label}
      </Content>
    </Component>
  );
};

Tab.displayName = 'Tab';
export default Tab;
