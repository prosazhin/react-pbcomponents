export interface ButtonProps {
  label: string;
}

const Button = ({ label }: ButtonProps) => {
  return <button className='rounded-full bg-primary-main px-8 py-2 text-white'>{label}</button>;
};

export default Button;
