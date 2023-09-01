import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';
import Text from './text';
//
// const TextVariants = {
//   S : 'text-sm',
//   M : 'text-base',
//   L : 'text-xl'
// }

type Props = {
  tagName: string;
  size: 'S' | 'M' | 'L';
  color: 'text-black' | 'text-white' | 'text-gray-50';
  isRightIcon?: boolean;
  isLeftIcon?: boolean;
  label?: string;
};

const Labelvariantsicon = {
  S: 'h-4 w-4',
  M: 'h-6 w-6',
  L: 'h-7 w-7',
};

// const IconButton = ( {size} )=> {
//   return (
//     <ArrowLongLeftIcon className= {`text-black ${Labelvariantsicon[size]}`}/>
//   )
// }

const Content = ({ size, color, label, isRightIcon, isLeftIcon, tagName }: Props) => {
  return (
    <div className='flex flex-row items-center gap-2'>
      {isLeftIcon && <ArrowLongLeftIcon className={`text-black ${Labelvariantsicon[size]}`} />}
      {label && <Text size={size} color={color} label={label} tagName={tagName} />}
      {isRightIcon && label && <ArrowLongRightIcon className={`text-black ${Labelvariantsicon[size]}`} />}
    </div>
  );
};

export default Content;
