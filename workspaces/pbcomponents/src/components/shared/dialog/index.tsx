'use client';

import Button, { ButtonProps } from '@/components/shared/button';
import useControllableState from '@/hooks/use-controllable-state';
import useMergeRefs from '@/hooks/use-merge-refs';
import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { LazyMotion, domAnimation, m } from 'motion/react';
import {
  Children,
  DialogHTMLAttributes,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

type BaseDialogProps = Omit<DialogHTMLAttributes<HTMLDialogElement>, 'onClose' | 'id' | 'children'>;
export interface DialogProps extends BaseDialogProps {
  id: string;
  open?: boolean;
  defaultOpen?: boolean;
  backdrop?: boolean;
  animationDuration?: number;
  children?: ReactNode;
  onOpenChange?: (value: boolean, id?: string) => void;
  onClose?: (value: boolean, id?: string) => void;
  ref?: Ref<HTMLDialogElement>;
}

export interface DialogTriggerProps extends Omit<ButtonProps, 'type'> {}

export interface DialogContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: ReactNode;
}

export interface DialogSectionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: ReactNode;
}

export interface DialogCloseProps extends Omit<ButtonProps, 'type'> {}

const DialogTrigger = (props: DialogTriggerProps) => {
  void props;

  return null;
};
DialogTrigger.displayName = 'Dialog.Trigger';

const DialogContent = (props: DialogContentProps) => {
  void props;

  return null;
};
DialogContent.displayName = 'Dialog.Content';

const DialogHeader = (props: DialogSectionProps) => {
  void props;

  return null;
};
DialogHeader.displayName = 'Dialog.Header';

const DialogBody = (props: DialogSectionProps) => {
  void props;

  return null;
};
DialogBody.displayName = 'Dialog.Body';

const DialogFooter = (props: DialogSectionProps) => {
  void props;

  return null;
};
DialogFooter.displayName = 'Dialog.Footer';

const DialogClose = (props: DialogCloseProps) => {
  void props;

  return null;
};
DialogClose.displayName = 'Dialog.Close';

const Dialog = (props: DialogProps) => {
  const {
    id,
    open: controlledOpen,
    defaultOpen,
    onOpenChange,
    onClose = () => {},
    backdrop = true,
    children,
    className,
    animationDuration = 200,
    ref: externalRef,
    ...rest
  } = props;
  const internalRef = useRef<HTMLDialogElement>(null);
  const ref = useMergeRefs(internalRef, externalRef);
  const isControlled = controlledOpen !== undefined;
  const wasOpenRef = useRef<boolean>(controlledOpen ?? defaultOpen ?? false);
  const onCloseRef = useRef(onClose);

  const [stateOpen, setStateOpen] = useControllableState<boolean>({
    value: controlledOpen,
    defaultValue: defaultOpen ?? false,
    onChange: (value) => onOpenChange?.(value, id),
  });
  const open = (isControlled ? controlledOpen : stateOpen) ?? false;

  const requestOpen = useCallback(() => {
    setStateOpen(true);
  }, [setStateOpen]);

  const requestClose = useCallback(() => {
    setStateOpen(false);
  }, [setStateOpen]);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const node = internalRef.current;
    if (!node) return;

    const handleNativeClose = () => {
      if (!open) return;
      requestClose();
    };

    node.addEventListener('close', handleNativeClose);

    return () => {
      node.removeEventListener('close', handleNativeClose);
    };
  }, [open, requestClose]);

  useEffect(() => {
    const node = internalRef.current;
    if (!node) return;

    let closeTimer: ReturnType<typeof setTimeout> | null = null;
    const wasOpen = wasOpenRef.current;

    if (open) {
      if (!node.open) {
        try {
          node.showModal();
        } catch {
          node.show();
        }
      }
    } else if (wasOpen) {
      closeTimer = setTimeout(() => {
        if (node.open) {
          node.close();
        }
        onCloseRef.current(false, id);
      }, animationDuration);
    }

    wasOpenRef.current = open;

    return () => {
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, [animationDuration, id, open]);

  const { triggerProps, contentProps, headerProps, bodyProps, footerProps, closeProps } = useMemo<{
    triggerProps: DialogTriggerProps | null;
    contentProps: DialogContentProps | null;
    headerProps: DialogSectionProps | null;
    bodyProps: DialogSectionProps | null;
    footerProps: DialogSectionProps | null;
    closeProps: DialogCloseProps | null;
  }>(() => {
    let nextTriggerProps: DialogTriggerProps | null = null;
    let nextContentProps: DialogContentProps | null = null;

    const fallbackContentChildren: ReactNode[] = [];

    Children.forEach(children, (child) => {
      if (!isValidElement(child)) {
        if (child !== null && child !== undefined) fallbackContentChildren.push(child);

        return;
      }

      if (child.type === DialogTrigger) {
        nextTriggerProps = (child as ReactElement<DialogTriggerProps>).props;

        return;
      }

      if (child.type === DialogContent) {
        nextContentProps = (child as ReactElement<DialogContentProps>).props;

        return;
      }

      fallbackContentChildren.push(child);
    });

    if (!nextContentProps && fallbackContentChildren.length) {
      nextContentProps = { children: fallbackContentChildren };
    }

    let nextHeaderProps: DialogSectionProps | null = null;
    let nextBodyProps: DialogSectionProps | null = null;
    let nextFooterProps: DialogSectionProps | null = null;
    let nextCloseProps: DialogCloseProps | null = null;

    const fallbackBodyChildren: ReactNode[] = [];

    Children.forEach(nextContentProps?.children, (child) => {
      if (!isValidElement(child)) {
        if (child !== null && child !== undefined) fallbackBodyChildren.push(child);

        return;
      }

      if (child.type === DialogHeader) {
        nextHeaderProps = (child as ReactElement<DialogSectionProps>).props;

        return;
      }

      if (child.type === DialogBody) {
        nextBodyProps = (child as ReactElement<DialogSectionProps>).props;

        return;
      }

      if (child.type === DialogFooter) {
        nextFooterProps = (child as ReactElement<DialogSectionProps>).props;

        return;
      }

      if (child.type === DialogClose) {
        nextCloseProps = (child as ReactElement<DialogCloseProps>).props;

        return;
      }

      fallbackBodyChildren.push(child);
    });

    if (!nextBodyProps && fallbackBodyChildren.length) {
      nextBodyProps = { children: fallbackBodyChildren };
    }

    return {
      triggerProps: nextTriggerProps,
      contentProps: nextContentProps,
      headerProps: nextHeaderProps,
      bodyProps: nextBodyProps,
      footerProps: nextFooterProps,
      closeProps: nextCloseProps,
    };
  }, [children]);

  return (
    <>
      {triggerProps && (
        <Button
          {...triggerProps}
          type='button'
          onClick={(event) => {
            triggerProps.onClick?.(event);
            requestOpen();
          }}
        />
      )}
      <LazyMotion features={domAnimation}>
        <dialog
          {...rest}
          ref={ref}
          id={id}
          className='pbc pbc-dialog pbc:fixed pbc:size-full pbc:inset-0 pbc:m-0 pbc:p-0 pbc:border-0 pbc:bg-transparent pbc:max-w-none pbc:max-h-none pbc:overflow-hidden'
          onCancel={(event) => {
            rest.onCancel?.(event);
            event.preventDefault();
            requestClose();
          }}
        >
          <m.div
            className='pbc:fixed pbc:size-full pbc:inset-0 pbc:m-auto pbc:p-0 pbc:flex pbc:pointer-events-none pbc:desktop:items-center pbc:items-end pbc:justify-end pbc:desktop:justify-center'
            initial={false}
            animate={{ zIndex: open ? 500 : -1 }}
            transition={{ duration: animationDuration / 1000, ease: open ? 'easeIn' : 'easeOut' }}
          >
            <m.div
              className={clsx(
                'pbc:absolute pbc:size-full pbc:inset-0 pbc:z-1 pbc:pointer-events-auto',
                backdrop ? 'pbc:bg-basic-400/50' : 'pbc:bg-transparent',
              )}
              initial={false}
              animate={{ opacity: open ? 1 : 0 }}
              transition={{ duration: animationDuration / 1000, ease: open ? 'easeIn' : 'easeOut' }}
              onClick={requestClose}
            />
            <m.div
              className={clsx(
                'pbc pbc:pt-0 pbc:px-0 pbc:z-10 pbc:mx-auto pbc:desktop:m-auto pbc:box-border pbc:pointer-events-auto',
                'pbc:w-full pbc:desktop:w-736 pbc:max-w-full pbc:max-h-[calc(100dvh-40px)] pbc:desktop:max-h-[calc(100dvh-160px)]',
                'pbc-scrollbar-hidden pbc:overflow-x-hidden pbc:overflow-y-auto pbc:flex pbc:flex-col pbc:pb-40 pbc:desktop:pb-80',
                'pbc:bg-basic-0 pbc:text-text-primary pbc:rounded-t-16 pbc:desktop:rounded-16 pbc:shadow-xxxxl pbc:border pbc:border-solid pbc:border-secondary-200',
                className,
                contentProps?.className,
              )}
              role={contentProps?.role}
              style={contentProps?.style}
              initial={false}
              animate={{ opacity: open ? 1 : 0, y: open ? 0 : '100%' }}
              transition={{ duration: animationDuration / 1000, ease: open ? 'easeIn' : 'easeOut' }}
            >
              <div className='pbc:sticky pbc:top-0 pbc:px-8 pbc:pt-8 pbc:z-10 pbc:flex pbc:justify-end pbc:bg-basic-0'>
                <Button
                  {...closeProps}
                  size={closeProps?.size ?? 'm'}
                  theme={closeProps?.theme ?? 'ghost'}
                  color={closeProps?.color ?? 'secondary'}
                  leftIcon={closeProps?.leftIcon ?? XMarkIcon}
                  autoFocus={false}
                  className={clsx('pbc:w-auto!', closeProps?.className)}
                  onClick={(event) => {
                    closeProps?.onClick?.(event);
                    requestClose();
                  }}
                >
                  {closeProps?.children}
                </Button>
              </div>
              <div className='pbc:px-24 pbc:pt-8 pbc:desktop:px-80 pbc:desktop:pt-24'>
                {headerProps?.children && <div className={clsx('pbc:w-full pbc:mb-24', headerProps.className)}>{headerProps.children}</div>}
                {bodyProps?.children && <div className={clsx('pbc:w-full', bodyProps.className)}>{bodyProps.children}</div>}
                {footerProps?.children && <div className={clsx('pbc:w-full pbc:mt-24', footerProps.className)}>{footerProps.children}</div>}
              </div>
            </m.div>
          </m.div>
        </dialog>
      </LazyMotion>
    </>
  );
};

Dialog.displayName = 'Dialog';

const DialogCompound: typeof Dialog & {
  Trigger: typeof DialogTrigger;
  Content: typeof DialogContent;
  Header: typeof DialogHeader;
  Body: typeof DialogBody;
  Footer: typeof DialogFooter;
  Close: typeof DialogClose;
} = Object.assign(Dialog, {
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogClose,
});

export default DialogCompound;
