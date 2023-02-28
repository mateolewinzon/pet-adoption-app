import {
  ContactInformationSection,
  Container,
  Heading,
  ImageCarousel,
  PetInformationSection,
  ProfilePicture,
  Span,
  SpanSecondary,
  ThreeDotsDropdown,
  WhatsAppOverlay,
} from "components";
import useTranslate from "hooks/useTranslate";
import prisma from "lib/prisma";
import type { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Pet } from "prisma/types";
import { deletePet } from "service/pets";
import { confirmDangerousAction } from "utils/alerts";

type Props = { pet: Pet };

const ViewPost = ({ pet }: Props) => {
  const router = useRouter();
  const { data } = useSession();
  const t = useTranslate();

  return (
    <Container
      description={t("pet.seo_description")}
      title={`PetAdopters - ${pet.title}`}
      image={pet.images[0].url}
    >
      {pet.phone && <WhatsAppOverlay phone={pet.phone} />}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <Link href={`/${pet.user.username}`}>
            <div className="flex items-center py-2 ">
              <ProfilePicture user={pet.user} />
              <div className="flex flex-col">
                <SpanSecondary className="mx-2 text-gray-400 text-xs">
                  {t("pet.owner_shelter")}
                </SpanSecondary>
                <SpanSecondary className="mx-2">{pet.user.name}</SpanSecondary>
              </div>
            </div>
          </Link>
          <ImageCarousel alt={pet.title} images={pet.images} />
        </div>
        <div className="flex gap-2 flex-col">
          <div className="flex justify-between items-center ">
            <Heading>{pet.title}</Heading>
            {pet.userId === data?.user.id && (
              <ThreeDotsDropdown
                items={[
                  {
                    text: t("pet.edit_post"),
                    onClick: () => router.push(`/post/${pet.id}`),
                  },
                  {
                    text: t("pet.delete_post"),
                    className: "text-red-400",
                    onClick: async () => {
                      await confirmDangerousAction(
                        {
                          title: `Are you sure you want to delete ${pet.title}?`,
                        },
                        async () => {
                          const response = await deletePet(pet.id);
                          if (!response.error) router.push("/");
                          return response;
                        },
                        "Pet deleted successfully",
                        "An error occurred when deleting pet."
                      );
                    },
                  },
                ]}
              />
            )}
          </div>
          <Span className="text-neutral-800">{pet.description}</Span>
          <PetInformationSection pet={pet} />
          <ContactInformationSection pet={pet} />
        </div>
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  locale,
}) => {
  const { default: lngDict = {} } = await import(`locales/${locale}.json`);
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
    props: { pet: JSON.parse(JSON.stringify(pet)), lngDict },
  };
};

export default ViewPost;
