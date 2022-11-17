import prisma from "lib/prisma";
import type { Response } from "utils/fetch";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response: Response = {
    data: null,
    success: false,
    error: null,
  };

  try {
    const animals = await prisma.animal.findMany({ include: { breeds: true } });
    response.data = animals;
    response.success = true;
  } catch (error: any) {
    response.error = error.message;
    res.status(500);
  }

  res.json(response);
}
