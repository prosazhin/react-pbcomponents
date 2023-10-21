/// <reference types="react" />
import { DefaultPropsType, HeroIconType } from '../../types';
export type Props = DefaultPropsType<{
    as?: React.ElementType;
    size: 'xs' | 's' | 'm' | 'l';
    theme: 'filled' | 'light' | 'border' | 'ghost';
    color: 'primary' | 'secondary' | 'success' | 'danger';
    leftIcon?: HeroIconType;
    rightIcon?: HeroIconType;
    isDisabled?: boolean;
}>;
declare const Button: ({ as: Component, children, size, theme, color, className, leftIcon, rightIcon, isDisabled, ...rest }: Props) => import("react/jsx-runtime").JSX.Element;
export default Button;
