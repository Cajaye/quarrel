import { Argument, User, Vote } from "@prisma/client";

export type ArgumentsData = Argument & {
  user: User;
  Vote: Vote[];
};
