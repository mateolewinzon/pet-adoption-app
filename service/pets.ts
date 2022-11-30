import { get, patch, post } from "./privateApi";
import { uploadImages } from "./uploadImage";
import type { PetFields } from "prisma/types";
import type { PetFormValues as FormValues } from "utils/formTypes";
import { getQueryParams } from "utils/getQueryParams";

export const getPets = async (query?: { [key in PetFields]?: string }) => {
  const data = await get(`pets${query ? `?${getQueryParams(query)}` : ""}`);
  return data;
};

export const postPet = async (body: FormValues) => {
  let images: string[] = [];

  try {
    images = await uploadImages(body.images!);
  } catch (error) {
    return { error: "An error occurred when uploading images", success: false };
  }

  const data = await post("pets", { ...body, images });
  return data;
};

export const updatePet = async (body: FormValues, id: string) => {
  let images: undefined | string[];

  if (body.images) {
    try {
      images = await uploadImages(body.images);
    } catch (error) {
      return {
        error: "An error occurred when uploading images",
        success: false,
      };
    }
  }

  const data = await patch(`pets/${id}`, { ...body, images: images });
  return data;
};
