import { useState } from "react";
import { Container, Heading, ProfileForm } from "components";
import { getUser } from "pages/api/auth/[...nextauth]";
import { ProfileSchema } from "utils/formValidation";
import type { GetServerSideProps } from "next";
import type { UserWithPets } from "prisma/types";
import type {ProfileFormValues as FormValues} from 'utils/formTypes'
import { updateProfile } from "service/profile";

type Props = {
  user: UserWithPets;
};

const Profile = ({ user }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);
    const { data, error } = await updateProfile(values);
    setLoading(false);
    if (data) {
      // Router
    }
    if (error) {
      setError("An unexpected error occurred");
    }
  };

  const initialValues: FormValues = {
    name: user.name,
    contactInfo: user.contactInfo || '',
    phone: user.phone|| '',
    image: undefined,
  }

  return (
    <Container>
      <Heading>Edit your profile</Heading>
      <ProfileForm
        validationSchema={ProfileSchema}
        error={error}
        isLoading={loading}
        initialValues={initialValues}
        handleSubmit={(values) => handleSubmit(values)}
      />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = await getUser(req, res);

  if (!user) {
    return {
      redirect: {
        destination: "/api/auth/signin?callbackUrl=%2Fprofile",
        permanent: true
      }
    }
  }

  return {
    props: { user },
  };
};

export default Profile;
