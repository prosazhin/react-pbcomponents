import { DefaultPropsType, IconType } from '../../types';
export type Props = DefaultPropsType<{
    name: IconType;
    size: 's' | 'm' | 'l';
}>;
declare const Icon: ({ name: IconTag, size, className }: Props) => import("react/jsx-runtime").JSX.Element;
export default Icon;
