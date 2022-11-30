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

  if (req.method === "POST") {
    const user = await getUser(req, res);

    if (!user) {
      response.error = "login required";
      res.status(401);
      return res.json(response);
    }

    try {
      const pet = await prisma.pet.create({
        data: { ...req.body, userId: user.id },
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
        include: { user: true },
      });
      response.data = pets;
    } catch (error) {
      res.status(500)
    }
  }
  res.json(response);
}
