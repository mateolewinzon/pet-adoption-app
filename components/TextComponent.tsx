import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props<T extends ElementType> = {
  children: ReactNode,
  defaultStyles: string,
  overrideStyles?: string,
  as?: T
}

export const TextComponent = <T extends ElementType = 'span'>({
  children,
  defaultStyles,
  overrideStyles,
  as,
  ...props
}: Props<T> & ComponentPropsWithoutRef<T>) => {

  const classes = twMerge(`${defaultStyles} ${overrideStyles ?? ""}`);

  const Component = as || "span"

  return (
    <Component
      className={classes}
      {...props}
    >
      {children}
    </Component>
  );
}