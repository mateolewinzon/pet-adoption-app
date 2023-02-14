import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import type { Response } from "utils/fetch";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

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
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
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
