import { Argument, User } from "@prisma/client";

export type ArgumentsData = Argument & { user: User };
