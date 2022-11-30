import { post } from "./privateApi";

export const generateSignature = async (
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
