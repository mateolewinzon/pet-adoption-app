import { useState } from "react";
import { Container, Heading, ProfileForm, Span } from "components";
import { getUser} from "pages/api/auth/[...nextauth]";
import { ProfileSchema } from "utils/formValidation";
import type { GetServerSideProps } from "next";
import type { User } from "prisma/types";
import type { ProfileFormValues as FormValues } from "utils/formTypes";
import { updateProfile } from "service/profile";

type Props = {
  user: User;
};

const Profile = ({ user }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    const { data, error } = await updateProfile({
      ...values,
      image: values.image[0]?.url || "",
    });
    setLoading(false);

    if (data) {
      setSuccess(true);
    }
    if (error) {
      setError("An unexpected error occurred");
    }
  };

  const initialValues: FormValues = {
    name: user.name,
    image: user.image ? [{ url: user.image }] : [],
    contactInfo: user.contactInfo || "",
    phone: user.phone || "",
    username: user.username || "",
    biography: user.biography || "",
  };

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
      {success && (
        <Span className="text-green-600">Profile updated successfully</Span>
      )}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  locale,
}) => {
  const { default: lngDict = {} } = await import(`locales/${locale}.json`);
  
  const user = await getUser(req, res)

  if (!user) {
    return {
      redirect: {
        destination: "/api/auth/signin?callbackUrl=%2Fprofile",
        permanent: true,
      },
    };
  }

  return {
    props: { user: JSON.parse(JSON.stringify(user)), lngDict },
  };
};

export default Profile;
