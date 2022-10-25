import { FormValues } from "pages/post";
import { get, post } from "./privateApi";
import { uploadImages } from "./uploadImage";

export const getPets = async () => {
  const data = await get("pets");
  return data;
};

export const getAnimals = async () => {
  const data = await get("animals");
  return data;
};

export const getBreeds = async () => {
  const data = await get("breeds");
  return data;
};

export const postPet = async (body: FormValues) => {
  try {
    const uploadedImages = await uploadImages(body.images);
    const data = await post("pets", { ...body, images: uploadedImages });
    return data;
  } catch (error) {
    return {error: "An error occurred when uploading images", success: false}
  }
};
