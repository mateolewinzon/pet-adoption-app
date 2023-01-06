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
    const user = await getUser(req, res);
    const pet = await prisma.pet.findUnique({ where: { id } });

    if (user?.id !== pet?.userId) {
      response.error = "login required";
      res.status(401);
      return res.json(response);
    }

    try {
      const pet = await prisma.pet.update({
        where: { id },
        data: {
          ...req.body,
          id: undefined,
        },
      });
      response.data = pet;
    } catch (error: any) {
      response.error = error.message;
      res.status(500);
    }
  }

  if (req.method === "DELETE") {
    const user = await getUser(req, res);
    try {
      const pet = await prisma.pet.findUnique({ where: { id } });
      if (pet?.userId === user?.id) {
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
