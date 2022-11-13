import { Prisma, Pet as PetSchemaType } from "@prisma/client";

export type Pet = PetSchemaType
export type PetFields = Prisma.PetScalarFieldEnum

export type PetWithUser = Prisma.PetGetPayload<{
  include: {
    user: true;
  };
}>;

export type UserWithPets = Prisma.UserGetPayload<{
  include: {
    pets: true;
  };
}>;

export type AnimalWithBreeds = Prisma.AnimalGetPayload<{
    include: {
        breeds: true
    }
}>
