import { DefaultPropsType, HeroIconType } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';

const sizes = {
  xs: 'py-[4px] px-[8px]',
  s: 'py-[8px] px-[12px]',
};

const themes = {
  light: 'bg-primary-lighter hover:bg-primary-light',
  border: 'before:border before:border-secondary-light hover:before:border-primary-main',
};

const active = 'bg-primary-main text-white hover:!bg-primary-darker';

export type Props = DefaultPropsType<{
  as?: React.ElementType;
  isActive: boolean;
  size: 'xs' | 's';
  theme: 'light' | 'border';
  leftIcon?: HeroIconType;
  rightIcon?: HeroIconType;
}>;

const Tag = ({
  as: Component = 'button',
  isActive,
  children,
  size,
  theme,
  leftIcon,
  rightIcon,
  className,
  ...rest
}: Props) => (
  <Component
    className={clsx(
      'inline-flex relative w-max cursor-pointer flex-nowrap group items-center justify-center rounded-full transition-colors before:absolute before:rounded-full before:w-full before:h-full before:transition-colors',
      sizes[size],
      isActive ? active : themes[theme],
      className,
    )}
    {...rest}
  >
    <Content size='s' leftIcon={leftIcon} rightIcon={rightIcon} medium={true}>
      {children}
    </Content>
  </Component>
);

export default Tag;
