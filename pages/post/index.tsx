import { Container, PostPetForm } from "components";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { AnimalWithBreeds } from "prisma/types";
import { useState } from "react";
import { getAnimals, postPet } from "service/pets";

type Props = { animals: AnimalWithBreeds[] };

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

const Post = ({ animals }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);
    const { data, error, success } = await postPet(values);

    setLoading(false);
    if (success) {
      // Router
    }
    if (error) {
      setError("An unexpected error occurred");
    }
  };

  const initialValues: FormValues = {
    title: "",
    description: "",
    birthYear: "",
    animalId: animals[1].id,
    breedId: "",
    images: [],
    country: "",
    region: "",
  };

  return (
    <Container>
      <PostPetForm
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

export const getStaticProps: GetStaticProps = async () => {
  const { data: animals } = await getAnimals();

  return {
    props: {
      animals,
    },
  };
};
