import clsx from 'clsx';
import Text from '@/components/helpers/text';
import HeroIconType from '@/types/icon';

const iconSizes = {
  s: 'h-4 w-4',
  m: 'h-6 w-6',
  l: 'h-7 w-7',
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
    <span className={clsx('inline-flex items-center gap-2', className)}>
      {LeftIcon && <LeftIcon className={`text-inherit ${iconSizes[size]}`} />}
      {children && (
        <Text size={size} medium={medium}>
          {children}
        </Text>
      )}
      {RightIcon && children && <RightIcon className={`text-inherit ${iconSizes[size]}`} />}
    </span>
  );
};

export default Content;
