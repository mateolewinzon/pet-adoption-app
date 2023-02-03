import Image from "next/image";
import Link from "next/link";
import { ProfilePicture, Span, SpanSecondary, SubHeading } from "components";
import type { User, Pet, PetImage } from "@prisma/client";

type Props = {
  pet: Pet & { images: PetImage[] };
  author: User;
};

export const PetCard = ({ pet, author }: Props) => {
  return (
    <Link href={`/pet/${pet.id}`}>
      <a>
        <div className="flex flex-col">
          <div className="flex items-center justify-between my-2">
            <div className="flex items-center">
              <ProfilePicture user={author} />
              <SpanSecondary className="mx-2">{author.name}</SpanSecondary>
            </div>
            <SpanSecondary className="text-gray-500">
              {new Date(pet.createdAt).toDateString()}
            </SpanSecondary>
          </div>

          <div className="relative">
            <Image
              alt={pet.title}
              objectFit="cover"
              className="rounded-xl"
              layout="fill"
              src={pet.images[0].url}
            ></Image>
            <div className="flex flex-col w-full justify-end relative h-[350px]">
              <div className="bg-opacity-40 bg-black font-semibold px-2 rounded-b-xl">
                <SubHeading as={"h3"} className="text-white line-clamp-2">
                  {pet.title}
                </SubHeading>
                <Span className="text-gray-200 line-clamp-3">
                  {pet.description}
                </Span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
