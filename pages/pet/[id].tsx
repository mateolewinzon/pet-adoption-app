import { User } from "@prisma/client";
import {
  ContactInformationSection,
  Container,
  Heading,
  ImageCarousel,
  PetInformationSection,
  Span,
  SpanSecondary,
  ThreeDotsDropdown
} from "components";
import prisma from "lib/prisma";
import type { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import type { Pet } from "prisma/types";
import { deletePetConfirmation } from "utils/confirmationAlerts";

type Props = { pet: Pet; user: User };

const ViewPost = ({ pet, user }: Props) => {
  const router = useRouter();
  const { data } = useSession();

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
            {pet.userId === data?.user.id && (
              <ThreeDotsDropdown
                items={[
                  {
                    text: "Edit post",
                    onClick: () => router.push(`/post/${pet.id}`),
                  },
                  {
                    text: "Delete post",
                    className: "text-red-400",
                    onClick: async () => {
                      await deletePetConfirmation(pet);
                    },
                  },
                ]}
              />
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const pet = await prisma.pet
    .findUnique({
      where: { id: query.id as string },
      include: { animal: true, breed: true, user: true, images: true },
    })
    .catch(() => null);

  if (!pet) {
    return { notFound: true };
  }

  return {
    props: { pet: JSON.parse(JSON.stringify(pet)) },
  };
};

export default ViewPost;
