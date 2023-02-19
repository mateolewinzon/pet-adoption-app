import { URL, USERNAME, YEAR } from "config/regex";
import * as Yup from "yup";

const yupString = (required: boolean, min?: number, max?: number) => {
  let validation = Yup.string()
    .when([], {
      is: () => required,
      then: (schema) => schema.required("validations.required"),
    })
    .when([], {
      is: () => min,
      then: (schema) => schema.min(min!, "validations.too_short"),
    })
    .when([], {
      is: () => max,
      then: (schema) => schema.max(max!, "validations.too_long"),
    });

  return validation;
};

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
    .test("hasUploadedImages", "validations.images_min_1", checkRequired)
    .test("numberOfFiles", "validations.images_max_5", checkNumberOfFiles)
    .test("fileFormat", "validations.images_invalid_format", checkImageFormat)
    .test("fileSize", "validations.invalid_image_size", checkFileSize),
});

export const PetSchema = Yup.object().shape({
  title: yupString(true, 3, 100),
  description: yupString(true, 10, 500),
  birthYear: yupString(true).matches(YEAR, "validations.invalid_year"),
  animalId: yupString(true, 25, 25),
  breedId: yupString(true, 25, 25),
  country: yupString(true, 2, 100),
  region: yupString(true, 2, 100),
  city: yupString(true, 2, 100),
  images: Yup.array()
    .min(1, "validations.images_min_1")
    .max(5, "validations.images_max_5")
    .test(
      "containsLoading",
      "validations.uploading_images",
      (images) => !images!.some((image) => image === null)
    ),
});

export const ProfileSchema = Yup.object().shape({
  name: yupString(true, 3, 40),
  contactInfo: yupString(false, 3, 200),
  phone: yupString(false, 5, 100),
  images: Yup.array().of(Yup.object()).min(1, "validations.too_short").max(5),
  username: yupString(false, 3, 20).matches(USERNAME, "validations.invalid_username"),
  biography: yupString(false, 3, 200),
  link: yupString(true).matches(URL, "validations.invalid_link")
});
