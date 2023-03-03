'use client'
import CreateArgument from "./components/CreateArgument";
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";
import Arguments from "./components/Argument";
import { ArgumentsData } from "./types/arguments";



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
  
  return (
    <main>
      <CreateArgument />
      {data?.map((argument) => <Arguments
        userId={argument.userId}
        name={argument.user.name}
        avatar={argument.user.image}
        id={argument.id}
        title={argument.title}
        createdAt={argument.createdAt}
      />)}
    </main>
  )
}
