import { TextComponent } from "components";

type Props = { children: React.ReactNode, className?: string }

export const SpanSecondary = ({ children, className, ...props }: Props) => {
  return (
    <TextComponent
      defaultStyles={"text-gray-dark dark:text-gray"}
      overrideStyles={className}
      {...props}
    >
      {children}
    </TextComponent>
  );
}