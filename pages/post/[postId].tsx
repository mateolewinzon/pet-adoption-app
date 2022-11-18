import { Container, PostPetForm, SubHeading } from "components";
import { getUser } from "pages/api/auth/[...nextauth]";
import { useState } from "react";
import { updatePet } from "service/pets";
import { PetSchema } from "utils/formValidation";
import prisma from "lib/prisma";
import type { AnimalWithBreeds, Pet } from "prisma/types";
import type { GetServerSideProps } from "next";

type Props = { animals: AnimalWithBreeds[]; pet: Pet };

export type FormValues = {
  title: string;
  description: string;
  birthYear: string;
  animalId: string;
  breedId: string;
  images: File[];
  country: string;
  region: string;
};

const EditPost = ({ animals, pet }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);
    const { data, error, success } = await updatePet(values, pet.id);

    setLoading(false);
    if (success) {
      // Router
    }
    if (error) {
      setError("An unexpected error occurred");
    }
  };

  const initialValues: FormValues = {
    ...pet,
    images: [],
  };

  return (
    <Container>
      <SubHeading>Update your pet</SubHeading>
      <PostPetForm
        validationSchema={PetSchema}
        error={error}
        isLoading={loading}
        animals={animals}
        initialValues={initialValues}
        handleSubmit={(values) => handleSubmit(values)}
      />
    </Container>
  );
};

export default EditPost;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const user = await getUser(req, res);
  const pet = await prisma.pet.findUnique({where: { id: query.postId as string }})

  if (!user) {
    return {
      redirect: { destination: `/api/auth/signin?callbackUrl=%2Fpost/${pet?.id}`, permanent: true },
    };
  }

  if (!pet) {
    return {
      notFound: true,
    };
  }

  if (pet?.userId !== user?.id) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const animals = await prisma.animal.findMany({ include: { breeds: true } });

  return {
    props: {
      animals,
      pet,
    },
  };
};
