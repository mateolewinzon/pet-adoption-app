import * as Yup from "yup";

const checkRequired = (files: File[]) => files.length !== 0;

const checkNumberOfFiles = (files: File[]) => files.length < 6;

const checkFileSize = (files: File[]): boolean => {
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
};

const checkImageFormat = (files: File[]): boolean => {
  let valid = true;
  if (files) {
    Array.from(files)?.forEach((file) => {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        valid = false;
      }
    });
  }
  return valid;
};

export const validateFilesToUpload = Yup.object().shape({
  selectedFiles: Yup.mixed()
    .test(
      "hasUploadedImages",
      "You must upload at least one image",
      checkRequired
    )
    .test("numberOfFiles", "Please select up to 5 images", checkNumberOfFiles)
    .test("fileFormat", "Images must be .jpeg, .jpg or .png", checkImageFormat)
    .test("fileSize", "Images size must be less than 5mb", checkFileSize),
});

export const PetSchema = Yup.object().shape({
  title: Yup.string().min(3).max(100).required(),
  description: Yup.string().min(10).max(500).required(),
  birthYear: Yup.string()
    .matches(/^\d{4}$/, "Must be a valid year")
    .required(),
  animalId: Yup.string().length(25).required(),
  breedId: Yup.string().length(25).required(),
  country: Yup.string().min(2).max(100).required(),
  region: Yup.string().min(2).max(100).required(),
  city: Yup.string().min(2).max(100).required(),
  images: Yup.array()
    .min(1, "Upload at least one image")
    .max(5, "Upload up to 5 images")
    .test(
      "containsLoading",
      "Please wait until images are uploaded",
      (images) => !images!.some((image) => image === null)
    ),
});

export const ProfileSchema = Yup.object().shape({
  name: Yup.string().min(3).max(100).required(),
  contactInfo: Yup.string().min(10).max(500),
  phone: Yup.string().min(5).max(100),
  images: Yup.array().of(Yup.object()).min(1).max(5),
});
