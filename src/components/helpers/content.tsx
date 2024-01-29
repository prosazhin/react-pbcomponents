import { ComponentWithIconsType } from '@/types';
import clsx from 'clsx';

import Icon from '@/components/helpers/icon';
import Text from '@/components/helpers/text';

const sizes = {
  s: 'gap-x-[6px]',
  m: 'gap-x-[8px]',
  l: 'gap-x-[12px]',
};

export type Props = ComponentWithIconsType & {
  size: 's' | 'm' | 'l';
  medium?: boolean;
};

const Content = ({ children, className, leftIcon: LeftIcon, rightIcon: RightIcon, size, medium }: Props) => (
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
