import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';
import Text from './text';
import { ReactNode } from 'react';

type Props = {
  tagName: string;
  size: 's' | 'm' | 'l';
  weight: 'medium' | 'regular';
  isRightIcon?: ReactNode;
  isLeftIcon?: ReactNode;
  label?: string;
};

const labelSizes = {
  s: 'h-4 w-4',
  m: 'h-6 w-6',
  l: 'h-7 w-7',
};

const Content = ({ size, weight, label, isRightIcon, isLeftIcon, tagName }: Props) => {
  return (
    <span className='flex flex-row items-center gap-2'>
      {isLeftIcon && <ArrowLongLeftIcon className={`text-black ${labelSizes[size]}`} />}
      {label && <Text size={size} weight={weight} label={label} tagName={tagName} className='' />}
      {isRightIcon && label && <ArrowLongRightIcon className={`text-black ${labelSizes[size]}`} />}
    </span>
  );
};

export default Content;
