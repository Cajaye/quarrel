import prisma from "../../../lib/prismadb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    try {
      const argument = await prisma.argument.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
          Vote: true,
        },
      });

      res.status(201).json(argument);
    } catch (error) {
      res.status(400).json({ message: "Bad server request" });
    }
  }
}
