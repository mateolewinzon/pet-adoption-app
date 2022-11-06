import { Prisma } from "@prisma/client";

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
