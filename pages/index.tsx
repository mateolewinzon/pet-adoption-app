import { Container, PetCard } from "components";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { getPets } from "service/pets";
import type { PetWithUser } from "prisma/types";

type Props = {
  pets: PetWithUser[];
};

const Home = ({ pets }: Props) => {
  return (
    <Container>
      <div className="grid lg:grid-cols-2 gap-10">
        {pets.map((pet) => (
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
