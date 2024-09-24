import { addUser, getAllUsers } from "./lib/action"
import UserRegister from "./register"

export default async function AllUSers () {
    const getUsers = await getAllUsers()
    const users = getUsers.users

    return(
        <div>
            <UserRegister/>
      {users && <div>
           {users.map((item) => {
               const { id, name } = item
               return (
                   <div key={id} className="w-1/2 mx-auto p-3 border-2 space-y-3 my-3">
                            <div className="flex items-center">
                                <h1 className="text-xl font-bold">ID:</h1>
                                <p>{id}</p>
                            </div>
                            <div className="flex items-center">
                                <h1 className="text-xl font-bold">UserName:</h1>
                                <p>{name}</p>
                            </div>
                        </div>
                    )
                })}  
        </div>}
                </div>
    )
}