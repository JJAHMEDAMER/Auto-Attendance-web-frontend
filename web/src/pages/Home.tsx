import { useEffect, useContext } from "react";
import IMG from "../assets/home/smart-camps.svg"
import { Nav } from "../comp"

// utils
import { myFetchGet } from "../utils/myFetch";

// User Context
import UserContext from "../utils/UserContext"

// Router
import { useNavigate } from "react-router-dom";

export const Home = () => {

    const {token, setToken} = useContext(UserContext)
    const navigate = useNavigate()

    const handleGetStarted = ()=>{
        if(token){
            navigate("/")
        }else{
            navigate("/login")
        }
    }

    useEffect(() => {
        myFetchGet('', token)
    }, [])

    return <div className="min-h-screen flex flex-col">
        <Nav />
        <div className="flex-grow flex justify-center align-middle">
            <div className="flex justify-center align-middle max-w-5xl p-12 gap-16">
                <div className="flex flex-col align-middle justify-center gap-6 w-1/2 text-white">
                    <h1 className="font-bold text-5xl">Auto Attendance System</h1>
                    <p className="">This is main Way to register for the Auto Attendance System</p>
                    <button onClick={handleGetStarted} className="font-semibold text-lg p-2 bg-pink-600 rounded-full">Get Started!</button>
                </div>
                <img src={IMG} className="w-1/2" alt="Smart Camps Illustration" />
            </div>
        </div>
    </div>
}
