import { DefaultPropsType, IconType } from '../../types';
export type Props = DefaultPropsType<{
    size: 'xs' | 's';
    theme: 'filled' | 'light' | 'border';
    color: 'primary' | 'secondary' | 'success' | 'danger';
    leftIcon?: IconType;
    rightIcon?: IconType;
}>;
declare const Badge: ({ children, size, theme, color, leftIcon, rightIcon, className }: Props) => import("react/jsx-runtime").JSX.Element;
export default Badge;