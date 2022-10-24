import fetcher from "utils/fetch";
import { generateSignature } from "./getSignature";

const uploadRequest = async (formData: FormData) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD;
  const { data } = await fetcher(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );
  return data;
};

export const uploadImages = async (images: File[]) => {
  const urls = [];

  const { signature, timestamp, transformation, upload_preset } =
    await generateSignature();

  for (const file of images) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY!);
    formData.append("upload_preset", upload_preset);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("transformation", transformation);
    const { url } = await uploadRequest(formData);
    urls.push(url);
  }

  return urls;
};
