'use client'
import Arguments from "@/app/components/Argument"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"


type Url = {
  params: {
    slug:string
  }
}

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/argument/${slug}`)
  return response.data
}

export default function ArgumentDetail(url: Url) {
    const { data:argument, error, isLoading } = useQuery({
      queryFn:() => fetchDetails(url.params.slug) ,
      queryKey: ['argument-details']
    })

    if (error && axios.isAxiosError(error))return (
        <div className="flex flex-col my-2">
        {error.message}
        </div> 
    )
    
    if (isLoading) return "Loading..."

  
    return (
        <div>
        <Arguments
        userId={argument.userId}
        name={argument.user.name}
        avatar={argument.user.image}
        id={argument.id}
        key={argument.id}
        title={argument.title}
        createdAt={argument.createdAt}
        votes={argument.Vote}
      />
        </div>
    )
}