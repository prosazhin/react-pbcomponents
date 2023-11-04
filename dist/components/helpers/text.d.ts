import { DefaultPropsType } from '../../types';
export type Props = DefaultPropsType<{
    size: 's' | 'm' | 'l';
    medium?: boolean;
}>;
declare const Text: ({ children, size, medium, className }: Props) => import("react/jsx-runtime").JSX.Element;
export default Text;
