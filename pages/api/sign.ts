import { v2 as cloudinary } from "cloudinary";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Response } from "utils/fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const response: Response = {
    data: null,
    success: false,
    error: null,
  };

  const apiSecret = process.env.CLOUDINARY_SECRET;

  const signedRequestParams = {
    timestamp: new Date().getTime() / 1000,
    upload_preset: "ml_default",
    transformation: "w_1000,h_1000,c_limit",
  };

  try {
    const signature = cloudinary.utils.api_sign_request(
      signedRequestParams,
      apiSecret!
    );
    response.data = { signature, ...signedRequestParams }
    response.success = true
    return res.json(response);
  } catch (error) {
    response.error = 'Error when signing'
    return res.status(500).json(response)
  }
}
