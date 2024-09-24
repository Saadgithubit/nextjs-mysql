'use client'

import { ChangeEvent, useState } from "react"
import { addUser } from "./lib/action"

export default function UserRegister () {
    const [message, setmessage] = useState('')
    const [name, setname] = useState<string>('')

    const submit = async() => {
const response = await addUser(name)
if(response?.status === 200){
setmessage('User add Successfull')
}else{
    setmessage('Some Thing Wrong')
}
    }
    return (
        <div className="flex justify-center items-start py-4 gap-6">
                <div className="w-1/3 space-y-4">
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setname(e.target.value)}
                        className="w-full border-2 p-4" placeholder="Name" type="text" />
                    {message && <p>{message}</p>}
                </div>
                <button onClick={submit} className="bg-blue-500 text-white rounded-lg px-8 py-4">Add User</button>
            </div>
    )
}