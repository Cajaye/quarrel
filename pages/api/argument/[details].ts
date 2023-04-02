import type { NextApiResponse, NextApiRequest } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await prisma?.argument.findUnique({
        where: {
          id: req.query.details as string,
        },
        include: {
          user: true,
          Vote: true,
          Comment: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
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
