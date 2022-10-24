import fetcher from "utils/fetch";

export const uploadImages = (images: File[]) => {
  const formData = new FormData();

  for (const file of images) {
    formData.append("file", file);
  }

  const data = fetcher(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD}/image/upload`,
    { method: "POST", body: formData }
  );

  return data;
};
