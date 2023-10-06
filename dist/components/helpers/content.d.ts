import HeroIconType from '../../types/icon';
export interface ContentProps {
    children?: string;
    size: 's' | 'm' | 'l';
    medium?: boolean;
    leftIcon?: HeroIconType;
    rightIcon?: HeroIconType;
    className?: string;
}
declare const Content: ({ children, size, medium, leftIcon: LeftIcon, rightIcon: RightIcon, className }: ContentProps) => import("react/jsx-runtime").JSX.Element;
export default Content;
