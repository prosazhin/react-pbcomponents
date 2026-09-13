'use client';

import { ErrorType, SMSizeType, TextareaEvent, TextareaHTMLAttrs, TextareaType, WrapperClassNameType } from '@/types';
import clsx from 'clsx';
import { Ref } from 'react';

type BaseTextareaProps = Omit<TextareaHTMLAttrs, 'onChange' | 'value'> & ErrorType & SMSizeType & WrapperClassNameType;
export interface TextareaProps extends BaseTextareaProps {
  value: string;
  onChange?: (value: string, event: TextareaEvent) => void;
  ref?: Ref<TextareaType>;
}

const Textarea = (props: TextareaProps) => {
  const {
    onChange = () => {},
    size = 'm',
    disabled = false,
    error = false,
    rows = 3,
    className,
    wrapperClassName,
    ref: externalRef,
    ...rest
  } = props;

  return (
    <div className={clsx('pbc pbc:relative pbc:w-full pbc:p-0 pbc:m-0', wrapperClassName)}>
      <textarea
        {...rest}
        ref={externalRef}
        disabled={disabled}
        className={clsx(
          'pbc pbc:border-solid pbc:block pbc:border pbc:bg-transparent pbc:w-full pbc-scrollbar-hidden pbc:appearance-none pbc:transition-colors pbc:duration-150 pbc:placeholder:text-text-secondary pbc:text-text-primary pbc:focus:ring-0 pbc:focus:ring-offset-0',
          !error &&
            'pbc:border-secondary-200 pbc:hover:border-primary-400 pbc:focus:border-primary-400 pbc:focus:outline-outline-primary pbc:outline-4 pbc:outline-offset-0',
          error &&
            'pbc:border-danger-400 pbc:hover:border-danger-400 pbc:focus:border-danger-400 pbc:focus:outline-outline-danger pbc:outline-4 pbc:outline-offset-0',
          'pbc:disabled:cursor-default! pbc:disabled:bg-secondary-50! pbc:disabled:border-secondary-200! pbc:hover:disabled:border-secondary-200! pbc:hover:disabled:bg-secondary-50!',
          size === 's' && 'pbc:py-8 pbc:px-12 pbc:min-h-34 pbc:text-t12! pbc:rounded-8',
          size === 'm' && 'pbc:py-12 pbc:px-16 pbc:min-h-48 pbc:text-t16! pbc:rounded-12',
          className,
        )}
        rows={rows}
        onChange={(event: TextareaEvent) => onChange(event.target.value, event)}
      />
    </div>
  );
};

Textarea.displayName = 'Textarea';
export default Textarea;
