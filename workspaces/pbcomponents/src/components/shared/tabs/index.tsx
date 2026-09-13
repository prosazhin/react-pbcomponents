'use client';

import Tab, { TabProps } from '@/components/shared/tab';
import { ButtonOrLinkType } from '@/types';
import clsx from 'clsx';
import { LazyMotion, domAnimation, m } from 'motion/react';
import { HTMLAttributes, MouseEvent, ReactElement, Ref, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
  children: ReactElement<TabProps>[];
  defaultIndex?: number;
  onChange?: (index: number, event: MouseEvent<HTMLElement>) => void;
  ref?: Ref<HTMLDivElement>;
}

const Tabs = (props: TabsProps) => {
  const { defaultIndex = 0, onChange = () => {}, children: childn, className, ref: externalRef, ...rest } = props;

  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);
  const [indicatorStyle, setIndicatorStyle] = useState<{ x: number; width: number } | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(ButtonOrLinkType | null)[]>([]);

  const children = useMemo(() => (childn ? [...childn] : []), [childn]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    const tabsElement = tabsRef.current;

    const updateIndicator = () => {
      const activeTab = tabRefs.current[activeIndex];

      if (!tabsElement || !activeTab) {
        setIndicatorStyle(null);

        return;
      }

      setIndicatorStyle({ x: activeTab.offsetLeft, width: activeTab.offsetWidth });
    };

    updateIndicator();

    if (typeof ResizeObserver !== 'undefined' && tabsElement) {
      const observer = new ResizeObserver(updateIndicator);

      observer.observe(tabsElement);
      tabRefs.current.forEach((tab) => tab && observer.observe(tab));

      return () => observer.disconnect();
    }

    window.addEventListener('resize', updateIndicator);

    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeIndex, children]);

  if (!children.length) return null;

  return (
    <div {...rest} ref={externalRef} className={clsx('pbc pbc:w-full', className)}>
      <div
        className={clsx(
          'pbc pbc:relative pbc:w-full pbc:after:absolute pbc:after:inset-x-0 pbc:after:bottom-0 pbc:after:z-1',
          'pbc:after:bg-secondary-200 pbc:after:h-2 pbc:after:w-full pbc:after:rounded-999',
        )}
      >
        <div
          ref={tabsRef}
          className={clsx(
            'pbc pbc-scrollbar-hidden pbc:relative pbc:z-2 pbc:flex pbc:w-auto pbc:flex-row',
            'pbc:flex-nowrap pbc:items-center pbc:gap-x-16 pbc:overflow-x-auto',
          )}
        >
          {indicatorStyle && (
            <LazyMotion features={domAnimation}>
              <m.div
                className='pbc:absolute pbc:bottom-0 pbc:left-0 pbc:z-3 pbc:h-2 pbc:rounded-999 pbc:bg-primary-300'
                initial={false}
                animate={{ x: indicatorStyle.x, width: indicatorStyle.width }}
                transition={mounted ? { duration: 0.2, ease: 'easeInOut' } : { duration: 0 }}
              />
            </LazyMotion>
          )}
          {children.map(({ props: itemProps }, index) => (
            <Tab
              {...itemProps}
              key={index}
              active={activeIndex === index}
              indicator={false}
              ref={(value) => {
                tabRefs.current[index] = value;
              }}
              onClick={(event) => {
                setActiveIndex(index);
                onChange(index, event);
              }}
            />
          ))}
        </div>
      </div>
      {children[activeIndex].props.children}
    </div>
  );
};

Tabs.displayName = 'Tabs';
export default Tabs;
