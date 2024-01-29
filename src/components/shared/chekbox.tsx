import { useEffect, useRef } from 'react';

import { PolymorphicComponentPropsWithRef } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';

const sizes = {
  s: 'size-[16px]',
  m: 'size-[24px]',
};

const places = {
  left: 'order-first',
  right: 'order-last',
};

const state = {
  checked: 'checked:bg-primary-main hover:checked:bg-primary-darker hover:disabled:checked:bg-primary-main outline-primary',
  indeterminate:
    'indeterminate:bg-primary-main hover:indeterminate:bg-primary-darker hover:disabled:indeterminate:bg-primary-main outline-primary',
  disabled:
    'disabled:bg-base-lighter disabled:border-secondary-light hover:disabled:border-secondary-light hover:disabled:bg-base-lighter',
};

export type Props<T extends React.ElementType> = PolymorphicComponentPropsWithRef<
  T,
  {
    labelPlace: 'left' | 'right';
    size: 's' | 'm';
    checked: boolean;
    indeterminate?: boolean;
    setChecked: (value: boolean) => void;
  }
>;

export const Checkbox = <T extends React.ElementType = 'input'>({
  className,
  labelPlace = 'right',
  size,
  checked,
  indeterminate,
  label,
  disabled,
  setChecked,
}: Props<T>) => {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.current) {
      input.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  return (
    <label
      className={clsx(
        'inline-flex cursor-pointer gap-x-[8px] transition-colors w-max flex-nowrap',
        disabled && '!cursor-not-allowed',
        className,
      )}
    >
      <input
        type='checkbox'
        ref={input}
        checked={checked}
        disabled={disabled}
        className={clsx(
          'appearance-none border cursor-pointer border-secondary-light disabled:!cursor-not-allowed focus:ring-0 focus:ring-offset-0 rounded-xs transition-colors hover:border-primary-main outline-primary',
          checked && state.checked,
          indeterminate && state.indeterminate,
          disabled && !checked && !indeterminate && state.disabled,
          sizes[size],
        )}
        onChange={(event) => setChecked(event.target.checked)}
      />
      {label && (
        <Content className={clsx('flex-1', places[labelPlace], disabled ? 'text-base-light' : 'text-base-main')} size={size}>
          {label}
        </Content>
      )}
    </label>
  );
};

export default Checkbox;
