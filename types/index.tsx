import { NextComponentType, NextPage } from "next";
import { Session } from "next-auth";
import { AppProps } from "next/app";

export type AuthSettings = {
  requiredStatus: "authenticated" | "unauthenticated";
  message?: string;
};

export type CustomAppProps = AppProps & {
  pageProps: { session: Session; lngDict: {} };
  Component: NextComponentType & { auth?: AuthSettings };
};

export type PagetWithAuth = NextPage & { auth: AuthSettings };
