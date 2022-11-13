import { FormValues } from "pages/post";
import { get, patch, post } from "./privateApi";
import { uploadImages } from "./uploadImage";
import { PetFields } from "prisma/types";

export const getPets = async (query?: { [key in PetFields]?: string }) => {
  const data = await get(`pets?${new URLSearchParams(query).toString()}`);
  return data;
};

export const getPet = async (id: string) => {
  const data = await get(`pets/${id}`);
  return data;
};

export const getAnimals = async () => {
  const data = await get("animals");
  return data;
};

export const postPet = async (body: FormValues) => {
  try {
    const uploadedImages = await uploadImages(body.images);
    const data = await post("pets", { ...body, images: uploadedImages });
    return data;
  } catch (error) {
    return { error: "An error occurred when uploading images", success: false };
  }
};

export const updatePet = async (body: FormValues, id: string) => {
  try {
    const uploadedImages = body.images.length && (await uploadImages(body.images));
    const data = await patch(`pets/${id}`, { ...body, images: uploadedImages });
    return data;
  } catch (error) {
    return { error: "An error occurred when uploading images", success: false };
  }
};
