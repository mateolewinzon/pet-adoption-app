import { SessionProvider } from "next-auth/react";
import { I18nProvider } from "next-localization";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";
import type { Session } from "next-auth";

const App = ({
  Component,
  pageProps: { session, lngDict, ...pageProps },
}: AppProps<{ session: Session; lngDict: {} }>) => {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <I18nProvider locale={router.locale as string} lngDict={lngDict}>
        <Component {...pageProps} />
      </I18nProvider>
    </SessionProvider>
  );
};

export default App;
