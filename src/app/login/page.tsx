'use client'
import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { authenticate } from "../lib/action";

export default function Login() {
    const [name, setname] = useState<string>('')
    const [password, setpassword] = useState<string>('')

    const submit = () => {
        const formata = { username: name, password: password }
        // console.log(formata);
        authenticate(formata)
    }

    return (
        <div className="pt-16 h-screen bg-[#637D63]">
            <div className="bg-white w-1/3 flex-col space-y-8 p-8 mx-auto border-2 rounded-lg">
                <h1 className="text-center text-xl text-gray-600">Login</h1>
                <TextField onChange={(e: ChangeEvent<HTMLInputElement>) => setname(e.target.value)}
                    className="w-full" size="small" type="text" label="Name" />
                <TextField onChange={(e: ChangeEvent<HTMLInputElement>) => setpassword(e.target.value)}
                    className="w-full" size="small" type="password" label="Password" />
                <Button onClick={submit} className="bg-[#A7CE3B] text-white w-full py-3">Login</Button>
            </div>
        </div>
    )
}