import Image from "next/image";
import { PetWithUser } from "prisma/types";
import { Span } from "./Span";
import { SpanSecondary } from "./SpanSecondary";
import { SubHeading } from "./SubHeading";

type Props = {
  pet: PetWithUser;
};

export const PetCard = ({ pet }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center">
          <Image
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
          width={350}
          height={350}
          objectFit='cover'
          layout="fill"
          src={pet.images[0]}
        ></Image>
        <div className="flex flex-col w-full justify-end relative h-[350px] w-[350px]">
          <div className="bg-opacity-40 bg-black font-semibold px-2 ">
            <SubHeading as={'h3'} className="text-white line-clamp-2">{pet.title}</SubHeading>
            <Span className="text-gray-200 line-clamp-3">{pet.description}</Span>
          </div>
        </div>
      </div>
    </div>
  );
};
