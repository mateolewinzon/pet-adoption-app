import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import type { Response } from "utils/fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response: Response = {
    data: {},
    success: false,
    error: null,
  };

  try {
    if (req.method === "POST") {
      const pet = await prisma.pet.create({ data: req.body });
      response.data = pet;
      response.success = true;
    }

    if (req.method === "GET") {
      const pets = await prisma.pet.findMany();
      response.data = pets;
      response.success = true;
      res.json(pets);
    }
  } catch (error) {
    response.error = error;
    res.status(500)
  }

  res.json(response);
}
