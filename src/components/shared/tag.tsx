import clsx from 'clsx';
import Content from '@/components/helpers/content';
import HeroIconType from '@/types/icon';

const sizes = {
  xs: 'py-[3px] px-[8px]',
  s: 'py-[7px] px-[12px]',
};

const themes = {
  light: 'bg-primary-lighter border-primary-lighter hover:bg-primary-light hover:border-primary-light',
  border: 'border-secondary-light hover:border-primary-main',
};

const active = 'border-primary-main bg-primary-main text-white hover:!border-primary-darker hover:!bg-primary-darker';

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
      'box-border inline-flex w-max cursor-pointer flex-nowrap items-center justify-center rounded-full border transition-colors',
      sizes[size],
      isActive ? active : themes[theme],
      className,
    )}
  >
    <Content size='s' leftIcon={leftIcon} rightIcon={rightIcon} medium={true}>
      {children}
    </Content>
  </button>
);

export default Tag;
