import { useEffect, useState, useContext } from "react"
import ASULOGO from "../assets/asu-logo.png"
import { myFetchGet } from "../utils/myFetch";

// NavLink 
import { NavLink, useNavigate } from "react-router-dom";

// UserContext
import UserContext from "../utils/UserContext";

export const Nav = () => {
    const [proPic, setProPic] = useState<string | null>("");
    const { token, setToken } = useContext(UserContext)

    const navigate = useNavigate()

    const logoutHandler = () => {
        setToken(null)
        setProPic(null)
        localStorage.setItem("profile Image", "")
        navigate("/")
    }

    useEffect(() => {

        const getProPic = async () => {
            if (!localStorage.getItem("profile Image") && token) {
                const imgList = await myFetchGet('imgs/', token)
                localStorage.setItem("profile Image", imgList[0].image)
                setProPic(imgList[0].image)
            } else {
                setProPic(localStorage.getItem("profile Image"))
            }

        }

        getProPic()

    }, [proPic])

    const activeStyle = {
        color: "rgb(219 39 119)",
        fontWeight: "bold"
    }

    return (
        <nav className="text-gray-50 flex w-full justify-between items-center py-4 px-12">
            <img src={ASULOGO} className="w-14" alt="ASU_LOGO" />
            <ul className="flex gap-3">
                <li>
                    <NavLink
                        className="font-semibold px-3.5 py-1.5 rounded-full hover:bg-sky-600 hover:bg-opacity-10 hover:outline hover:outline-1 hover:outline-sky-600"
                        to="/"
                        style={({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="font-semibold px-3.5 py-1.5 rounded-full hover:bg-sky-600 hover:bg-opacity-10 hover:outline hover:outline-1 hover:outline-sky-600"
                        to="/upload-img"
                        style={({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Upload Your Image
                    </NavLink>
                </li>
                <li>Read More</li>
            </ul>

            <ul className="flex gap-3">
                {
                    !token
                        ? <>
                            <li>
                                <NavLink
                                    to="/login"
                                    className="font-semibold px-3.5 py-1.5 rounded-full hover:bg-sky-600"
                                    style={({ isActive }) => isActive ? activeStyle : undefined}
                                >
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/signup"
                                    className="font-semibold px-3.5 py-1.5 rounded-full hover:bg-sky-600"
                                    style={({ isActive }) => isActive ? activeStyle : undefined}
                                >
                                    Sign Up
                                </NavLink>
                            </li>
                        </>
                        : <>
                            {proPic ? <img
                                src={proPic}
                                className="w-11 object-cover rounded-full border-2 border-sky-600"
                                alt="jj"
                            /> : null}
                            <button
                                onClick={logoutHandler}
                                className="font-semibold px-3.5 py-1.5 rounded-full hover:bg-sky-600"
                            >
                                Log Out
                            </button>
                        </>
                }
            </ul>

        </nav>
    )
}
