import { DefaultPropsType, IconType } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';

export type Props = DefaultPropsType<{
  as?: React.ElementType;
  isActive: boolean;
  isDisabled?: boolean;
  leftIcon?: IconType;
  rightIcon?: IconType;
}>;

const Tab = ({
  as: Component = 'button',
  children,
  isActive,
  leftIcon,
  rightIcon,
  className,
  isDisabled = false,
  ...rest
}: Props) => (
  <Component
    className={clsx(
      'inline-flex relative w-max cursor-pointer flex-nowrap items-center justify-center' +
        'transition-colors before:absolute before:w-full before:h-full before:transition-colors ' +
        ' rounded-[8px] px-[8px] py-[2px] mb-[12px]',
      !isActive ? 'text-basic-main mb-[12px] hover:bg-secondary-lighter' : 'text-primary-main mb-[12px]',
      isDisabled ? '!cursor-not-allowed bg-secondary-lighter text-base-light mb-[12px]' : '',
      className,
    )}
    {...rest}
  >
    <Content size='m' leftIcon={leftIcon} rightIcon={rightIcon} medium={true}>
      <div className='group-hover/children:bg-secondary-lighter'>{children}</div>
      {isActive && <div className='bg-primary-main py-[1px] rounded-sm mt-[12px]' />}
    </Content>
  </Component>
);

export default Tab;
