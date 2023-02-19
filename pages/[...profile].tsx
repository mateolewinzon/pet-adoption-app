import {
  Container,
  PetCard,
  ProfilePicture,
  Span,
  WhatsAppOverlay,
} from "components";
import prisma from "lib/prisma";
import type { GetServerSideProps } from "next";
import type { User as UserWithPets } from "prisma/types";
import { User } from "@prisma/client";
import useTranslate from "hooks/useTranslate";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

type Props = {
  profile: UserWithPets;
  loggedUser: User;
};

const Home = ({ profile, loggedUser }: Props) => {
  const t = useTranslate();

  return (
    <Container
      description="Mascotas en adopción"
      title={profile.name}
      image={profile.image!}
    >
      {profile.phone && <WhatsAppOverlay phone={profile.phone} />}
      <div className="flex flex-col justify-center">
        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 max-w-2xl self-center items-center">
          <ProfilePicture user={profile} size={170} />
          <div className="flex flex-col col-span-2">
            <div className="flex items-center gap-2 justify-between">
              <Span className="text-2xl">{profile.username}</Span>
              {loggedUser?.id === profile.id && (
                <Link
                  className="bg-neutral-100 p-2 rounded-xl"
                  href="/profile/edit"
                >
                  {t("profile.edit_profile")}
                </Link>
              )}
            </div>
            <Span className="text-sm">{`${profile.pets.length} ${t(
              profile.pets.length === 1
                ? "profile.number_of_posts_singular"
                : "profile.number_of_posts"
            )}`}</Span>
            <Span className="font-semibold text-base">{profile.name}</Span>
            <Span className="text-sm">{profile.biography}</Span>
            {profile.link && (
              <Link href={profile.link}>
                <Span className="text-sm text-blue-600 hover:underline">{profile.link}</Span>
              </Link>
            )}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
          {profile.pets?.length === 0 && t("profile.no_posts")}
          {profile.pets?.map((pet) => (
            <PetCard author={profile} key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
  req,
  res,
}) => {
  const username = query.profile![0];

  const profile = await prisma.user.findUnique({
    where: { username },
    include: { pets: { include: { images: true } } },
  });

  if (!profile) {
    return {
      notFound: true,
    };
  }

  const session = await getServerSession(req, res, authOptions);

  const { default: lngDict = {} } = await import(`locales/${locale}.json`);

  return {
    props: {
      lngDict,
      profile: JSON.parse(JSON.stringify(profile)),
      loggedUser: session && JSON.parse(JSON.stringify(session.user)),
    },
  };
};

export default Home;
