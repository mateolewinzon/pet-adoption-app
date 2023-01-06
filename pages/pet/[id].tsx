import { User } from "@prisma/client";
import {
  ContactInformationSection,
  Container,
  Heading,
  ImageCarousel,
  PetInformationSection,
  Span,
  SpanSecondary,
} from "components";
import prisma from "lib/prisma";
import type { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getUser } from "pages/api/auth/[...nextauth]";
import type { PetWithUser } from "prisma/types";
import { deletePetConfirmation, deleteSuccess } from "utils/alert";

type Props = { pet: PetWithUser; user: User };

const ViewPost = ({ pet, user }: Props) => {
  const router = useRouter();

  return (
    <Container title={`Pets Adoption - ${pet.title}`}>
      <div className="sm:grid grid-cols-2 gap-3 width-full">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <Image
              className="rounded-3xl"
              width={40}
              height={40}
              src={pet.user.image}
            />
            <div className="flex flex-col">
              <SpanSecondary className="mx-2 text-gray-400 text-xs">
                Owner / Shelterer
              </SpanSecondary>
              <SpanSecondary className="mx-2">{pet.user.name}</SpanSecondary>
            </div>
          </div>
          <ImageCarousel images={pet.images} />
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center ">
            <Heading>{pet.title}</Heading>
            {pet.userId === user.id && (
              <div className="flex gap-2">
                <SpanSecondary className="text-gray-500">
                  <Link href={`/post/${pet.id}`}>Edit post</Link>
                </SpanSecondary>
                <button
                  className="text-red-700"
                  onClick={() =>
                    deletePetConfirmation(pet)
                      .then(() => router.push("/"))
                      .then(() => deleteSuccess())
                  }
                >
                  Delete post
                </button>
              </div>
            )}
          </div>
          <Span>{pet.description}</Span>
          <PetInformationSection pet={pet} />
        </div>
      </div>
      <ContactInformationSection pet={pet} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  res,
}) => {
  const user = await getUser(req, res);
  const pet = await prisma.pet
    .findUnique({
      where: { id: query.id as string },
      include: { animal: true, breed: true, user: true },
    })
    .catch(() => null);

  if (!pet) {
    return { notFound: true };
  }

  return {
    props: { pet: JSON.parse(JSON.stringify(pet)), user },
  };
};

export default ViewPost;
