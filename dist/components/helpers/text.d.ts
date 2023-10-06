export interface TextProps {
    children: string;
    size: 's' | 'm' | 'l';
    medium?: boolean;
    className?: string;
}
declare const Text: ({ children, size, medium, className }: TextProps) => import("react/jsx-runtime").JSX.Element;
export default Text;
