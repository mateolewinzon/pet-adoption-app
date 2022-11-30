import { useState } from "react";
import { Container, PetCard, PetFilters } from "components";
import { getPets } from "service/pets";
import usePets from "service/usePets";
import type { GetServerSideProps } from "next";
import type { PetWithUser } from "prisma/types";
import { SWRConfig } from "swr";

type Props = {
  fallback: any;
};

const BrowsePets = () => {
  const [filters, setFilters] = useState(null);
  const { pets, error } = usePets(filters);

  return (
    <>
      <PetFilters filters={{ filters, setFilters }} />
      <div className="grid sm:grid-cols-2 gap-6">
        {error && "An error occurred when fetching pets"}
        {pets?.length === 0 && "No pets found"}
        {pets?.map((pet: PetWithUser) => (
          <PetCard key={pet.id} pet={pet} />
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

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await getPets();

  return {
    props: {
      fallback: { "/api/pets": data },
    },
  };
};

export default Home;
