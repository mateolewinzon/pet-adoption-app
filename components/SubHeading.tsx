import { TextComponent } from "components";

type Props = {
  children: React.ReactNode,
  className?: string,
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
      defaultStyles={"text-2xl font-semibold text-slate-700"}
      overrideStyles={className}
      {...props}
      as={as || 'h2'}
    >
      {children}
    </TextComponent>
  );
}