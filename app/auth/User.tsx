"use client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  avatar: string;
  name: string;
};

export default function User({ avatar, name }: Props) {
  return (
    <div className="flex items-center gap-4">
      <Image
        placeholder="blur"
        blurDataURL={'/img/logo.png'}
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        className="rounded-full"
        priority
        src={avatar}
        alt="avatar"
        width={32}
        height={32}
          />
        <h3 className="text-gray-700">{name}</h3>
    </div>
  );
}
