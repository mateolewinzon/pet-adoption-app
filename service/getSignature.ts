import { post } from "./privateApi";

export const generateSignature = async (extraParams?: object) => {
  const {data, error} = await post("sign", extraParams);
  if (error) {
    throw new Error('Image signature error')
  }
  return data 
}
