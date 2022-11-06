import { Container, PetCard } from "components";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { getPets } from "service/pets";
import type { PetWithUser } from "prisma/types";

type Props = {
  pets: PetWithUser[];
};

const Home = ({ pets }: Props) => {
  console.log(pets)
  return (
    <Container>
      {pets.map((pet) => (
        <PetCard pet={pet} />
      ))}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const pets = await getPets();
  return {
    props: {
      pets,
    },
  };
};

export default Home;
