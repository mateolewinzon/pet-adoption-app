import { Prisma } from "@prisma/client";

export type PetFields = Prisma.PetScalarFieldEnum;

export type Pet = Prisma.PetGetPayload<{
  include: {
    user: true;
    breed: true;
    animal: true;
    images: true;
  };
}>;

export type User = Prisma.UserGetPayload<{
  include: {
    pets: { include: { images: true } };
  };
}>;

export type Animal = Prisma.AnimalGetPayload<{
  include: {
    breeds: true;
  };
}>;
