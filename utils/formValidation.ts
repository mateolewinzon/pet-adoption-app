import * as Yup from "yup";

function checkFileSize(files?: File[]): boolean {
  let valid = true;
  if (files) {
    Array.from(files)?.forEach((file: File) => {
      const size = file.size / 1024 / 1024;
      if (size > 5) {
        valid = false;
      }
    });
  }
  return valid;
}

function checkImageFormat(files?: File[]): boolean {
  let valid = true;
  if (files) {
    Array.from(files)?.forEach((file) => {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        valid = false;
      }
    });
  }
  return valid;
}

const validateImage = Yup.mixed()
.required()
.test(
  "fileFormat",
  "Images must be .jpeg, .jpg or .png",
  checkImageFormat
)
.test(
  "fileSize",
  "Image size must be less than 5mb",
  checkFileSize
)

export const PetSchema = Yup.object().shape({
  title: Yup.string().min(3).max(100).required(),
  description: Yup.string().min(10).max(500).required(),
  birthYear: Yup.string()
    .matches(/^\d{4}$/, "Must be a valid year")
    .required(),
  animalId: Yup.string().length(24).required(),
  breedId: Yup.string().length(24).required(),
  country: Yup.string().min(2).max(100).required(),
  region: Yup.string().min(2).max(100).required(),
  images: validateImage
});

export const ProfileSchema = Yup.object().shape({
  name: Yup.string().min(3).max(100).required(),
  contactInfo: Yup.string().min(10).max(500),
  phone: Yup.string().min(5).max(100),
  image: validateImage.withMutation((field)=>field.notRequired())
});
