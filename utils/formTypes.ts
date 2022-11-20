export type PetFormValues = {
    title: string;
    description: string;
    birthYear: string;
    animalId: string;
    breedId: string;
    images?: File[];
    country: string;
    region: string;
};

export type ProfileFormValues = {
    name: string
    contactInfo: string
    phone: string
    image?: File[]
}