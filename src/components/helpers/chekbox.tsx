import { ChangeEvent, useEffect, useRef } from 'react';

import { DefaultPropsType } from '@/types';
import clsx from 'clsx';

export type Props<T = string, E = HTMLInputElement> = DefaultPropsType<{
  size: 's' | 'm';
  disabled?: boolean;
  indeterminate: boolean;
  name: string;
  value?: T;
  checked: boolean;
  onChange?: (event: ChangeEvent<E>) => void;
}>;

const sizes = {
  s: 'w-4 h-4',
  m: 'w-6 h-6 rounded-sm',
};

export const Checkbox = ({ className, name, value, checked, onChange, size, disabled = false, indeterminate = false }: Props) => {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.current) {
      input.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className={clsx('checkbox', { 'disabled:bg-primary-main': disabled }, className)}>
      <input
        type='checkbox'
        ref={input}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className={clsx(
          'border-solid border-secondary-light rounded-sm cursor-pointer checked:bg-primary-main hover:checked:bg-primary-darker outline-none',
          sizes[size],
        )}
      />
    </div>
  );
};

export default Checkbox;
