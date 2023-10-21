/// <reference types="react" />
import { DefaultPropsType, HeroIconType } from '../../types';
export type Props = DefaultPropsType<{
    as?: React.ElementType;
    isActive: boolean;
    size: 'xs' | 's';
    theme: 'light' | 'border';
    leftIcon?: HeroIconType;
    rightIcon?: HeroIconType;
}>;
declare const Tag: ({ as: Component, isActive, children, size, theme, leftIcon, rightIcon, className, ...rest }: Props) => import("react/jsx-runtime").JSX.Element;
export default Tag;
