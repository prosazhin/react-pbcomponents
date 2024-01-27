import { PolymorphicComponentPropsWithRef, WithIconsType } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';

export type Props<T extends React.ElementType> = PolymorphicComponentPropsWithRef<
  T,
  WithIconsType & {
    active: boolean;
  }
>;

const Tab = <T extends React.ElementType = 'button' | 'a'>({
  children,
  className,
  leftIcon,
  rightIcon,
  active,
  ...rest
}: Props<T>) => {
  const { href, disabled } = rest;
  const Component = href ? 'a' : 'button';

  return (
    <Component
      className={clsx(
        'inline-flex relative w-max cursor-pointer group flex-nowrap pb-[12px] items-center justify-center text-base-main hover:text-base-main after:absolute after:w-full after:h-[2px] after:transition-colors after:z-[1] after:bottom-0 after:inset-x-0 after:rounded-full',
        active && 'text-primary-main after:bg-primary-main',
        disabled && '!cursor-not-allowed text-base-light after:hidden',
        className,
      )}
      {...rest}
    >
      <Content
        className={clsx(
          'group-hover:bg-secondary-lighter transition-colors px-[8px] py-[2px] rounded-md',
          disabled && '!cursor-not-allowed !bg-transparent text-base-light',
        )}
        size='m'
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        medium={true}
      >
        {children}
      </Content>
    </Component>
  );
};

export default Tab;
