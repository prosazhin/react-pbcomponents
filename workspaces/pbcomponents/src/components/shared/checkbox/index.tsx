'use client';

import Content from '@/components/helpers/content';
import Icon from '@/components/helpers/icon';
import { InputEvent, InputHTMLAttrs, InputType, LabelPlaceType, SMSizeType, TextClassNameType, WrapperClassNameType } from '@/types';
import { CheckIcon, MinusIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { Ref, useEffect, useRef } from 'react';

import useMergeRefs from '@/hooks/use-merge-refs';

type BaseCheckboxProps = Omit<InputHTMLAttrs, 'size' | 'onChange' | 'children'> &
  SMSizeType &
  LabelPlaceType &
  WrapperClassNameType &
  TextClassNameType;

export interface CheckboxProps extends BaseCheckboxProps {
  children?: string;
  indeterminate?: boolean;
  value?: string;
  onChange?: (checked: boolean, value: string, event: InputEvent) => void;
  ref?: Ref<InputType>;
}

const Checkbox = (props: CheckboxProps) => {
  const {
    value: externalValue,
    onChange = () => {},
    labelPlace = 'right',
    size = 'm',
    checked = false,
    indeterminate = false,
    disabled = false,
    children,
    className,
    wrapperClassName,
    textClassName,
    ref: externalRef,
    ...rest
  } = props;

  const internalRef = useRef<InputType>(null);
  const ref = useMergeRefs(internalRef, externalRef);

  const value = externalValue ?? children ?? '';

  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate;
    }
  }, [internalRef, indeterminate]);

  let ComponentIcon = CheckIcon;

  if (indeterminate) {
    ComponentIcon = MinusIcon;
  }

  return (
    <label
      className={clsx(
        'pbc pbc:inline-flex pbc:items-center pbc:justify-center pbc:cursor-pointer pbc:flex-nowrap pbc:group',
        size === 's' && 'pbc:gap-4',
        size === 'm' && 'pbc:gap-6',
        disabled && 'pbc:cursor-default!',
        wrapperClassName,
      )}
    >
      <div className={clsx('pbc pbc:relative', size === 's' && 'pbc:size-16 pbc:-mt-3', size === 'm' && 'pbc:size-20')}>
        <input
          {...rest}
          ref={ref}
          type='checkbox'
          value={value}
          checked={checked}
          disabled={disabled}
          className={clsx(
            'pbc pbc:size-full pbc:cursor-pointer pbc:appearance-none pbc:transition-colors pbc:duration-150 pbc:focus:ring-0 pbc:focus:ring-offset-0 pbc:focus:outline-outline-primary pbc:outline-4 pbc:outline-offset-0 pbc:m-0!',
            'pbc:rounded-4 pbc:border-secondary-200 pbc:group-hover:border-primary-300 pbc:border pbc:border-solid',
            'pbc:disabled:cursor-default! pbc:disabled:bg-secondary-100! pbc:disabled:border-secondary-200! pbc:group-hover:disabled:border-secondary-200! pbc:group-hover:disabled:bg-secondary-100!',
            'pbc:checked:bg-primary-300 pbc:checked:border-transparent pbc:group-hover:checked:bg-primary-400 pbc:disabled:checked:bg-primary-200! pbc:disabled:checked:border-transparent! pbc:group-hover:disabled:checked:bg-primary-200!',
            'pbc:indeterminate:bg-primary-300 pbc:indeterminate:border-transparent pbc:group-hover:indeterminate:bg-primary-400 pbc:disabled:indeterminate:bg-primary-200! pbc:disabled:indeterminate:border-transparent! pbc:group-hover:disabled:indeterminate:bg-primary-200!',
            className,
          )}
          onChange={(event) => onChange(event.target.checked, value, event)}
        />
        {(checked || indeterminate) && (
          <Icon
            tag={ComponentIcon}
            size={size}
            className={clsx(
              'pbc:absolute pbc:inset-0 pbc:m-auto pbc:text-text-contrast pbc:pointer-events-none pbc:select-none',
              size === 's' && 'pbc:top-3',
            )}
          />
        )}
      </div>
      {children && (
        <Content
          className={clsx(
            'pbc:flex-1 pbc:transition-colors pbc:duration-150',
            labelPlace === 'left' && 'pbc:order-first pbc:justify-end',
            labelPlace === 'right' && 'pbc:order-last pbc:justify-start',
            disabled ? 'pbc:text-text-secondary' : 'pbc:text-text-primary',
            textClassName,
          )}
          size={size}
        >
          {children}
        </Content>
      )}
    </label>
  );
};

Checkbox.displayName = 'Checkbox';
export default Checkbox;
