import { DefaultPropsType, IconType } from '@/types';
import clsx from 'clsx';

const sizes = {
  s: {
    size: 16,
    class: 'h-[16px] w-[16px]',
  },
  m: {
    size: 24,
    class: 'h-[24px] w-[24px]',
  },
  l: {
    size: 28,
    class: 'h-[28px] w-[28px]',
  },
};

export type Props = DefaultPropsType<{
  name: IconType;
  size: 's' | 'm' | 'l';
}>;

const Icon = ({ name: IconTag, size, className }: Props) => (
  <IconTag
    width={sizes[size].size}
    height={sizes[size].size}
    className={clsx('text-inherit bg-transparent', sizes[size].class, className)}
  />
);

export default Icon;
