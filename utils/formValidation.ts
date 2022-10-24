import * as Yup from "yup";

export const PetSchema = Yup.object().shape({
  title: Yup.string().min(5).max(100).required(),
  description: Yup.string().min(10).max(500).required(),
  birthYear: Yup.string().matches(/^\d{4}$/, 'Must be a valid year').required(),
  animalId: Yup.string().length(24).required(),
  breedId: Yup.string().length(24).required(),
});
