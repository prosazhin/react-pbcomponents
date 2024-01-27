import { IconType, WithClassNameType } from '@/types';
import clsx from 'clsx';

const sizes = {
  s: {
    size: 16,
    class: 'size-[16px]',
  },
  m: {
    size: 24,
    class: 'size-[24px]',
  },
  l: {
    size: 28,
    class: 'size-[28px]',
  },
};

type CombiningTypes = WithClassNameType;

export type Props = CombiningTypes & {
  name: IconType;
  size: 's' | 'm' | 'l';
};

const Icon = ({ className, name: IconTag, size }: Props) => (
  <IconTag
    width={sizes[size].size}
    height={sizes[size].size}
    className={clsx('text-inherit bg-transparent', sizes[size].class, className)}
  />
);

export default Icon;
