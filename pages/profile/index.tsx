import { useState } from "react";
import { Container, Heading, ProfileForm } from "components";
import { getUser } from "pages/api/auth/[...nextauth]";
import { ProfileSchema } from "utils/formValidation";
import type { GetServerSideProps } from "next";
import type { UserWithPets } from "prisma/types";
import type {ProfileFormValues as FormValues} from 'utils/formTypes'

type Props = {
  user: UserWithPets;
};

const Profile = ({ user }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [editing, setEditing] = useState<boolean>(false);

  const handleSubmit = (values: FormValues) => {};

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

  return {
    props: { user },
  };
};

export default Profile;
