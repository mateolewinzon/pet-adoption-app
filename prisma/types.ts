import { Prisma, Pet as PetSchemaType } from "@prisma/client";

export type PetFields = Prisma.PetScalarFieldEnum

export type Pet = Prisma.PetGetPayload<{
  include: {
    user: true;
    breed: true
    animal: true
    images: true
  };
}>;

export type UserWithPets = Prisma.UserGetPayload<{
  include: {
    pets: true;
  };
}>;

export type AnimalWithBreeds = Prisma.AnimalGetPayload<{
    include: {
        breeds: true,
    }
}>
