import Head from "next/head";
import { Header, Footer } from "components";

type Props = {
  children: React.ReactNode;
  width?: string;
};

export const Container = ({
  children,
  width = "max-w-2xl",
  ...customMeta
}: Props) => {
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
      <main className={`flex flex-col ${width} px-4 py-4 mx-auto`}>{children}</main>
      <Footer />
    </div>
  );
};
