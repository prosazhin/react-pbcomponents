import { useState } from 'react';

import { DefaultPropsType } from '@/types';
import clsx from 'clsx';

import Tab from '@/components/helpers/tab';

export type Props = DefaultPropsType<{
  initialActiveTab: number;
  tabs: Array<string>;
  onChange: (activeTab: number) => void;
}>;

const Tabs = ({ initialActiveTab = 0, tabs, onChange }: Props) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  function handleTabChange(tabIndex: number): () => void {
    return () => {
      setActiveTab(tabIndex);
      onChange?.(tabIndex);
    };
  }

  return (
    <div className='border-b-[2px] border-secondary-lighter flex flex-row'>
      {tabs.map((v, i) => (
        <div key={v} onClick={handleTabChange(i)}>
          <Tab
            as='div'
            isActive={activeTab === i}
            className={clsx('tab text-base-main px-[8px] mr-[16px] mb-[-2px] text-tm3', {
              'outline-none text-primary-main text-tm3': i === activeTab,
            })}
          >
            {v}
          </Tab>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
