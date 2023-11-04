import { DefaultPropsType, IconType } from '../../types';
export type Props = DefaultPropsType<{
    size: 's' | 'm' | 'l';
    medium?: boolean;
    leftIcon?: IconType;
    rightIcon?: IconType;
}>;
declare const Content: ({ children, size, medium, leftIcon: LeftIcon, rightIcon: RightIcon, className }: Props) => import("react/jsx-runtime").JSX.Element;
export default Content;
