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
  const id = req.query.id as string;

  if (req.method === "GET") {
    try {
      const pet = await prisma.pet.findUnique({ where: { id: id } });
      response.data = pet;
    } catch (error: any) {
      response.error = error.message;
      res.status(500);
    }
  }

  if (req.method === "PATCH") {
    const { animal, breed, images, ...data } = req.body;

    const session = await getServerSession(req, res, authOptions);
    const pet = await prisma.pet.findUnique({ where: { id } });

    if (!session?.user || session.user?.id !== pet?.userId) {
      response.error = "login required";
      res.status(401);
      return res.json(response);
    }

    try {
      const pet = await prisma.pet.update({
        where: { id },
        data: {
          ...data,
          images: {
            set: [],
            connect: images.map((i: PetImage) => ({ id: i.id })),
          },
        },
      });
      response.data = pet;
    } catch (error: any) {
      response.error = error.message;
      res.status(500);
    }
  }

  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    try {
      const pet = await prisma.pet.findUnique({ where: { id } });
      if (pet?.userId === session?.user?.id) {
        await prisma.pet.delete({ where: { id } });
      } else {
        res.status(401);
      }
    } catch (error: any) {
      response.error = error.message;
      res.status(500);
    }
  }

  res.json(response);
}
