/// <reference types="react" />
import { DefaultPropsType, IconType } from '../../types';
export type Props = DefaultPropsType<{
    as?: React.ElementType;
    size: 'xs' | 's' | 'm' | 'l';
    theme: 'filled' | 'light' | 'border' | 'ghost';
    color: 'primary' | 'secondary' | 'success' | 'danger';
    leftIcon?: IconType;
    rightIcon?: IconType;
    isDisabled?: boolean;
    isLoading?: boolean;
}>;
declare const Button: ({ as: Component, children, size, theme, color, className, leftIcon, rightIcon, isDisabled, isLoading, ...rest }: Props) => import("react/jsx-runtime").JSX.Element;
export default Button;
