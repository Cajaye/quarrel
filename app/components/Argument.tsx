"use client";
import Link from "next/link";
import Image from "next/image";
import { User, Argument } from "@prisma/client";
import Vote from "./Vote";

type ArgumentProps = {
  name: User["name"],
  avatar: User["image"],
  userId: Argument["userId"],
  id: Argument["id"],
  title: Argument["title"],
  createdAt: Argument["createdAt"],
  votes: {
    id: string;
    argumentId: string | null;
    commentId: string | null;
    userId: string;
    type: string;
  }[],
};


export default function Arguments({
  name,
  avatar,
  userId,
  title,
  createdAt,
  id,
  votes,
}: ArgumentProps) {
  let date: string | Date = new Date(createdAt);
  date = new Intl.DateTimeFormat("en-US").format(date);

  //upvote
  //downvote
  return (
    <div className="bg-white rounded-md px-6 py-2 mt-12 mb-6 flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-700 text-sm font-bold">{date}</h3>
        <Vote votes={votes} argumentId={ id } />
      </div>
      <div className="my-4">
        <h3>{title}</h3>
      </div>
      <div className="text-gray-700 mb-4">
        <Link href={`argument/${id}`}>
          <h3>Comments</h3>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href={`/profile`}>
          <Image
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            priority
            className="rounded-full"
            src={avatar as string}
            alt="avatar"
            width={32}
            height={32}
          />
        </Link>
        <Link href={`/profile`}>
          <h3 className="text-gray-700">{name}</h3>
        </Link>
      </div>
    </div>
  );
}
