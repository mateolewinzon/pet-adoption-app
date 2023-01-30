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
      defaultStyles={"text-lg text-gray-dark"}
      overrideStyles={className}
      {...props}
    >
      {children}
    </TextComponent>
  );
}