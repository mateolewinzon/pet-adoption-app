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
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async (values: FormValues) => {
    setStatus("loading");
    setError(null);
    const { data, error } = await postPet(values);
    if (data.success) {
      setStatus("success");
    }
    if (error) {
      setStatus("idle");
      setError("An error occurred" + error && error );
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
        error={{ error, setError }}
        status={{ status, setStatus }}
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
