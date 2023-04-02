import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);

    if (!session)
      return res.status(401).json({ message: "Please sign in to make a post" });

    //get authenticated users posts
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session.user?.email as string,
        },
        include: {
          Argument: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              Vote: true,
            },
          },
        },
      });
      res.status(200).json(data);
    } catch (err) {
      return res
        .status(403)
        .json({ message: "Error has occured while fetching arguments" });
    }
  }
}
