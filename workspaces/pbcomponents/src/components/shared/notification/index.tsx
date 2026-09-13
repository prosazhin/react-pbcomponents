'use client';

import Icon from '@/components/helpers/icon';
import Text from '@/components/helpers/text';
import { SvgType } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react';
import { DialogHTMLAttributes, type ReactNode, type Ref, useEffect, useRef } from 'react';

import useControllableState from '@/hooks/use-controllable-state';
import useCountdown from '@/hooks/use-countdown';
import useHoverControllable from '@/hooks/use-hover-controllable';
import useMergeRefs from '@/hooks/use-merge-refs';

type BaseNotificationProps = Omit<DialogHTMLAttributes<HTMLDialogElement>, 'children' | 'onClose'>;
export interface NotificationProps extends BaseNotificationProps {
  icon?: SvgType | never;
  iconClassName?: string;
  headline: string;
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  isMouseInside?: boolean;
  top?: number;
  delay?: number;
  animationDuration?: number;
  disableCloseByClickInsideAnywhere?: boolean;
  disableTimer?: boolean;
  disableTimerPauseOnHover?: boolean;
  disableProgressBar?: boolean;
  closeButtonAriaLabel?: string;
  onOpenChange?: (value: boolean, id?: string) => void;
  onClose?: (value: boolean, id?: string) => void;
  onClick?: () => void;
  ref?: Ref<HTMLDialogElement>;
}

const Notification = (props: NotificationProps) => {
  const {
    id,
    className,
    icon,
    iconClassName,
    headline,
    children,
    top = 0,
    delay = 5000,
    animationDuration = 200,
    disableCloseByClickInsideAnywhere = false,
    disableTimer = false,
    disableTimerPauseOnHover = false,
    disableProgressBar = false,
    closeButtonAriaLabel = 'Close notification',
    onOpenChange,
    onClose = () => {},
    onClick,
    ref: externalRef,
  } = props;
  const internalRef = useRef<HTMLDialogElement>(null);
  const [isHovering, , hoverRef] = useHoverControllable({
    value: props.isMouseInside,
    defaultValue: false,
    enabled: !disableTimerPauseOnHover,
  });
  const ref = useMergeRefs(internalRef, externalRef, hoverRef);
  const wasOpenRef = useRef<boolean>(props.open ?? props.defaultOpen ?? false);
  const onCloseRef = useRef(onClose);

  const [open, setOpen] = useControllableState<boolean>({
    value: props.open,
    defaultValue: props.defaultOpen ?? false,
    onChange: (value) => onOpenChange?.(value, id),
  });
  const progress = useCountdown({
    delay,
    paused: !disableTimerPauseOnHover && isHovering,
    onComplete: () => setOpen(false),
    enabled: !disableTimer,
  });

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    let closeTimer: ReturnType<typeof setTimeout> | null = null;
    const wasOpen = wasOpenRef.current;

    if (open) {
      internalRef.current?.removeAttribute('open');
      internalRef.current?.show();
    } else if (wasOpen) {
      closeTimer = setTimeout(() => {
        internalRef.current?.close();
        onCloseRef.current(false, id);
      }, animationDuration);
    }

    wasOpenRef.current = open;

    return () => {
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, [animationDuration, id, open]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <m.dialog
            ref={ref}
            id={id}
            open={open}
            className={clsx(
              'pbc pbc-notification pbc:z-999 pbc:pointer-events-auto pbc:overflow-hidden',
              'pbc:border pbc:border-solid pbc:rounded-8 pbc:w-full pbc:max-w-[calc(100%-32px)] pbc:desktop:max-w-400 pbc:min-h-80 pbc:m-auto pbc:px-24 pbc:py-16',
              'pbc:border-secondary-100 pbc:bg-basic-0 pbc:flex pbc:flex-row pbc:gap-x-16 pbc:items-center',
              'pbc:shadow-sm pbc:hover:shadow-xxl pbc:transition-shadow pbc:duration-150',
              onClick ? 'pbc:cursor-pointer' : 'pbc:cursor-default',
              !disableCloseByClickInsideAnywhere ? 'pbc:cursor-pointer pbc:group' : 'pbc:cursor-default',
              className,
            )}
            onClick={(event) => {
              if (event.isPropagationStopped()) {
                return;
              }

              if (onClick) {
                onClick();

                return;
              }
              if (!disableCloseByClickInsideAnywhere) {
                setOpen(false);
              }
            }}
            initial={{ opacity: 0, scale: 0.95, top, x: 40 }}
            animate={{
              opacity: 1,
              scale: 1,
              top,
              x: 0,
              transition: { duration: animationDuration / 1000, ease: 'easeIn' },
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              top,
              x: 40,
              transition: { duration: animationDuration / 1000, ease: 'easeOut' },
            }}
          >
            {icon && (
              <Icon
                tag={icon}
                size='l'
                className={clsx('pbc:size-32 pbc:pointer-events-none pbc:select-none pbc:text-text-secondary', iconClassName)}
              />
            )}
            <div className='pbc:flex pbc:flex-col pbc:w-full pbc:gap-y-4'>
              <Text size='m' medium className='pbc:w-full pbc:text-text-primary'>
                {headline}
              </Text>
              {children && (
                <Text size='s' className='pbc:w-full pbc:text-text-secondary'>
                  {children}
                </Text>
              )}
            </div>
            <button
              aria-label={closeButtonAriaLabel}
              className='pbc:cursor-pointer pbc:group pbc:bg-transparent! pbc:h-48 pbc:p-0 pbc:m-0 pbc:outline-none! pbc:border-0'
              type='button'
              onClick={(event) => {
                event.stopPropagation();
                setOpen(false);
              }}
            >
              <Icon
                tag={XMarkIcon}
                size='l'
                className='pbc:text-text-primary pbc:pointer-events-none pbc:group-hover:text-primary-400 pbc:select-none pbc:transition-colors pbc:duration-150'
              />
            </button>
            {!disableTimer && !disableProgressBar && open && (
              <m.div
                className='pbc:absolute pbc:h-1 pbc:bottom-0 pbc:inset-x-0 pbc:m-auto pbc:w-full pbc:bg-primary-300'
                initial={{ opacity: 1, x: '-100%' }}
                animate={{
                  opacity: 1,
                  x: `${progress - 100}%`,
                }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ ease: 'linear', duration: 0.05 }}
              />
            )}
          </m.dialog>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

Notification.displayName = 'Notification';
export default Notification;
