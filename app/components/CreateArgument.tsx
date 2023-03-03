'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from "axios"
import { FormEvent, useState } from "react"

export default function CreateArgument() {
    const queryClient = useQueryClient()
    let [title, setTitle] = useState("")
    let [isDisabled, setIsDisabled] = useState(false)
    let toastId: string;

    const { mutate } = useMutation(
        async (title:string) => await axios.post('/api/argument/createArgument', { data:title }),
        {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.message, {id:toastId})
                    setIsDisabled(false)
                } else {
                     toast.error("Bad Request", {id:toastId})
                }
            },
            onSuccess: (data) => {
                toast.success("Argument Created", { id: toastId })
                queryClient.invalidateQueries({ queryKey: ['arguments'] })
                setIsDisabled(false)
            }
        }
    )

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        toastId = toast.loading("Creating Argument", {id:toastId})
        setIsDisabled(true)
        setTitle("")
        mutate(title)
    }

    return (
        <form onSubmit={submit} className="bg-white rounded-md px-6 py-2 mt-12 mb-6" method="post">
            <div className="my-2">
                <label className="text-gray-700" htmlFor="">Argue:</label>
                <input disabled={isDisabled} className="bg-gray-200 my-3 w-full px-6 py-2 rounded-md" value={title} placeholder="What's on your mind?" type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="flex items-center my-2 justify-between">
                <button className="px-6 py-2 bg-teal-700 text-white text-sm font-bold rounded-md" type="submit">Argue</button>
                <h3>{ title.length }/100</h3>
            </div>
        </form>
    )
}