// React
import {useContext} from "react"

// Comp
import { Nav } from "../comp"

// Router
import { Navigate } from "react-router-dom";

//context
import UserContext from '../utils/UserContext'


export const Dashboard = () => {
    const { token, setToken } = useContext(UserContext)

    if (token === null) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Nav />
            <div className="flex justify-center items-center flex-grow">
                dashboard
            </div>
        </div>
    )
}
