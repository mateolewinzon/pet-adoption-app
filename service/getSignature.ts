import { post } from "./privateApi";

export const generateSignature = async (extraParams?: object) => {
  const response = await post("sign", extraParams);

  return response.data 
}
