import { GetServerSideProps } from "next";
import { authOptions, getUser } from "pages/api/auth/[...nextauth]";

export default function Profile() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = await getUser(req, res, authOptions);

  if (!user) {
    return { redirect: { destination: "/signin", permanent: true } };
  }

  if (!user.username) {
    return { redirect: { destination: "/profile/edit", permanent: true } };
  }

  return { redirect: { destination: `/${user.username}`, permanent: true } };
};
