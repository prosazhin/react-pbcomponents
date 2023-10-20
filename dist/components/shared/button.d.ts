import HeroIconType from '../../types/icon';
export type ButtonProps = {
    children: string;
    size: 'xs' | 's' | 'm' | 'l';
    theme: 'filled' | 'light' | 'border' | 'ghost';
    color: 'primary' | 'secondary' | 'success' | 'danger';
    leftIcon?: HeroIconType;
    rightIcon?: HeroIconType;
    className?: string;
    isDisabled?: boolean;
};
declare const Button: ({ children, size, theme, color, className, leftIcon, rightIcon, isDisabled }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export default Button;
