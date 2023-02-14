import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import type { Response } from "utils/fetch";
import type { PetImage } from "@prisma/client";
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

  const { animal, breed, images, ...data } = req.body;

  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user) {
      response.error = "login required";
      res.status(401);
      return res.json(response);
    }

    try {
      const pet = await prisma.pet.create({
        data: {
          ...data,
          userId: session?.user.id,
          images: {
            connect: images.map((i: PetImage) => ({ id: i.id })),
          },
        },
      });
      response.data = pet;
    } catch (error: any) {
      res.status(500);
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
