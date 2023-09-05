const fontSize = {
  s: 't3',
  m: 't4',
  l: 't2',
};

const fontWeight = {
  medium: 'medium',
  regular: 'normal',
};

export type Props = {
  tagName?: string;
  size: 's' | 'm' | 'l';
  weight: 'medium' | 'regular';
  label: string;
  className: string;
};

const Text = ({ size, label, weight }: Props) => {
  return <p className={`text-inherit text-${fontSize[size]} text-${fontWeight[weight]}`}>{label}</p>;
};

export default Text;
