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
import prisma from "lib/prisma";
import type { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useI18n } from "next-localization";
import { useRouter } from "next/navigation";
import type { Pet } from "prisma/types";
import { deletePet } from "service/pets";
import { confirmDangerousAction } from "utils/alerts";

type Props = { pet: Pet };

const ViewPost = ({ pet }: Props) => {
  const router = useRouter();
  const { data } = useSession();
  const i18n = useI18n();

  return (
    <Container title={`PetAdopters - ${pet.title}`}>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="flex flex-col">
          <div className="flex items-center p-2 border border-2 border bg-neutral-50 rounded-t-xl">
            <ProfilePicture user={pet.user} />
            <div className="flex flex-col">
              <SpanSecondary className="mx-2 text-gray-400 text-xs">
                {i18n.t("pet.owner_shelter")}
              </SpanSecondary>
              <SpanSecondary className="mx-2">{pet.user.name}</SpanSecondary>
            </div>
          </div>
          <ImageCarousel alt={pet.title} images={pet.images} />
          {pet.user.phone && <WhatsAppOverlay phone={pet.user.phone}/>}
        </div>
        <div className="flex gap-2 flex-col">
          <div className="flex justify-between items-center ">
            <Heading>{pet.title}</Heading>
            {pet.userId === data?.user.id && (
              <ThreeDotsDropdown
                items={[
                  {
                    text: i18n.t("pet.edit_post"),
                    onClick: () => router.push(`/post/${pet.id}`),
                  },
                  {
                    text: i18n.t("pet.delete_post"),
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
