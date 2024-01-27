export type WithChildrenType = {
  children?: React.ReactNode;
};

export type WithClassNameType = {
  className?: string;
};

export type ComponentType = WithChildrenType & WithClassNameType;

export type IconType = React.ComponentType<
  React.PropsWithoutRef<React.ComponentProps<'svg'>> & {
    title?: string | undefined;
    titleId?: string | undefined;
  }
>;

export type WithLeftIconType = {
  leftIcon?: IconType;
};

export type WithRightIconType = {
  rightIcon?: IconType;
};

export type WithIconsType = WithLeftIconType & WithRightIconType;

export type ButtonType = React.ComponentPropsWithoutRef<'button'>;

export type LinkType = React.ComponentPropsWithoutRef<'a'>;

export type ButtonOrLinkType = ComponentType & ButtonType & LinkType;

export type Displayable = JSX.Element | string | number | null | undefined;

export type ReactKey = React.Key | null | undefined;

export type KeysOfType<T, TProp> = keyof Pick<T, { [K in keyof T]: T[K] extends TProp ? K : never }[keyof T]>;

export type Extractor<T, TExtracted> = KeysOfType<T, TExtracted> | ((value: T) => TExtracted) | undefined;

export type KeyExtractor<T> = Extractor<T, ReactKey>;

export type DisplayExtractor<T> = Extractor<T, Displayable>;

export const extract = <T, TExtracted>(value: T, extractor: Extractor<T, TExtracted>) =>
  (typeof extractor === 'function'
    ? extractor(value)
    : typeof extractor !== 'undefined'
      ? value[extractor]
      : value) as TExtracted;
