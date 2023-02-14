import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import type { Response } from "utils/fetch";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response: Response = {
    data: null,
    error: null,
  };
  if (req.method === "PATCH") {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user) {
      response.error = "";
      return res.status(401).json(response);
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: session.user.id },
        data: req.body,
      });
      response.data = updatedUser;
    } catch (error: any) {
      res.status(500)
      response.error = error.message;
    }
  }

  res.json(response);
}
