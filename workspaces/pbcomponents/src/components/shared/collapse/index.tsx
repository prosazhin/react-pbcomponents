'use client';

import Content from '@/components/helpers/content';
import { PlusIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react';
import { DetailsHTMLAttributes, ReactNode, Ref, useEffect, useState } from 'react';

export interface CollapseProps extends Omit<DetailsHTMLAttributes<HTMLDetailsElement>, 'open'> {
  summary: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  contentClassName?: string;
  ref?: Ref<HTMLDetailsElement>;
}

const Collapse = (props: CollapseProps) => {
  const {
    open: externalOpen,
    defaultOpen = false,
    summary,
    children,
    className,
    contentClassName,
    ref: externalRef,
    onToggle,
    ...rest
  } = props;
  const [open, setOpen] = useState<boolean>(externalOpen ?? defaultOpen);
  const [visible, setVisible] = useState<boolean>(open);

  // details прячет содержимое сразу же, как только закрывается, и обрывает анимацию
  // ухода — поэтому держим элемент открытым, пока она не доиграет
  if (open && !visible) setVisible(true);

  useEffect(() => {
    if (externalOpen === undefined) return;
    setOpen(externalOpen);
  }, [externalOpen]);

  return (
    <details
      {...rest}
      ref={externalRef}
      open={open || visible}
      className={clsx(
        'pbc pbc:flex pbc:flex-col pbc:w-full pbc:px-20 pbc:cursor-pointer pbc:group pbc:transition-colors pbc:duration-150',
        'pbc:rounded-8 pbc:border pbc:border-solid pbc:border-secondary-200 pbc:hover:bg-secondary-100',
        className,
      )}
      onToggle={(event) => {
        // подстраховка на случай, когда элемент переключил сам браузер, в обход клика
        // по summary — например соседний collapse из группы с тем же name
        if (event.currentTarget.open) {
          setOpen(true);
        } else {
          setOpen(false);
          setVisible(false);
        }
        onToggle?.(event);
      }}
    >
      <summary
        className='pbc:list-none pbc:w-full pbc:py-12 pbc-summary'
        onClick={(event) => {
          event.preventDefault();
          setOpen((prev) => !prev);
        }}
      >
        <Content
          size='l'
          medium={true}
          rightIcon={PlusIcon}
          rightIconClassName={clsx(
            'pbc:transition-transform pbc:transition-colors pbc:duration-150 pbc:text-text-secondary pbc:group-hover:text-text-primary',
            open && 'pbc:rotate-45',
          )}
          className='pbc:transition-colors pbc:duration-150 pbc:w-full pbc:text-text-primary'
        >
          {typeof summary === 'string' ? (
            summary
          ) : (
            // произвольный контент в заголовке (например текст + Badge) выравниваем в строку
            <span className='pbc:flex pbc:flex-1 pbc:items-center pbc:gap-x-8'>{summary}</span>
          )}
        </Content>
      </summary>
      <LazyMotion features={domAnimation}>
        <AnimatePresence initial={false} onExitComplete={() => setVisible(false)}>
          {open && (
            <m.div
              className='pbc:overflow-hidden'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto', transition: { duration: 0.2, ease: 'easeOut' } }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
            >
              <div className={clsx('pbc:w-full pbc:pb-16 pbc:text-text-primary', contentClassName)}>{children}</div>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </details>
  );
};

Collapse.displayName = 'Collapse';
export default Collapse;
