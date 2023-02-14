import { signIn } from "next-auth/react";
import { Span } from "./Span";
import type { Provider } from "config/authProviders";
import useTranslate from "hooks/useTranslate";

export const SocialSignInButton = ({ provider }: { provider: Provider }) => {
  const t = useTranslate();
  return (
    <button onClick={() => signIn(provider.id)}>
      <div className="flex items-center justify-between gap-3 shadow-lg bg-white rounded-xl p-4 outline outline-2 outline-purple-200 hover:outline-purple-400">
        <Span className="text-purple-800">
          {`${t("signin.signin_with")} ${provider.name}`}
        </Span>
        {provider.logo}
      </div>
    </button>
  );
};
