import HeroIconType from '../../types/icon';
export interface TagProps {
    isActive: boolean;
    children: string;
    size: 'xs' | 's';
    theme: 'light' | 'border';
    leftIcon?: HeroIconType;
    rightIcon?: HeroIconType;
    className?: string;
}
declare const Tag: ({ isActive, children, size, theme, leftIcon, rightIcon, className }: TagProps) => import("react/jsx-runtime").JSX.Element;
export default Tag;
