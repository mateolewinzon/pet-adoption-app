import { PetWithUser } from "prisma/types";

type Props = {
  pet: PetWithUser;
};

export const PetCard = ({ pet }: Props) => {
  return <div>{pet.title}</div>;
};
