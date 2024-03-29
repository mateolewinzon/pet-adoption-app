import { useRouter } from "next/router";
import { Container, Heading, PetForm } from "components";
import { useState } from "react";
import { updatePet } from "service/pets";
import { PetSchema } from "utils/formValidation";
import prisma from "lib/prisma";
import type { Animal, Pet } from "prisma/types";
import type { GetServerSideProps } from "next";
import type { PetFormValues as FormValues } from "utils/formTypes";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

type Props = { animals: Animal[]; pet: Pet };

const EditPost = ({ animals, pet }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);
    const { data, error } = await updatePet(values, pet.id);

    if (data) {
      router.push(`/pet/${data.id}`);
    }
    if (error) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  const initialValues: FormValues = {
    ...pet,
  };

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
  locale,
}) => {
  const { default: lngDict = {} } = await import(`locales/${locale}.json`);
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=%2Fpost/${query.id}}`,
        permanent: true,
      },
    };
  }

  const pet = await prisma.pet
    .findUnique({
      where: { id: query.id as string },
      include: { images: true },
    })
    .catch(() => null);

  if (!pet) {
    return {
      notFound: true,
    };
  }

  if (pet.userId !== session.user.id) {
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
      lngDict,
    },
  };
};
