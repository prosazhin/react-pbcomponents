import clsx from 'clsx';
import Content from '@/components/helpers/content';
import HeroIconType from '@/types/icon';

const sizes = {
  xs: 'py-1 px-2',
  s: 'py-2 px-3',
};

const themes = {
  light: 'bg-primary-lighter  hover:bg-primary-light',
  border: 'border border-secondary-light hover:border-primary-main',
};

export interface TagProps {
  isActive: boolean;
  children: string;
  size: 'xs' | 's';
  theme: 'light' | 'border';
  leftIcon?: HeroIconType;
  rightIcon?: HeroIconType;
  className?: string;
}

const Tag = ({ isActive, children, size, theme, leftIcon, rightIcon, className }: TagProps) => (
  <button
    type='button'
    className={clsx(
      'box-border inline-flex w-max cursor-pointer items-center justify-center rounded-full transition-colors',
      sizes[size],
      themes[theme],
      `${
        isActive &&
        'border-primary-main bg-primary-main text-white hover:!border-primary-darker hover:!bg-primary-darker'
      }`,
      className,
    )}
  >
    <Content size='s' leftIcon={leftIcon} rightIcon={rightIcon} medium={true}>
      {children}
    </Content>
  </button>
);

export default Tag;
