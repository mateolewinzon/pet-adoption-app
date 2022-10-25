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
    const id = req.query.id as string;
    const pets = await prisma.pet.findMany({ where: { id: id } });
    response.data = pets
    response.success = true
  } catch (error) {
    response.error = error
    res.status(500)
  }

 
  res.json(response);
}
