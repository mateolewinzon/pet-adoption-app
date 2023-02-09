import { TextComponent } from "components";

type Props = {
  className?: string,
  children: React.ReactNode
  as?: React.ElementType
}

export const Span = ({ as = 'span', children, className, ...props }: Props) => {
  return (
    <TextComponent
      as={as}
      defaultStyles={"text-lg text-puerple-900"}
      overrideStyles={className}
      {...props}
    >
      {children}
    </TextComponent>
  );
}