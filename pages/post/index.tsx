import { useRouter } from "next/navigation";
import { Container, Heading, PetForm } from "components";
import { useState } from "react";
import { postPet } from "service/pets";
import { PetSchema } from "utils/formValidation";
import prisma from "lib/prisma";
import type { GetServerSideProps, GetStaticProps } from "next";
import type { Animal } from "prisma/types";
import type { PetFormValues as FormValues } from "utils/formTypes";
import { getUser } from "pages/api/auth/[...nextauth]";

type Props = { animals: Animal[], defaultPhone: string };

const Post = ({ animals, defaultPhone }: Props) => {
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
    phone: defaultPhone || ""
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

export const getServerSideProps: GetServerSideProps = async ({ locale, req, res }) => {

  const user = await getUser(req, res)

  if (!user) {
    return {
      redirect: {
        destination: "/signin",
        permanent: true
      }
    }
  }

  const { default: lngDict = {} } = await import(`locales/${locale}.json`);
  const animals = await prisma.animal.findMany({ include: { breeds: true } });
  return {
    props: {
      animals: JSON.parse(JSON.stringify(animals)),
      lngDict,
      defaultPhone: user.phone 
    },
  };
};
