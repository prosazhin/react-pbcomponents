export type IconType = React.ComponentType<
  React.PropsWithoutRef<React.ComponentProps<'svg'>> & {
    title?: string | undefined;
    titleId?: string | undefined;
  }
>;

export type DefaultPropsType<T = {}> = T & { children?: React.ReactNode; className?: string };
