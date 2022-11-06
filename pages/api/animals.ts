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
    const animals = await prisma.animal.findMany();
    response.data = animals;
    response.success = true;
  } catch (error: any) {
    response.error = error.message;
    res.status(500)
  }

  res.json(response);
}
