'use client';

import Text from '@/components/helpers/text';
import Button from '@/components/shared/button';
import Headline, { HeadlineProps } from '@/components/shared/headline';
import useControllableState from '@/hooks/use-controllable-state';
import { ColorType } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react';
import { Children, HTMLAttributes, ReactElement, ReactNode, isValidElement, useMemo } from 'react';

type BaseAlertProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> & ColorType;
export interface AlertProps extends BaseAlertProps {
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (value: boolean) => void;
  closeButtonAriaLabel?: string;
}

export interface AlertTitleProps extends Omit<HeadlineProps, 'children'> {
  children?: ReactNode;
}

export interface AlertDescriptionProps extends Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> {
  children?: ReactNode;
}

export interface AlertActionsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: ReactNode;
}

const AlertTitle = (props: AlertTitleProps) => {
  void props;

  return null;
};
AlertTitle.displayName = 'Alert.Title';

const AlertDescription = (props: AlertDescriptionProps) => {
  void props;

  return null;
};
AlertDescription.displayName = 'Alert.Description';

const AlertActions = (props: AlertActionsProps) => {
  void props;

  return null;
};
AlertActions.displayName = 'Alert.Actions';

const Alert = (props: AlertProps) => {
  const {
    children,
    className,
    color = 'primary',
    open: externalOpen,
    defaultOpen = true,
    onOpenChange,
    closeButtonAriaLabel = 'Close alert',
    ...rest
  } = props;

  const [open = true, setOpen] = useControllableState<boolean>({
    value: externalOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const { titleProps, descriptionProps, actionsProps } = useMemo<{
    titleProps: AlertTitleProps | null;
    descriptionProps: AlertDescriptionProps | null;
    actionsProps: AlertActionsProps | null;
  }>(() => {
    let nextTitleProps: AlertTitleProps | null = null;
    let nextDescriptionProps: AlertDescriptionProps | null = null;
    let nextActionsProps: AlertActionsProps | null = null;

    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;

      if (child.type === AlertTitle) {
        nextTitleProps = (child as ReactElement<AlertTitleProps>).props;

        return;
      }

      if (child.type === AlertDescription) {
        nextDescriptionProps = (child as ReactElement<AlertDescriptionProps>).props;

        return;
      }

      if (child.type === AlertActions) {
        nextActionsProps = (child as ReactElement<AlertActionsProps>).props;
      }
    });

    return {
      titleProps: nextTitleProps,
      descriptionProps: nextDescriptionProps,
      actionsProps: nextActionsProps,
    };
  }, [children]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            className='pbc:overflow-hidden'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto', transition: { duration: 0.2, ease: 'easeIn' } }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.2, ease: 'easeOut' } }}
          >
            <div
              {...rest}
              className={clsx(
                'pbc pbc:w-full pbc:relative pbc:flex pbc:flex-col pbc:gap-y-16 pbc:px-24 pbc:py-16 pbc:border pbc:border-solid pbc:rounded-8 pbc:h-auto pbc:text-text-primary',
                color === 'primary' && 'pbc:border-primary-200 pbc:bg-primary-50',
                color === 'secondary' && 'pbc:border-secondary-200 pbc:bg-secondary-50',
                color === 'success' && 'pbc:border-success-200 pbc:bg-success-50',
                color === 'danger' && 'pbc:border-danger-200 pbc:bg-danger-50',
                className,
              )}
            >
              {onOpenChange && (
                <Button
                  className='pbc:absolute pbc:top-4 pbc:right-4 pbc:w-auto!'
                  size='xs'
                  theme='ghost'
                  color={color}
                  leftIcon={XMarkIcon}
                  aria-label={closeButtonAriaLabel}
                  onClick={() => setOpen(false)}
                />
              )}
              {(titleProps?.children || descriptionProps?.children) && (
                <div className='pbc pbc:w-full pbc:flex pbc:flex-col pbc:gap-y-4'>
                  {titleProps?.children && (
                    <Headline as={titleProps.as ?? 'h3'} className={clsx('pbc:w-full pbc:text-h20!', titleProps.className)}>
                      {titleProps.children}
                    </Headline>
                  )}
                  {descriptionProps?.children && (
                    <Text as='p' size='m' className={clsx('pbc:w-full', descriptionProps.className)}>
                      {descriptionProps.children}
                    </Text>
                  )}
                </div>
              )}
              {actionsProps?.children && (
                <div {...actionsProps} className={clsx('pbc pbc:w-full pbc:flex pbc:gap-x-6', actionsProps.className)}>
                  {actionsProps.children}
                </div>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

Alert.displayName = 'Alert';

const AlertCompound: typeof Alert & {
  Title: typeof AlertTitle;
  Description: typeof AlertDescription;
  Actions: typeof AlertActions;
} = Object.assign(Alert, {
  Title: AlertTitle,
  Description: AlertDescription,
  Actions: AlertActions,
});

export default AlertCompound;
