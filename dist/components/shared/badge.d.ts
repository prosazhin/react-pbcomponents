import HeroIconType from '../../types/icon';
export interface BadgeProps {
    children: string;
    size: 'xs' | 's';
    theme: 'filled' | 'light' | 'border';
    color: 'primary' | 'secondary' | 'success' | 'danger';
    leftIcon?: HeroIconType;
    rightIcon?: HeroIconType;
    className?: string;
}
declare const Badge: ({ children, size, theme, color, leftIcon, rightIcon, className }: BadgeProps) => import("react/jsx-runtime").JSX.Element;
export default Badge;
