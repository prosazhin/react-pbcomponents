import { DefaultPropsType, IconType } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';

export type Props = DefaultPropsType<{
  as?: React.ElementType;
  isActive: boolean;
  leftIcon?: IconType;
  rightIcon?: IconType;
}>;

const tabItem = ({ as: Component = 'button', children, isActive, leftIcon, rightIcon, className, ...rest }: Props) => (
  <Component
    className={clsx(
      'inline-flex relative w-max cursor-pointer flex-nowrap items-center justify-center' +
        'transition-colors before:absolute before:w-full before:h-full before:transition-colors ' +
        'hover:bg-secondary-lighter rounded-md',
      !isActive ? 'bg-basic-light' : 'text-primary-main hover:bg-secondary-lighter text-basic-main ',
      className,
    )}
    {...rest}
  >
    <Content size='s' leftIcon={leftIcon} rightIcon={rightIcon} medium={true}>
      {children}
    </Content>
  </Component>
);

export default tabItem;
