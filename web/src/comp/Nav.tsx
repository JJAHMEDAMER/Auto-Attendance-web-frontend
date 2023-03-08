import { useEffect, useState } from "react"
import ASULOGO from "../assets/asu-logo.png"
import { myFetchGet } from "../utils/myFetch";

// NavLink 
import { NavLink } from "react-router-dom";


export const Nav = () => {
    const [proPic, setProPic] = useState("");

    useEffect(() => {

        const getProPic = async () => {
            const imgList = await myFetchGet('imgs/')
            setProPic(imgList[0].image)
        }
        console.log("useEffect")
        getProPic()

    }, [proPic])

    const activeStyle = {
        color: "rgb(219 39 119)",
        fontWeight: "bold"
    }
    return (
        <nav className="text-gray-50 flex w-full justify-between items-center py-4 px-12">
            <img src={ASULOGO} className="w-14" alt="ASU_LOGO" />
            <img src={proPic} className="w-14" alt="jj" />
            <ul
                className="flex gap-3 child:font-semibold child:px-3.5 child:py-1.5 child:rounded-full 
                        child-hover:bg-sky-600 child-hover:bg-opacity-10 child-hover:outline child-hover:outline-1 child-hover:outline-sky-600"
            >
                <li>
                    <NavLink
                        to="/"
                        style={({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Home
                    </NavLink>
                </li>
                <li><NavLink
                    to="/upload-img"
                    style={({ isActive }) => isActive ? activeStyle : undefined}
                >
                    Upload Your Image
                </NavLink>
                </li>
                <li>Read More</li>
            </ul>
            <ul className="flex gap-3 child:font-semibold child:px-3.5 child:py-1.5 child:rounded-full child-hover:bg-sky-600">
                <li>
                    <NavLink
                        to="/login"
                        style={({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/signup"
                        style={({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Sign Up
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
