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

export interface TextProps {
  children: string;
  size: 's' | 'm' | 'l';
  medium?: boolean;
  className?: string;
}

const Text = ({ children, size, medium, className }: TextProps) => (
  <span
    className={clsx('text-inherit', medium ? styles[size].m : styles[size].r, className)}
    dangerouslySetInnerHTML={{ __html: children }}
  />
);

export default Text;
