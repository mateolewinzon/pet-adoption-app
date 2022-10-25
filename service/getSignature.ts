import { post } from "./privateApi";

export const generateSignature = async (extraParams?: object) => {
  const data = await post("sign", extraParams);

  return data 
}
