'use client'

import { ChangeEvent, useEffect, useState } from "react"
import CancelIcon from '@mui/icons-material/Cancel';
import bcrypt from 'bcryptjs';

export default function UsersData() {
    const [isEdit, setisEdit] = useState(false)
    const [userData, setuserData] = useState([])
    const [message, setmessage] = useState('')
    const [editmessage, seteditmessage] = useState('')
    const [name, setname] = useState<string>('')
    const [email, setemail] = useState<string>('')
    const [password, setpassword] = useState<string>('')
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    useEffect(() => {
        const fetchData = async () => {
            const postData = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const res = await fetch(`${apiUrl}/api/users`, postData)
            const response = await res.json()
            // alert(response.message)
            setuserData(response.users)
        }

        fetchData()
    }, [])

    const submit = async () => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const postData = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Name: name,
                Email: email,
                Password: hashedPassword
            })
        }
        const res = await fetch(`${apiUrl}/api/users`, postData)
        const response = await res.json()
        setmessage(response.message)
        console.log(response);

    }

    const edit = async (userId: number) => {
        const id = userId
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const postData = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Name: name,
                Email: email,
                Password: hashedPassword
            })
        }
        const res = await fetch(`${apiUrl}/api/users/${id}`, postData)
        const response = await res.json()
        console.log(response);
        seteditmessage(response.message)
        setisEdit(false)


    }
    return (
        <div>
            <div className="flex justify-center items-start py-4 gap-6">
                <div className="w-1/3 space-y-4">
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setname(e.target.value)}
                        className="w-full border-2 p-4" placeholder="Name" type="text" />
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setemail(e.target.value)}
                        className="w-full border-2 p-4" placeholder="Email" type="email" />
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setpassword(e.target.value)}
                        className="w-full border-2 p-4" placeholder="Password" type="password" />
                    {message && <p>{message}</p>}
                </div>
                <button onClick={submit} className="bg-blue-500 text-white rounded-lg px-8 py-4">Add User</button>
            </div>
            {userData.length !== 0 ? <div>

                {userData.map((item) => {
                    const { User_id, Name, Email, Password } = item
                    return (
                        <div key={User_id} className="w-1/2 mx-auto p-3 border-2 space-y-3 my-3">
                            <div className="flex items-center">
                                <h1 className="text-xl font-bold">ID:</h1>
                                <p>{User_id}</p>
                            </div>
                            <div className="flex items-center">
                                <h1 className="text-xl font-bold">UserName:</h1>
                                <p>{Name}</p>
                            </div>
                            <div className="flex items-center">
                                <h1 className="text-xl font-bold">Email:</h1>
                                <p>{Email}</p>
                            </div>
                            <div className="flex items-center">
                                <h1 className="text-xl font-bold">Password:</h1>
                                <p>{Password}</p>
                            </div>
                            {isEdit === User_id && <div className="space-y-3 border-2 p-4 relative">
                                <button onClick={() => setisEdit(false)} className="absolute top-3 right-3">
                                    <CancelIcon />
                                </button>
                                <h1 className="text-center text-xl text-gray-500">Edit User</h1>
                                <input
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setname(e.target.value)}
                                    type="text" placeholder="Name" className="border-2 p-4 w-full" />
                                <input
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setemail(e.target.value)}
                                    type="text" placeholder="Email" className="border-2 p-4 w-full" />
                                <input
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setpassword(e.target.value)}
                                    type="text" placeholder="Password" className="border-2 p-4 w-full" />

                                <button onClick={() => edit(User_id)} className="bg-blue-400 text-white px-12 py-2">Submit</button>
                            </div>}
                            <div className="flex justify-center gap-8">
                                {editmessage && <p>{editmessage}</p>}
                                <button onClick={() => setisEdit(User_id)} className="bg-green-400 text-white px-8 py-2">Edit</button>
                                <button className="bg-gray-500 text-white px-8 py-2">Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div> : <div className="w-1/2 mx-auto">Loading.....</div>}

        </div>
    )
}