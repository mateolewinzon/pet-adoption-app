import { useState } from "react";
import { Container, PetCard, PetFilters } from "components";
import { getPets } from "service/pets";
import usePets from "service/usePets";
import type { GetServerSideProps } from "next";
import type { Pet } from "prisma/types";
import { SWRConfig } from "swr";
import { useI18n } from "next-localization";

type Props = {
  fallback: any;
};

const BrowsePets = () => {
  const i18n = useI18n();
  const [filters, setFilters] = useState(null);
  const { pets, error } = usePets(filters);

  return (
    <>
      <PetFilters filters={{ filters, setFilters }} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {error && "An error occurred when fetching pets"}
        {pets?.length === 0 && i18n.t("browse.no_results")}
        {pets?.map((pet: Pet) => (
          <PetCard author={pet.user} key={pet.id} pet={pet} />
        ))}
      </div>
    </>
  );
};

const Home = ({ fallback }: Props) => {
  return (
    <Container>
      <SWRConfig value={{ fallback }}>
        <BrowsePets />
      </SWRConfig>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const { data } = await getPets();
  const { default: lngDict = {} } = await import(`locales/${locale}.json`);

  return {
    props: {
      fallback: { "/api/pets": data },
      lngDict,
    },
  };
};

export default Home;
