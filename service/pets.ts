import { get, patch, post, deleteRequest } from "./privateApi";
import type { PetFields } from "prisma/types";
import type { PetFormValues as FormValues } from "utils/formTypes";
import { getQueryParams } from "utils/getQueryParams";
import { uploadImages } from "lib/cloudinary";

export const getPets = async (query?: { [key in PetFields]?: string }) => {
  const data = await get(`pets${query ? `?${getQueryParams(query)}` : ""}`);
  return data;
};

export const postPet = async (body: FormValues) => {
  const data = await post("pets", body);
  return data;
};

export const updatePet = async (body: FormValues, id: string) => {
  const data = await patch(`pets/${id}`, body);
  return data;
};

export const savePetImages = async (files: FileList) => {
  const urls = await uploadImages(files);
  const data = await post("images", { images: urls });

  return data;
};

export const deletePet = async (id: string) =>
  await deleteRequest(`pets/${id}`);
