import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import type { Response } from "utils/fetch";
import { getUser } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response: Response = {
    data: {},
    success: false,
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
      response.success = true;
    } catch (error: any) {
      response.error = error.message;
      res.status(500);
    }
  }

  if (req.method === "GET") {
    try {
      const pets = await prisma.pet.findMany({include: {user: true}});
      response.data = pets;
      response.success = true;
    } catch (error: any) {
      response.error = error.message;
      res.status(500);
    }
  }

  res.json(response);
}
