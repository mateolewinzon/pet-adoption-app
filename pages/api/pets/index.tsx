import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { getUser } from "../auth/[...nextauth]";
import type { Response } from "utils/fetch";
import type { Image } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response: Response = {
    data: null,
    error: null,
  };

  const { animal, breed, images, ...data } = req.body;

  if (req.method === "POST") {
    const user = await getUser(req, res);

    if (!user) {
      response.error = "login required";
      res.status(401);
      return res.json(response);
    }

    try {
      const pet = await prisma.pet.create({
        data: {
          ...data,
          userId: user.id,
          images: {
            createMany: {
              data: images.map((image: string) => {
                return { url: image, userId: user.id};
              }),
            },
          },
        },
      });
      response.data = pet;
    } catch (error: any) {
      res.status(500);
      console.log(error);
    }
  }

  if (req.method === "GET") {
    try {
      const pets = await prisma.pet.findMany({
        where: { ...req.query },
        include: { user: true, images: true },
      });
      response.data = pets;
    } catch (error) {
      res.status(500);
    }
  }
  res.json(response);
}
