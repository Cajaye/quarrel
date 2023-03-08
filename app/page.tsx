'use client'
import CreateArgument from "./components/CreateArgument";
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";
import Arguments from "./components/Argument";
import { ArgumentsData } from "./types/arguments";
import { useMemo } from "react";



async function getArguments():Promise<ArgumentsData[]> {
  const res = await axios.get('/api/argument/getArguments')
  return res.data
} 


export default function Home() {
  const { data, isLoading, error } = useQuery({ queryKey: ['arguments'], queryFn: getArguments })
  
  if (isLoading) {
    return "Loading..."
  }

  if (error && error instanceof AxiosError) {
    return (
      <h3>{ error.response?.data.message }</h3>
    )
  }

  function voteTypeTotal(arr: ArgumentsData["Vote"]) {
    const upvotes = arr.filter((vote) => vote.type === "upvote")
    const downvotes = arr.filter((vote) => vote.type === "downvote")   
    
    return {
      upvotesLength: upvotes.length,
      downvotesLength: downvotes.length,
    }
  }

  
  return (
    <main>
      <CreateArgument />
      {data?.map((argument) => <Arguments
        userId={argument.userId}
        name={argument.user.name}
        avatar={argument.user.image}
        id={argument.id}
        key={argument.id}
        title={argument.title}
        createdAt={argument.createdAt}
        upvote={voteTypeTotal(argument.Vote).upvotesLength}
        downvote={voteTypeTotal(argument.Vote).downvotesLength}
      />)}
    </main>
  )
}
