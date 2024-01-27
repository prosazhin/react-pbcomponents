import { ButtonOrLinkType, ComponentType, WithIconsType } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';

type CombiningTypes = ComponentType & ButtonOrLinkType & WithIconsType;

export type Props = CombiningTypes & {
  active: boolean;
};

const Tab = ({ children, className, leftIcon, rightIcon, active, ...rest }: Props) => {
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
