/**
 * Icons Types
 */

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

/**
 * Components Types
 */

export type ComponentType = {
  children?: React.ReactNode;
  className?: string;
};

export type ComponentWithIconsType = ComponentType & WithIconsType;

/**
 * Polymorphic Component Types
 */

export type AsProp<C extends React.ElementType> = {
  as?: C;
};

export type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProps<C extends React.ElementType, Props = {}> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentPropsWithRef<C extends React.ElementType, Props = {}> = PolymorphicComponentProps<C, Props> & {
  ref?: PolymorphicRef<C>;
};

/**
 * Extract Types
 */

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
