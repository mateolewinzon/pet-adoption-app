import Image from "next/image";
import { Span, SpanSecondary, SubHeading } from "components";
import type { Pet } from "prisma/types";
import Link from "next/link";

type Props = {
  pet: Pet;
};

export const PetCard = ({ pet }: Props) => {
  return (
    <Link href={`/pet/${pet.id}`}>
      <a>
        <div className="flex flex-col">
          <div className="flex items-center justify-between my-2">
            <div className="flex items-center">
              <Image
                alt={pet.user.name}
                className="rounded-3xl"
                width={40}
                height={40}
                src={pet.user.image}
              />
              <SpanSecondary className="mx-2">{pet.user.name}</SpanSecondary>
            </div>
            <SpanSecondary className="text-gray-500">
              {new Date(pet.createdAt).toDateString()}
            </SpanSecondary>
          </div>

          <div className="relative">
            <Image
              alt={pet.title}
              objectFit="cover"
              layout="fill"
              src={pet.images[0].url}
            ></Image>
            <div className="flex flex-col w-full justify-end relative h-[350px]">
              <div className="bg-opacity-40 bg-black font-semibold px-2 ">
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
