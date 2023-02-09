import Image from "next/image";
import Link from "next/link";
import { ProfilePicture, Span, SpanSecondary, SubHeading } from "components";
import type { User, Pet, PetImage } from "@prisma/client";
import { useRouter } from "next/router";
import formatDate from "utils/formatDate";

type Props = {
  pet: Pet & { images: PetImage[] };
  author: User;
};

export const PetCard = ({ pet, author }: Props) => {
  const { locale } = useRouter();

  return (
    <Link href={`/pet/${pet.id}`}>
      <div className="flex flex-col rounded-xl border border-2 border-neutral-100 hover:border-purple-100">
        <div className="flex items-center justify-between my-2 px-2">
          <div className="flex items-center">
            <ProfilePicture user={author} />
            <SpanSecondary className="mx-2 text">{author.name}</SpanSecondary>
          </div>
          <SpanSecondary className="text-neutral-600 text-sm">
            {formatDate(pet.createdAt, locale)}
          </SpanSecondary>
        </div>

        <div className="relative">
          <Image
            alt={pet.title}
            className="rounded-b-xl shadow-xl"
            style={{ objectFit: "cover" }}
            fill
            src={pet.images[0].url}
          ></Image>
          <div className="flex flex-col w-full justify-end relative h-[350px]">
            <div className="bg-opacity-40 bg-black font-normal px-2 rounded-b-xl">
              <Span className="text-white text-2xl font-semibold line-clamp-2">
                {pet.title}
              </Span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
