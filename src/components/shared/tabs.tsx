import { useState } from 'react';

import { ComponentType, DisplayExtractor, extract } from '@/types';
import clsx from 'clsx';

import Tab from '@/components/helpers/tab';

export type Props<T> = ComponentType & {
  defaultIndex: number;
  options: T[];
  display: DisplayExtractor<T>;
  onChange: (index: number, tab: T) => void;
};

const Tabs = <T,>({ className, defaultIndex = 0, options, display, onChange }: Props<T>) => {
  const [activeTab, setActiveTab] = useState(defaultIndex);

  const handleTabChange = (index: number, tab: T) => {
    setActiveTab(index);
    onChange(index, tab);
  };

  return (
    <div
      className={clsx(
        'relative w-full after:w-full after:absolute after:h-[2px] after:bottom-0 after:inset-x-0 after:rounded-full after:z-[1] after:bg-secondary-lighter',
        className,
      )}
    >
      <div className='flex flex-row space-x-[16px] z-[2] relative flex-nowrap items-center w-auto overflow-x-auto scrollbar-hidden'>
        {options.map((item, index) => (
          <Tab key={index} {...item} active={activeTab === index} onClick={() => handleTabChange(index, item)}>
            {extract(item, display)}
          </Tab>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
