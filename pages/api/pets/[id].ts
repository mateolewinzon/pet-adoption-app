import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import type { Response } from "utils/fetch";
import { getUser } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response: Response = {
    data: null,
    success: false,
    error: null,
  };
  const id = req.query.id as string;

  if (req.method === "GET") {
    try {
      const pet = await prisma.pet.findUnique({ where: { id: id } });
      response.data = pet;
      response.success = true;
    } catch (error: any) {
      response.error = error.message;
      res.status(500);
    }
  }

  if (req.method === "PATCH") {
    const user = await getUser(req, res);
    const pet = await prisma.pet.findUnique({ where: { id } });

    if (user?.id !== pet?.userId) {
      response.error = "unauthorized";
      res.status(401);
      return res.json(response);
    }

    try {
      const pet = await prisma.pet.update({
        where: { id },
        data: {
          ...req.body,
          images: req.body.images.length ? req.body.images : undefined,
          id: undefined
        },
      });
      response.data = pet;
      response.success = true;
    } catch (error: any) {
      response.error = error.message;
      console.log(error);
      res.status(500);
    }
  }

  res.json(response);
}
