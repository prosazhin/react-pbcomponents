import clsx from 'clsx';
import Text from '@/components/helpers/text';
import HeroIconType from '@/types/icon';

const sizes = {
  s: 'space-x-[6px]',
  m: 'space-x-[8px]',
  l: 'space-x-[12px]',
};

const iconSizes = {
  s: 'h-[16px] w-[16px]',
  m: 'h-[24px] w-[24px]',
  l: 'h-[28px] w-[28px]',
};

export interface ContentProps {
  children?: string;
  size: 's' | 'm' | 'l';
  medium?: boolean;
  leftIcon?: HeroIconType;
  rightIcon?: HeroIconType;
  className?: string;
}

const Content = ({ children, size, medium, leftIcon: LeftIcon, rightIcon: RightIcon, className }: ContentProps) => {
  return (
    <span className={clsx('inline-flex w-max flex-nowrap items-center', sizes[size], className)}>
      {LeftIcon && <LeftIcon className={clsx('text-inherit', iconSizes[size])} />}
      {children && (
        <Text size={size} medium={medium}>
          {children}
        </Text>
      )}
      {RightIcon && children && <RightIcon className={clsx('text-inherit', iconSizes[size])} />}
    </span>
  );
};

export default Content;
