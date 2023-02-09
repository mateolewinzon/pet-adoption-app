import { TextComponent } from "components";

type Props = {
  children: React.ReactNode,
  className?: string,
  as?: React.ElementType,
}

export const Heading = ({ children, className, as = "h1", ...props }: Props) => {
  return (
    <TextComponent
      {...props}
      defaultStyles={"text-3xl font-bold text-purple-900 inline"}
      overrideStyles={className}
      as={as}
    >
      {children}
    </TextComponent>
  );
}