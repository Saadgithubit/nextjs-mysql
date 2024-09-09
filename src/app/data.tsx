'use client'

import { useEffect } from "react"

export default function UsersData() {
    useEffect(() => {
        const fetchData = () => {
            fetch('/api/users')
                .then(res => res.json())
                .then(res => console.log(res)
                )
        }

        fetchData()
    }, [])
    return (
        <div>All Users</div>
    )
}