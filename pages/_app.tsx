import { SessionProvider } from "next-auth/react";
import { I18nProvider } from "next-localization";
import { useRouter } from "next/router";
import { Auth } from "components";
import "../styles/globals.css";
import { CustomAppProps } from "types";

const App = ({
  Component,
  pageProps: { session, lngDict, ...pageProps },
}: CustomAppProps) => {
  const router = useRouter();
  const pageAuthSettings = Component.auth;

  return (
    <I18nProvider locale={router.locale as string} lngDict={lngDict}>
      <SessionProvider session={session}>
        {pageAuthSettings ? (
          <Auth auth={pageAuthSettings}>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </I18nProvider>
  );
};

export default App;
