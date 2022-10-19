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
    <I18nProvider locale={router.locale as string} lngDict={lngDict}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </I18nProvider>
  );
};

export default App;
