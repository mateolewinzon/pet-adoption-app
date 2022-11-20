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

  if (req.method === "PATCH") {
    const user = await getUser(req, res);

    if (!user) {
      response.error = "";
      return res.status(401).json(response);
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: req.body,
      });
      response.data = updatedUser;
      response.success = true;
    } catch (error: any) {
      res.status(500)
      response.error = error.message;
    }
  }

  res.json(response);
}
