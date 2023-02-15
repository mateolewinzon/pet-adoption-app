import { PetImage } from "@prisma/client";

export type PetFormValues = {
  title: string;
  description: string;
  birthYear: string;
  animalId: string;
  breedId: string;
  images: (PetImage | null)[];
  country: string;
  region: string;
  city: string;
  sex: string;
  phone: string | null
};

export type ProfileFormValues = {
  name: string;
  contactInfo: string;
  phone: string;
  image: ({url: string} | null )[];
  username: string
  biography: string
};
