'use client';

import Collapse, { CollapseProps } from '@/components/shared/collapse';
import clsx from 'clsx';
import { HTMLAttributes, ReactElement, useMemo } from 'react';

export interface CollapseGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: ReactElement<CollapseProps>[];
  name?: string;
  joined?: boolean;
}

const CollapseGroup = (props: CollapseGroupProps) => {
  const { name, joined = false, children: childn, className, ...rest } = props;

  const children = useMemo(() => (childn ? [...childn] : []), [childn]);

  if (!children.length) return null;

  return (
    <div
      {...rest}
      className={clsx('pbc pbc:w-full pbc:flex pbc:flex-col pbc:items-start', joined ? 'pbc:gap-y-0' : 'pbc:gap-y-8', className)}
    >
      {children.map(({ props: itemProps }, index) => (
        <Collapse
          {...itemProps}
          key={index}
          name={name}
          className={clsx(
            // в сомкнутом режиме пункты сливаются в один блок: убираем скругления на стыках
            // и верхнюю рамку у всех, кроме первого, чтобы не было двойной линии
            joined && index > 0 && 'pbc:rounded-t-none pbc:border-t-0',
            joined && index < children.length - 1 && 'pbc:rounded-b-none',
            itemProps.className,
          )}
        />
      ))}
    </div>
  );
};

CollapseGroup.displayName = 'CollapseGroup';
export default CollapseGroup;
