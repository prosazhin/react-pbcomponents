'use client';

import Button, { ButtonProps } from '@/components/shared/button';
import DropdownItem, { DropdownItemProps } from '@/components/shared/dropdown-item';
import useClickOutside from '@/hooks/use-click-outside';
import useControllableState from '@/hooks/use-controllable-state';
import useKeydown from '@/hooks/use-keydown';
import { WrapperClassNameType } from '@/types';
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react';
import { Children, HTMLAttributes, ReactElement, ReactNode, isValidElement, useMemo, useRef } from 'react';

const collectItems = (node: ReactNode, items: DropdownItemProps[]) => {
  Children.forEach(node, (child) => {
    if (!isValidElement(child)) return;
    const element = child as ReactElement<{ children?: ReactNode }>;

    if (element.type === DropdownItem) {
      items.push((element as ReactElement<DropdownItemProps>).props);

      return;
    }

    if (element.type === DropdownContent) {
      collectItems((element as ReactElement<DropdownContentProps>).props.children, items);

      return;
    }

    if (element.props?.children) {
      collectItems(element.props.children, items);
    }
  });
};

type BaseDropdownProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> & WrapperClassNameType;
export interface DropdownProps extends BaseDropdownProps {
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (value: boolean) => void;
}

export interface DropdownTriggerProps extends Omit<ButtonProps, 'type'> {}

export interface DropdownContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: ReactNode;
  align?: 'left' | 'right';
}

export interface DropdownItemSlotProps extends DropdownItemProps {}

const DropdownTrigger = (props: DropdownTriggerProps) => {
  void props;

  return null;
};
DropdownTrigger.displayName = 'Dropdown.Trigger';

const DropdownContent = (props: DropdownContentProps) => {
  void props;

  return null;
};
DropdownContent.displayName = 'Dropdown.Content';

const Dropdown = (props: DropdownProps) => {
  const { open: externalOpen, defaultOpen = false, onOpenChange, children, className, wrapperClassName, ...rest } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLElement | null>(null);

  const [open = false, setOpen] = useControllableState<boolean>({
    value: externalOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const { triggerProps, contentProps, items } = useMemo<{
    triggerProps: DropdownTriggerProps | null;
    contentProps: DropdownContentProps | null;
    items: DropdownItemProps[];
  }>(() => {
    const childArray = Children.toArray(children);

    let nextTriggerProps: DropdownTriggerProps | null = null;
    let nextContentProps: DropdownContentProps | null = null;

    childArray.forEach((child) => {
      if (!isValidElement(child)) return;

      if (child.type === DropdownTrigger) {
        nextTriggerProps = (child as ReactElement<DropdownTriggerProps>).props;

        return;
      }

      if (child.type === DropdownContent) {
        nextContentProps = (child as ReactElement<DropdownContentProps>).props;
      }
    });

    const nextItems: DropdownItemProps[] = [];
    collectItems(children, nextItems);

    return {
      triggerProps: nextTriggerProps,
      contentProps: nextContentProps,
      items: nextItems,
    };
  }, [children]);

  useClickOutside({ refs: [dropdownRef, buttonRef], callback: () => setOpen(false) });
  useKeydown({ keys: ['Escape'], callback: () => setOpen(false) });

  return (
    <div {...rest} className={clsx('pbc pbc:relative pbc:w-max pbc:max-xs:w-full', className, wrapperClassName)}>
      {triggerProps && (
        <Button
          {...triggerProps}
          ref={(value) => {
            buttonRef.current = value as HTMLElement | null;
          }}
          type='button'
          rightIcon={triggerProps.rightIcon ?? ChevronUpDownIcon}
          onClick={(event) => {
            triggerProps.onClick?.(event);
            setOpen(!open);
          }}
        />
      )}
      <LazyMotion features={domAnimation}>
        <AnimatePresence initial={false}>
          {open && (
            <m.div
              ref={dropdownRef}
              className={clsx(
                'pbc:absolute pbc:mx-auto pbc:z-10 pbc:box-border pbc:w-280 pbc:max-xs:w-full pbc:max-h-300 pbc:bottom-0 pbc:translate-y-[calc(100%+6px)]',
                'pbc:bg-basic-0 pbc:rounded-16 pbc:border pbc:border-solid pbc:border-secondary-100 pbc:p-8 pbc-scrollbar-hidden pbc:overflow-y-auto',
                (contentProps?.align ?? 'left') === 'left' && 'pbc:left-0',
                (contentProps?.align ?? 'left') === 'right' && 'pbc:right-0',
                contentProps?.className,
              )}
              initial={{ opacity: 0, bottom: 6 }}
              animate={{ opacity: 1, bottom: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
              exit={{ opacity: 0, bottom: 6, transition: { duration: 0.2, ease: 'easeOut' } }}
            >
              <ul className='pbc:flex pbc:flex-col pbc:list-none pbc:m-0 pbc:p-0'>
                {items.map((itemProps, index) => (
                  <li key={index} className='pbc:w-full'>
                    <DropdownItem
                      {...itemProps}
                      onClick={(event) => {
                        itemProps.onClick?.(event);
                        setOpen(false);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
};

Dropdown.displayName = 'Dropdown';

const DropdownCompound: typeof Dropdown & {
  Trigger: typeof DropdownTrigger;
  Content: typeof DropdownContent;
  Item: typeof DropdownItem;
} = Object.assign(Dropdown, {
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
});

export default DropdownCompound;
