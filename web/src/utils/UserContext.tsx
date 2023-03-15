import { createContext, useEffect, useState } from "react";
import { myFetchGetToken } from "./myFetch";

type UserContextType = {
    token: string | null
    setToken: React.Dispatch<React.SetStateAction<string | null>>
}
const UserContext = createContext<UserContextType>({ token: null, setToken: () => { } });

type PropType = {
    children: JSX.Element[] | JSX.Element
}

const UserProvider = ({ children }: PropType) => {

    const [token, setToken] = useState<string | null>(localStorage.getItem("token")==="null"? null: localStorage.getItem("token"))

    useEffect(() => {
        const getUser = async () => {
            const {resJson, res} = await myFetchGetToken("/me", token)
            if (!res.ok){
                setToken(null)
                localStorage.setItem("profile Image", "")
            }
            localStorage.setItem("token", token? token: "null")
        }
        getUser()
    }, [token])

    return (
        <UserContext.Provider value={{ token, setToken }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
export { UserProvider }

