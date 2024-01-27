import { ComponentType } from '@/types';
import clsx from 'clsx';

const styles = {
  s: {
    r: 'text-t4',
    m: 'text-tm4',
  },
  m: {
    r: 'text-t3',
    m: 'text-tm3',
  },
  l: {
    r: 'text-t2',
    m: 'text-tm2',
  },
};

export type Props = ComponentType & {
  size: 's' | 'm' | 'l';
  medium?: boolean;
};

const Text = ({ children, className, size, medium }: Props) => (
  <span className={clsx('text-inherit', medium ? styles[size].m : styles[size].r, className)}>{children}</span>
);

export default Text;
