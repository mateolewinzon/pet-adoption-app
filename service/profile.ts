import { patch } from "./privateApi";
import { uploadImages } from "./uploadImage";
import type { ProfileFormValues as FormValues } from "utils/formTypes";

export const updateProfile = async (body: FormValues) => {
  let image: undefined | string;

  if (body.image) {
    try {
      const uploadedImages = await uploadImages(body.image!);
      image = uploadedImages[0];
    } catch (e) {
      return {
        error: "An error occurred when uploading profile picture.",
        success: false,
      };
    }
  }

  const data = await patch("profile", { ...body, image: image });
  return data;
};
