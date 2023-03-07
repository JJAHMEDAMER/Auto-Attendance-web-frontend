import { useEffect } from "react";
import IMG from "../assets/home/smart-camps.svg"
import { Nav } from "../comp"

// utils
import { myFetchGet } from "../utils/myFetch";

export const Home = () => {

    useEffect(()=>{
        myFetchGet('')
    }, [])

    return <div className="min-h-screen flex flex-col">
        <Nav />
        <div className="flex-grow flex justify-center align-middle">
            <div className="flex justify-center align-middle max-w-5xl p-12 gap-16">
                <div className="flex flex-col align-middle justify-center gap-6 w-1/2 text-white">
                    <h1 className="font-bold text-5xl">Auto Attendance System</h1>
                    <p className="">This is main Way to register for the Auto Attendance System</p>
                    <button className="font-semibold text-lg p-2 bg-pink-600 rounded-full">Get Started!</button>
                </div>
                <img src={IMG} className="w-1/2" alt="Smart Camps Illustration" />
            </div>
        </div>
    </div>
}
