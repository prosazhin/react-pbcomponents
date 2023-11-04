import { DefaultPropsType, IconType } from '@/types';
import clsx from 'clsx';

import Icon from '@/components/helpers/icon';
import Text from '@/components/helpers/text';

const sizes = {
  s: 'space-x-[6px]',
  m: 'space-x-[8px]',
  l: 'space-x-[12px]',
};

export type Props = DefaultPropsType<{
  size: 's' | 'm' | 'l';
  medium?: boolean;
  leftIcon?: IconType;
  rightIcon?: IconType;
}>;

const Content = ({ children, size, medium, leftIcon: LeftIcon, rightIcon: RightIcon, className }: Props) => (
  <span className={clsx('inline-flex w-max flex-nowrap items-center', sizes[size], className)}>
    {LeftIcon && <Icon name={LeftIcon} size={size} />}
    {children && (
      <Text size={size} medium={medium}>
        {children}
      </Text>
    )}
    {RightIcon && children && <Icon name={RightIcon} size={size} />}
  </span>
);

export default Content;
