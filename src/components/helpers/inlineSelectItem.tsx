import { DefaultPropsType } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';

const sizes = {
  s: 'space-x-[6px]',
  m: 'space-x-[8px]',
};

export type Props = DefaultPropsType<{
  as?: React.ElementType;
  isActive: boolean;
  size: 's' | 'm';
}>;

const InlineSelectItem = ({ as: Component = 'button', isActive, size, children, className, ...rest }: Props) => (
  <Component
    className={clsx(
      'inline-flex relative w-max cursor-pointer flex-nowrap items-center justify-center rounded-full transition-colors before:absolute before:rounded-full before:w-full before:h-full before:transition-colors',
      isActive ? 'text-primary-main hover:bg-white' : 'text-basic-main',
      className,
      sizes[size],
    )}
    {...rest}
  >
    <Content size={size} medium={true}>
      {children}
    </Content>
  </Component>
);

export default InlineSelectItem;
