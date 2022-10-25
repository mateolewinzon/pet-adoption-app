import { Container, PostPetForm } from "components";
import { GetStaticProps } from "next";
import { useState } from "react";
import { getAnimals, getBreeds, postPet } from "service/pets";

export type DbData = {
  [key: string]: string
}

type Props =  { data: { [key: string]: DbData[] } }

export type FormValues = {
  title: string;
  description: string;
  birthYear: string;
  animalId: string;
  breedId: string;
  images: File[];
};

const Post = ({ data: {animals, breeds} }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);
    const { data, error, success } = await postPet(values);
    console.log(data, success)

    setLoading(false);
    if (success) {
      alert('success')
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
  };

  return (
    <Container>
      <PostPetForm
        error={error}
        isLoading={loading}
        data={{ animals, breeds }}
        initialValues={initialValues}
        handleSubmit={(values) => handleSubmit(values)}
      />
    </Container>
  );
};

export default Post;

export const getStaticProps: GetStaticProps = async () => {
  const { data: animals } = await getAnimals();
  const { data: breeds } = await getBreeds();

  return {
    props: {
      data: { animals, breeds },
    },
  };
};
