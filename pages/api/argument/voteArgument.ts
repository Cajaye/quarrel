import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prismadb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { data } = req.body;

    try {
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        res.status(401).json({ message: "Sign in to vote" });
      }

      const prismaUser = await prisma.user.findUnique({
        where: {
          email: session?.user?.email as string,
        },
      });

      if (!prismaUser) {
        res.status(401).json({ message: "Cannot find user" });
      }

      const vote = await prisma.vote.findFirst({
        where: {
          userId: prismaUser?.id as string,
          argumentId: data?.argumentId as string,
        },
      });

      if (vote) {
        if (vote.type === data.type) {
          res.status(400).json({ message: `Already ${data.type}d` });
        } else {
          const oldVote = await prisma.vote.deleteMany({
            where: {
              userId: prismaUser?.id as string,
              argumentId: data?.argumentId as string,
            },
          });

          const createdVote = await prisma.vote.create({
            data: {
              userId: prismaUser?.id as string,
              argumentId: data?.argumentId as string,
              type: data.type as string,
            },
          });
          res.status(201).json(createdVote);
        }
      } else {
        const createdVote = await prisma.vote.create({
          data: {
            userId: prismaUser?.id as string,
            argumentId: data?.argumentId as string,
            type: data.type as string,
          },
        });
        res.status(201).json(createdVote);
      }
    } catch (error) {
      res.status(400).json({ message: "Bad server request" });
    }
  }
}
