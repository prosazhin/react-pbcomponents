import { useState } from 'react';

import clsx from 'clsx';

type Props = {
  initialActiveTab: number;
  tabs: Array<string>;
  onChange: (activeTab: number) => void;
};
export const Tabs = ({ initialActiveTab = 0, tabs, onChange }: Props) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  function handleTabChange(tabIndex: number): () => void {
    return () => {
      setActiveTab(tabIndex);
      onChange?.(tabIndex);
    };
  }

  return (
    <div className='border-b-[2px] border-secondary-lighter'>
      {tabs.map((v, i) => (
        <button
          key={v}
          className={clsx('tab text-base-main px-[8px] mr-[16px] mb-[-2px] text-tm3', {
            'outline-none text-primary-main text-tm3': i === activeTab,
          })}
          onClick={handleTabChange(i)}
        >
          {v} {i === activeTab && <div className='bg-primary-main py-[1px] rounded-sm mt-[12px]' />}
        </button>
      ))}
    </div>
  );
};
