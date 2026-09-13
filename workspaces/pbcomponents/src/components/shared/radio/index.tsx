'use client';

import Content from '@/components/helpers/content';
import { InputEvent, InputHTMLAttrs, InputType, LabelPlaceType, SMSizeType, TextClassNameType, WrapperClassNameType } from '@/types';
import clsx from 'clsx';
import { Ref } from 'react';

type BaseRadioProps = Omit<InputHTMLAttrs, 'size' | 'onChange' | 'value' | 'children'> &
  LabelPlaceType &
  SMSizeType &
  WrapperClassNameType &
  TextClassNameType;

export interface RadioProps extends BaseRadioProps {
  children?: string;
  value?: string;
  onChange?: (checked: boolean, value: string, event: InputEvent) => void;
  ref?: Ref<InputType>;
}

const Radio = (props: RadioProps) => {
  const {
    value: externalValue,
    onChange = () => {},
    labelPlace = 'right',
    size = 'm',
    checked = false,
    disabled = false,
    children,
    className,
    wrapperClassName,
    textClassName,
    ref: externalRef,
    ...rest
  } = props;

  const value = externalValue ?? children ?? '';

  return (
    <label
      className={clsx(
        'pbc pbc:inline-flex pbc:items-center pbc:cursor-pointer pbc:flex-nowrap pbc:group',
        size === 's' && 'pbc:gap-4',
        size === 'm' && 'pbc:gap-6',
        disabled && 'pbc:cursor-default!',
        wrapperClassName,
      )}
    >
      <input
        {...rest}
        ref={externalRef}
        type='radio'
        value={value}
        checked={checked}
        disabled={disabled}
        className={clsx(
          'pbc pbc:relative pbc:cursor-pointer pbc:appearance-none pbc:transition-colors pbc:duration-150 pbc:focus:ring-0 pbc:focus:ring-offset-0 pbc:focus:outline-outline-primary pbc:outline-4 pbc:outline-offset-0 pbc:m-0!',
          'pbc:rounded-999 pbc:border-secondary-200 pbc:group-hover:border-primary-300 pbc:border pbc:border-solid',
          'pbc:disabled:cursor-default! pbc:disabled:bg-secondary-100! pbc:disabled:border-secondary-200! pbc:group-hover:disabled:border-secondary-200! pbc:group-hover:disabled:bg-secondary-100!',
          'pbc:checked:bg-primary-300 pbc:checked:border-transparent pbc:group-hover:checked:bg-primary-400 pbc:disabled:checked:bg-primary-200! pbc:disabled:checked:border-transparent! pbc:group-hover:disabled:checked:bg-primary-200!',
          'pbc:before:absolute pbc:before:bg-transparent pbc:before:rounded-999 pbc:checked:before:bg-basic-0 pbc:before:inset-0 pbc:before:m-auto',
          size === 's' && 'pbc:size-16 pbc:before:size-6',
          size === 'm' && 'pbc:size-20 pbc:before:size-8',
          className,
        )}
        onChange={(event) => onChange(event.target.checked, value, event)}
      />
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

Radio.displayName = 'Radio';
export default Radio;
