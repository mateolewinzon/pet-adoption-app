import Head from "next/head";
import { Header, Footer } from "components";
import { twMerge } from "tailwind-merge";
import { Raleway } from "@next/font/google";

type Props = {
  children: React.ReactNode;
  width?: string;
  title?: string;
  description?: string;
  image?: string
  className?: string;
};

const raleway = Raleway({
  subsets: [],
  weight: ["200", "300", "400", "500"],
});

export const Container = ({
  children,
  className,
  width = "max-w-5xl",
  ...customMeta
}: Props) => {
  const meta = {
    title: "PetAdopters",
    description: "Browse and post pets for adoption.",
    image: "https://nationaltoday.com/wp-content/uploads/2021/04/Adopt-A-Shelter-1-640x514.jpg",
    ...customMeta,
  };
  return (
    <div className={raleway.className}>
      <Head>
        <title>{meta.title}</title>
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta
          property="og:image"
          content={meta.image}/>
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"></link>
      </Head>
      <Header />
      <main
        className={twMerge(
          `flex flex-col ${width} px-4 py-4 mx-auto min-h-[96vh]`,
          className
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};
