import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const pet = await prisma.pet.create({ data: req.body });
    res.json(pet);
  } else {
    const pets = await prisma.pet.findMany();
    res.json(pets);
  }
}
