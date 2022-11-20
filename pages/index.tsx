import { useState } from "react";
import { Container, PetCard } from "components";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { getPets } from "service/pets";
import type { PetWithUser } from "prisma/types";
import { BrowseFilters } from "components/BrowseFilters";

type Props = {
  pets: PetWithUser[];
};

const Home = ({ pets }: Props) => {
  const [results, setResults] = useState(pets);

  return (
    <Container>
      <BrowseFilters setResults={setResults} />
      <div className="grid sm:grid-cols-2 gap-6">
        {results?.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: pets } = await getPets();

  return {
    props: {
      pets,
    },
  };
};

export default Home;
