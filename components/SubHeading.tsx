import { TextComponent } from "components";

type Props = {
  children: React.ReactNode,
  className: string,
  as?: React.ElementType
}

export const SubHeading = ({
  children,
  className,
  as,
  ...props
}: Props) => {
  return (
    <TextComponent
      defaultStyles={"text-4xl font-semibold text-black dark:text-white"}
      overrideStyles={className}
      {...props}
      as={as || 'h2'}
    >
      {children}
    </TextComponent>
  );
}