import { Container, Heading, SubHeading } from "components";
import { GetServerSideProps } from "next";
import prisma from "lib/prisma";
import type { AnimalWithBreeds, Pet } from "prisma/types";
import Image from "next/image";

type Props = { animals: AnimalWithBreeds[]; pet: Pet };

const ViewPost = ({ pet }: Props) => {
  return (
    <Container>
      <Heading>{pet.title}</Heading>
      <SubHeading>{pet.description}</SubHeading>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const pet = await prisma.pet
    .findUnique({
      where: { id: query.id as string },
    })
    .catch(() => null);

  return {
    props: { pet: JSON.parse(JSON.stringify(pet)) },
  };
};

export default ViewPost;
