import { useRouter } from "next/router";
import { AppProvider } from "next-auth/providers";
import { getProviders, useSession } from "next-auth/react";
import { useI18n } from "next-localization";

import { Container, SocialSignInButton } from "components";
import { GetStaticProps } from "next";

type Props = { [key: string]: AppProvider };

const SignIn = ({ providers }: { providers: Props }) => {
  const { query } = useRouter();
  const i18n = useI18n();
  console.log(query)
  return (
    <Container>
      <div className="flex flex-col justify-center items-center min-h-[80vh]">
        {query?.message && (
          <div>{i18n.t(`signin.messages.${query.message}`)}</div>
        )}
        <div className="outline outline-1 p-20">
          {Object.values(providers).map((provider) => (
            <SocialSignInButton key={provider.name} provider={provider} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { default: lngDict = {} } = await import(`locales/${locale}.json`);
  const providers = await getProviders();

  return {
    props: {
      providers,
      lngDict,
    },
  };
};

SignIn.auth = {
  requiredStatus: "unauthenticated",
};

export default SignIn;
