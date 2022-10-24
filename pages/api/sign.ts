import { v2 as cloudinary } from "cloudinary";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiSecret = process.env.CLOUDINARY_SECRET;

  const signedRequestParams = {
    timestamp: new Date().getTime() / 1000,
    upload_preset: "ml_defauslt",
    transformation: "w_1000,h_1000,c_limit",
  };

  try {
    const signature = cloudinary.utils.api_sign_request(
      signedRequestParams,
      apiSecret!
    );

    return res.json({ success: true, signature, ...signedRequestParams });
  } catch (error) {
    console.log(error);

    return res.json({ success: false });
  }
}
