import { Container, Heading, PetForm } from "components";
import { getUser } from "pages/api/auth/[...nextauth]";
import { useState } from "react";
import { updatePet } from "service/pets";
import { PetSchema } from "utils/formValidation";
import prisma from "lib/prisma";
import type { AnimalWithBreeds, Pet } from "prisma/types";
import type { GetServerSideProps } from "next";
import type { PetFormValues as FormValues } from "utils/formTypes";

type Props = { animals: AnimalWithBreeds[]; pet: Pet };

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
    images: null,
  };

  PetSchema.fields.images.withMutation(schema=> schema.notRequired())

  return (
    <Container>
      <Heading>Update your pet</Heading>
      <PetForm
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

  if (!user) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=%2Fpost/${query.postId}}`,
        permanent: true,
      },
    };
  }

  const pet = await prisma.pet
    .findUnique({
      where: { id: query.postId as string },
    })
    .catch(() => null);

  if (!pet) {
    return {
      notFound: true,
    };
  }

  if (pet.userId !== user.id) {
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
      animals: JSON.parse(JSON.stringify(animals)),
      pet: JSON.parse(JSON.stringify(pet)),
    },
  };
};
