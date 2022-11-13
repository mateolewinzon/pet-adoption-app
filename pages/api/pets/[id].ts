import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import type { Response } from "utils/fetch";

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

    const data: any = {}

    for (let value in req.body) {
      data[value] = req.body[value] || undefined 
    }

    data.id = undefined

    try {
      const pet = await prisma.pet.update({
        where: { id },
        data,
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
