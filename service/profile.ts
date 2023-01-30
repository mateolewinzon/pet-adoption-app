import { patch } from "./privateApi";
import { uploadImages } from "lib/cloudinary";

export const uploadProfilePicture = async (file: FileList) => {
  try {
    const url = await uploadImages(file);
    return { data: [{ url: url[0] }] };
  } catch (error) {
    return { error };
  }
};

export const updateProfile = async (body: {
  name: string;
  phone: string;
  contactInfo: string;
  image: string
}) => {
  const data = await patch("profile", body);
  return data;
};
