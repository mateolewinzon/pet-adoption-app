import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { getUser } from "../auth/[...nextauth]";
import type { Response } from "utils/fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response: Response = {
    data: null,
    error: null,
  };

  const { images } = req.body;

  if (req.method === "POST") {
    const user = await getUser(req, res);

    if (!user) {
      response.error = "login required";
      res.status(401);
      return res.json(response);
    }

    try {
      const savedImages = await prisma.$transaction(
        images.map((image: string) =>
          prisma.petImage.create({ data: { url: image } })
        )
      );

      response.data = savedImages;
    } catch (error: any) {
      res.status(500);
    }
  }

  res.json(response);
}
