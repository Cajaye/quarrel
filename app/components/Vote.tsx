"use client";
import { Argument } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";


type VoteProps = {
  argumentId: Argument["id"],
  votes: {
    id: string;
    argumentId: string | null;
    commentId: string | null;
    userId: string;
    type: string;
  }[],
}

type VoteData = {
  type: "upvote" | "downvote";
  argumentId: Argument["id"];
};

export default function Vote({argumentId,votes}:VoteProps) {
  let toastVoteId: string;
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (data: VoteData) =>
      await axios.post("/api/argument/voteArgument", { data }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message, { id: toastVoteId });
        }
      },
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["arguments"] });
        queryClient.invalidateQueries({ queryKey: ["argument-details"] });
        queryClient.invalidateQueries({ queryKey: ["auth-arguments"] });
        toast.success("Vote edited", { id: toastVoteId });
      },
    }
  );

  const vote = async (type: VoteData["type"]) => {
    toastVoteId = toast.loading("Voting", {id:toastVoteId})
    mutate({type:type, argumentId:argumentId})
  }

    const upvotes = votes.filter((vote) => vote.type === "upvote").length
    const downvotes = votes.filter((vote) => vote.type === "downvote").length
    

  return (
    <div className="flex gap-2">
      <div className="flex flex-col items-center">
        <svg
          onClick={() => vote("upvote")}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`w-5 h-5 cursor-pointer text-gray-500 text-sm font-bold`}
        >
          <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z" />
        </svg>
        <p>{upvotes}</p>
      </div>
      <div>
        <p className="text-gray-500">/</p>
      </div>
      <div className="flex flex-col items-center">
        <svg
          onClick={() => vote("downvote")}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`w-5 h-5 cursor-pointer text-gray-500 text-sm font-bold`}
        >
          <path d="M18.905 12.75a1.25 1.25 0 01-2.5 0v-7.5a1.25 1.25 0 112.5 0v7.5zM8.905 17v1.3c0 .268-.14.526-.395.607A2 2 0 015.905 17c0-.995.182-1.948.514-2.826.204-.54-.166-1.174-.744-1.174h-2.52c-1.242 0-2.26-1.01-2.146-2.247.193-2.08.652-4.082 1.341-5.974C2.752 3.678 3.833 3 5.005 3h3.192a3 3 0 011.342.317l2.733 1.366A3 3 0 0013.613 5h1.292v7h-.963c-.684 0-1.258.482-1.612 1.068a4.012 4.012 0 01-2.165 1.73c-.433.143-.854.386-1.012.814-.16.432-.248.9-.248 1.388z" />
        </svg>
        <p>{downvotes}</p>
      </div>
    </div>
  );
}
