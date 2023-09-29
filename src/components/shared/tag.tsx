import clsx from 'clsx';
import Content from '@/components/helpers/content';
import HeroIconType from '@/types/icon';

const sizes = {
  xs: 'py-1 px-2 rounded-full',
  s: 'py-2 px-3 rounded-full',
};

const colores = {
  light: 'bg-primary-lighter',
  border: 'border border-secondary-light',
};

const hover = {
  light: 'hover:bg-primary-light',
  border: 'hover:border-secondary-main',
};

export interface TagProps {
  isActive: boolean;
  children: string;
  size: 'xs' | 's';
  theme?: 'light' | 'border';
  leftIcon?: HeroIconType;
  rightIcon?: HeroIconType;
  className?: string;
}

const Tag = ({ isActive, children, size, theme = 'light', leftIcon, rightIcon, className }: TagProps) => (
  <span
    className={clsx(
      `${isActive && 'bg-primary-main text-white hover:bg-primary-darker'}`,
      sizes[size],
      colores[theme],
      hover[theme],
      'flex w-max items-center hover:ease-in',
      className,
    )}
  >
    {/* eslint-disable-next-line react/no-children-prop */}
    <Content size='s' children={children} leftIcon={leftIcon} rightIcon={rightIcon} medium={true} />
  </span>
);

export default Tag;
