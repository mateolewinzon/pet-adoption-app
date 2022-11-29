import { useState } from "react";
import { Container, PetCard, PetFilters } from "components";
import { getPets } from "service/pets";
import usePets from "service/usePets";
import type { GetServerSideProps } from "next";
import type { PetWithUser } from "prisma/types";

type Props = {
  initialPets: any;
};

const Home = ({ initialPets }: Props) => {
  const [filters, setFilters] = useState(null);

  const { pets, isLoading, isError } = usePets(filters, initialPets);

  return (
    <Container>
        <PetFilters filters={{ filters, setFilters }} />
        <div className="grid sm:grid-cols-2 gap-6">
          {pets.map((pet: PetWithUser) => <PetCard key={pet.id} pet={pet} />)}
        </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const pets = await getPets();
  return {
    props: {
      initialPets: pets
    },
  };
};

export default Home;
