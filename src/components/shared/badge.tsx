import clsx from 'clsx';
import Content from '@/components/helpers/content';
import HeroIconType from '@/types/icon';

const sizes = {
  xs: 'py-[3px] px-[8px]',
  s: 'py-[7px] px-[12px]',
};

const themes = {
  filled: {
    primary: 'bg-primary-main text-white',
    secondary: 'bg-secondary-main text-white',
    success: 'bg-success-main text-white',
    danger: 'bg-danger-main text-white',
  },
  light: {
    primary: 'bg-primary-lighter border-primary-lighter text-primary-main',
    secondary: 'bg-secondary-lighter border-primary-lighter text-base-main',
    success: 'bg-success-lighter border-success-lighter text-success-main',
    danger: 'bg-danger-lighter border-danger-lighter text-danger-main',
  },
  border: {
    primary: 'border-primary-main text-primary-main',
    secondary: 'border-secondary-main text-base-main',
    success: 'border-success-main text-success-main',
    danger: 'border-danger-main text-danger-main',
  },
};

export interface BadgeProps {
  children: string;
  size: 'xs' | 's';
  theme: 'filled' | 'light' | 'border';
  color: 'primary' | 'secondary' | 'success' | 'danger';
  leftIcon?: HeroIconType;
  rightIcon?: HeroIconType;
  className?: string;
}

const Badge = ({ children, size, theme, color, leftIcon, rightIcon, className }: BadgeProps) => (
  <button
    type='button'
    className={clsx(
      'box-border inline-flex w-max cursor-pointer flex-nowrap items-center justify-center rounded-full border transition-colors',
      sizes[size],
      themes[theme][color],
      className,
    )}
  >
    <Content size='s' leftIcon={leftIcon} rightIcon={rightIcon} medium={true}>
      {children}
    </Content>
  </button>
);

export default Badge;
