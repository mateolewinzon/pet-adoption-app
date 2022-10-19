import Head from "next/head";
import { Header, Footer } from "components";

type Props = {
  children: React.ReactNode;
};

export const Container = ({ children, ...customMeta }: Props) => {
  const meta = {
    title: "Pet Adoption App",
    description: "Browse and post pets for adoption worldwide.",
    ...customMeta,
  };
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
      </Head>
      <Header />
      <main className="flex flex-col justify-center px-8">{children}</main>
      <Footer />
    </div>
  );
};
