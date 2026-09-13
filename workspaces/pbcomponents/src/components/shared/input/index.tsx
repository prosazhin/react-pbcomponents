'use client';

import Icon from '@/components/helpers/icon';
import Button, { ButtonProps } from '@/components/shared/button';
import {
  ErrorType,
  InputEvent,
  InputHTMLAttrs,
  InputType,
  SMSizeType,
  TextClassNameType,
  WithIconsType,
  WrapperClassNameType,
} from '@/types';
import clsx from 'clsx';
import { Children, HTMLAttributes, ReactElement, ReactNode, Ref, cloneElement, isValidElement, useMemo } from 'react';

type BaseInputProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & SMSizeType & ErrorType & WrapperClassNameType;
export interface InputProps extends BaseInputProps {
  children?: ReactNode;
  disabled?: boolean;
}

export interface InputControlProps extends Omit<InputHTMLAttrs, 'size' | 'onChange' | 'value'>, WithIconsType, TextClassNameType {
  value: string;
  onChange?: (value: string, event: InputEvent) => void;
  ref?: Ref<InputType>;
}

export interface InputAddonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: ReactNode;
}

const InputControl = (props: InputControlProps) => {
  void props;

  return null;
};
InputControl.displayName = 'Input.Control';

const InputLeftAddon = (props: InputAddonProps) => {
  void props;

  return null;
};
InputLeftAddon.displayName = 'Input.LeftAddon';

const InputRightAddon = (props: InputAddonProps) => {
  void props;

  return null;
};
InputRightAddon.displayName = 'Input.RightAddon';

const Input = (props: InputProps) => {
  const {
    size = 'm',
    disabled = false,
    error = false,
    children,
    className,
    wrapperClassName,
    id: inputIdFromWrapper,
    'aria-describedby': ariaDescribedByFromWrapper,
    'aria-invalid': ariaInvalidFromWrapper,
    'aria-label': ariaLabelFromWrapper,
    'aria-labelledby': ariaLabelledByFromWrapper,
    ...rest
  } = props;

  const { controlProps, leftAddonProps, rightAddonProps } = useMemo<{
    controlProps: InputControlProps | null;
    leftAddonProps: InputAddonProps | null;
    rightAddonProps: InputAddonProps | null;
  }>(() => {
    let nextControlProps: InputControlProps | null = null;
    let nextLeftAddonProps: InputAddonProps | null = null;
    let nextRightAddonProps: InputAddonProps | null = null;

    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;

      if (child.type === InputControl) {
        nextControlProps = (child as ReactElement<InputControlProps>).props;

        return;
      }

      if (child.type === InputLeftAddon) {
        nextLeftAddonProps = (child as ReactElement<InputAddonProps>).props;

        return;
      }

      if (child.type === InputRightAddon) {
        nextRightAddonProps = (child as ReactElement<InputAddonProps>).props;
      }
    });

    return {
      controlProps: nextControlProps,
      leftAddonProps: nextLeftAddonProps,
      rightAddonProps: nextRightAddonProps,
    };
  }, [children]);

  if (!controlProps) return null;

  const {
    value,
    onChange = () => {},
    type = 'text',
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    textClassName,
    disabled: controlDisabled,
    ref: controlRef,
    ...controlRest
  } = controlProps;

  const resolvedDisabled = disabled || controlDisabled === true;
  const resolvedType = typeof type === 'string' ? type : 'text';
  const hasLeftAddon = Boolean(leftAddonProps?.children);
  const hasRightAddon = Boolean(rightAddonProps?.children);
  const mergedAriaDescribedBy = [controlRest['aria-describedby'], ariaDescribedByFromWrapper].filter(Boolean).join(' ') || undefined;
  const resolvedAriaInvalid = controlRest['aria-invalid'] ?? ariaInvalidFromWrapper;
  const resolvedAriaLabel = controlRest['aria-label'] ?? ariaLabelFromWrapper;
  const resolvedAriaLabelledBy = controlRest['aria-labelledby'] ?? ariaLabelledByFromWrapper;

  const renderAddon = (addonProps: InputAddonProps | null, side: 'left' | 'right') => {
    if (!addonProps?.children) return null;

    const { children: addonChildren, className: addonClassName, ...addonRest } = addonProps;

    if (isValidElement(addonChildren) && addonChildren.type === Button) {
      const buttonElement = addonChildren as ReactElement<ButtonProps>;

      return cloneElement(buttonElement, {
        ...buttonElement.props,
        size: buttonElement.props.size ?? size,
        disabled: resolvedDisabled || buttonElement.props.disabled,
        className: clsx(
          'pbc:relative pbc:z-0 pbc:hover:z-20 pbc:focus:z-20 pbc:w-auto!',
          side === 'left' && 'pbc:-mr-1! pbc:rounded-r-0!',
          side === 'right' && 'pbc:-ml-1! pbc:rounded-l-0!',
          buttonElement.props.className,
        ),
      });
    }

    return (
      <div
        {...addonRest}
        className={clsx(
          'pbc:relative pbc:z-0 pbc:flex pbc:items-stretch',
          side === 'left' && 'pbc:order-first',
          side === 'right' && 'pbc:order-last',
          addonClassName,
        )}
      >
        {addonChildren}
      </div>
    );
  };

  return (
    <div
      {...rest}
      className={clsx(
        'pbc pbc:relative pbc:flex pbc:flex-nowrap pbc:items-center pbc:justify-center pbc:w-full',
        className,
        wrapperClassName,
      )}
    >
      {renderAddon(leftAddonProps, 'left')}
      <div className={clsx('pbc pbc:relative pbc:w-full pbc:z-10 pbc:hover:z-30')}>
        {leftIcon && (
          <Icon
            tag={leftIcon}
            size={size}
            className={clsx(
              'pbc:text-text-secondary pbc:pointer-events-none pbc:select-none',
              'pbc:absolute pbc:inset-y-0 pbc:m-auto',
              size === 's' && 'pbc:left-8',
              size === 'm' && 'pbc:left-12',
              leftIconClassName,
            )}
          />
        )}
        <input
          {...controlRest}
          ref={controlRef}
          id={controlRest.id ?? inputIdFromWrapper}
          value={value}
          type={resolvedType}
          disabled={resolvedDisabled}
          aria-describedby={mergedAriaDescribedBy}
          aria-invalid={resolvedAriaInvalid}
          aria-label={resolvedAriaLabel}
          aria-labelledby={resolvedAriaLabelledBy}
          className={clsx(
            'pbc pbc:w-full pbc:border-solid pbc:border pbc:bg-transparent pbc:appearance-none pbc:transition-colors pbc:duration-150 pbc:focus:ring-0 pbc:focus:ring-offset-0 pbc:text-text-primary pbc:placeholder:text-text-secondary',
            !error &&
              'pbc:border-secondary-200 pbc:hover:border-primary-400 pbc:focus:border-primary-400 pbc:focus:outline-outline-primary pbc:outline-4 pbc:outline-offset-0',
            error &&
              'pbc:border-danger-400 pbc:hover:border-danger-400 pbc:focus:border-danger-400 pbc:focus:outline-outline-danger pbc:outline-4 pbc:outline-offset-0',
            'pbc:disabled:cursor-default! pbc:disabled:bg-secondary-50! pbc:disabled:border-secondary-200! pbc:hover:disabled:border-secondary-200! pbc:hover:disabled:bg-secondary-50!',
            size === 's' && 'pbc:py-8 pbc:px-12 pbc:h-34 pbc:text-t12! pbc:rounded-8',
            size === 's' && leftIcon && 'pbc:pl-32',
            size === 's' && rightIcon && 'pbc:pr-32',
            size === 's' && hasLeftAddon && 'pbc:rounded-l-0!',
            size === 's' && hasRightAddon && 'pbc:rounded-r-0!',
            size === 'm' && 'pbc:py-12 pbc:px-16 pbc:h-48 pbc:text-t16! pbc:rounded-12',
            size === 'm' && leftIcon && 'pbc:pl-42',
            size === 'm' && rightIcon && 'pbc:pr-42',
            size === 'm' && hasLeftAddon && 'pbc:rounded-l-0!',
            size === 'm' && hasRightAddon && 'pbc:rounded-r-0!',
            resolvedType === 'search' && 'pbc-search',
            resolvedType === 'search' && size === 's' && 'pbc-search-s',
            resolvedType === 'search' && size === 'm' && 'pbc-search-m',
            textClassName,
          )}
          onChange={(event: InputEvent) => onChange(event.target.value, event)}
        />
        {rightIcon && (
          <Icon
            tag={rightIcon}
            size={size}
            className={clsx(
              'pbc:text-text-secondary pbc:pointer-events-none pbc:select-none',
              'pbc:absolute pbc:inset-y-0 pbc:m-auto',
              size === 's' && 'pbc:right-8',
              size === 'm' && 'pbc:right-12',
              rightIconClassName,
            )}
          />
        )}
      </div>
      {renderAddon(rightAddonProps, 'right')}
    </div>
  );
};

Input.displayName = 'Input';

const InputCompound: typeof Input & {
  Control: typeof InputControl;
  LeftAddon: typeof InputLeftAddon;
  RightAddon: typeof InputRightAddon;
} = Object.assign(Input, {
  Control: InputControl,
  LeftAddon: InputLeftAddon,
  RightAddon: InputRightAddon,
});

export default InputCompound;
