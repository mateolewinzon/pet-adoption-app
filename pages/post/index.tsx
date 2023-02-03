import { useRouter } from "next/router";
import { Container, Heading, PetForm } from "components";
import { useState } from "react";
import { postPet } from "service/pets";
import { PetSchema } from "utils/formValidation";
import prisma from "lib/prisma";
import type { GetStaticProps } from "next";
import type { Animal } from "prisma/types";
import type { PetFormValues as FormValues } from "utils/formTypes";

type Props = { animals: Animal[] };

const Post = ({ animals }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);
    const { data, error } = await postPet(values);

    if (data) {
      router.push(`/pet/${data.id}`);
    }
    if (error) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  const initialValues: FormValues = {
    title: "",
    description: "",
    birthYear: "",
    animalId: animals[1].id,
    breedId: animals[1].breeds.find((b) => b.name === "unknown_dog")?.id || "",
    images: [],
    country: "",
    region: "",
    city: "",
    sex: "male",
  };
  return (
    <Container>
      <Heading>Post a pet</Heading>
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

export default Post;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { default: lngDict = {} } = await import(`locales/${locale}.json`);
  const animals = await prisma.animal.findMany({ include: { breeds: true } });
  return {
    props: {
      animals: JSON.parse(JSON.stringify(animals)),
      lngDict,
    },
  };
};
