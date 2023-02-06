import {
  Container,
  Heading,
  SocialSignInButton,
  Span,
  Logo,
} from "components";
import providers from "config/authProviders";
import type { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { useI18n } from "next-localization";
import { authOptions } from "pages/api/auth/[...nextauth]";

export default function Signin() {
  const i18n = useI18n();
  return (
    <Container
      title="Signin | PetAdopters"
      className="bg-purple-800 max-w-full"
    >
      <div className="flex flex-col items-center relative top-10">
        <span className="text-white text-2xl font-semibold mt-2 mb-8">
          {i18n.t("signin.welcome_title")}
        </span>
        <div className="shadow-xl  p-4 rounded-xl flex flex-col items-center mx-auto justify-center bg-white ronded-xl max-w-md">
          <Heading> {i18n.t("signin.signin")}</Heading>
          <Span className="text-neutral-700">
            {i18n.t("signin.welcome_text")}
          </Span>
          <div className="flex flex-col my-4">
            {providers.map((provider, key) => (
              <SocialSignInButton key={key} provider={provider} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  req,
  res,
}) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    return { redirect: { destination: "/" }, props: {} };
  }

  const { default: lngDict } = await import(`locales/${locale}.json`);
  return { props: { lngDict } };
};
