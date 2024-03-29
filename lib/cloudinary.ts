import { savePetImages } from "service/pets";
import { Response } from "utils/fetch";
import { post } from "../service/privateApi";

const generateSignature = async (
  extraParams?: object
): Promise<{
  signature: string;
  timestamp: string;
  transformation: string;
  upload_preset: string;
}> => {
  const {
    data: { signature, timestamp, transformation, upload_preset },
  } = await post("sign", extraParams);

  return { signature, timestamp, transformation, upload_preset };
};

const uploadRequest = async (formData: FormData) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD;
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );
  const data = await response.json();
  return data;
};

export const uploadImages = async (images: FileList): Promise<string[]> => {
  const urls = [];

  const { signature, timestamp, transformation, upload_preset } =
    await generateSignature();

  for (let i = 0; i < images.length; i++) {
    const formData = new FormData();
    formData.append("file", images[i]);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_PUBLIC!);
    formData.append("upload_preset", upload_preset);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("transformation", transformation);
    const { url } = await uploadRequest(formData);
    urls.push(url);
  }

  return urls;
};
