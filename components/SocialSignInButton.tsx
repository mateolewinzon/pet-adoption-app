import { signIn } from "next-auth/react";
import { AppProvider } from "next-auth/providers";
import { Span } from "./Span";

export const SocialSignInButton = ({ provider }: { provider: AppProvider }) => {
  return (
    <div>
      <a href="#" onClick={() => signIn(provider.id)}>
        <Span>Sign in with {provider.name}</Span>
      </a>
    </div>
  );
};
