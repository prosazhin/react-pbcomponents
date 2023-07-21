import React from 'react';

export interface ButtonProps {
  label: string;
}

const Button = ({ label }: ButtonProps) => {
  return <button className='rounded-full bg-primary-main px-4 py-1 text-white'>{label}</button>;
};

export default Button;
