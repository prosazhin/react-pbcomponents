// import { createElement} from 'react';

const TextVariants = {
  SR: 't4',
  SM: 'tm4',
  MR: 't3',
  MM: 'tm3',
  LR: 'h4',
  LM: 'tm2',
};

export type Props = {
  tagName?: string;
  size: 'SR' | 'SM' | 'MR' | 'MM' | 'LR' | 'LM';
  label: string;
  color: 'base-main' | 'blue-50' | 'secondary-main';
};

const Text = ({ size, color, label }: Props) => {
  return <p className={`${color} text-${TextVariants[size]}`}>{label}</p>;
  // return createElement(tagName, {
  //   ...{size, color, label}
  // })
};

export default Text;
