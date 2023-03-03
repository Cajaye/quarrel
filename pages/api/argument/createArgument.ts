import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prismadb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { data: title } = req.body;

    try {
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        res.status(401).json({ message: "Sign in to argue" });
      }

      const prismaUser = await prisma.user.findUnique({
        where: {
          email: session?.user?.email as string,
        },
      });

      if (!prismaUser) {
        res.status(401).json({ message: "Cannot find user" });
      }

      if (!title.length) {
        res.status(400).json({ message: "Argument cannot be empty" });
      }

      if (title.length > 100) {
        res.status(400).json({ message: "Too many characters" });
      }

      const argument = await prisma.argument.create({
        data: {
          title: title as string,
          userId: prismaUser?.id as string,
        },
      });

      res.status(201).json(argument);
    } catch (error) {
      res.status(400).json({ message: "Bad server request" });
    }
  }
}
