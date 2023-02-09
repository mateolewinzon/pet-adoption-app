import { signIn } from "next-auth/react";
import { Span } from "./Span";
import type { Provider } from "config/authProviders";
import { useI18n } from "next-localization";

export const SocialSignInButton = ({ provider }: { provider: Provider }) => {
  const i18n = useI18n();
  return (
    <button onClick={() => signIn(provider.id)}>
      <div className="flex items-center justify-between gap-3 shadow-lg bg-white rounded-xl p-4 outline outline-2 outline-purple-200 hover:outline-purple-400">
        <Span className="font-semibold text-purple-900">
          {`${i18n.t("signin.signin_with")} ${provider.name}`}
        </Span>
        {provider.logo}
      </div>
    </button>
  );
};
