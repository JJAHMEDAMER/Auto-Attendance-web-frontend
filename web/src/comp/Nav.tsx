import { useEffect, useState, useContext } from "react"
import ASULOGO from "../assets/asu-logo.png"
import genericProfile from "../assets/genericProfile.png"
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
        localStorage.setItem("token", "null")
        navigate("/")
    }

    useEffect(() => {

        const getProPic = async () => {
            if (!localStorage.getItem("profile Image") && token) {
                const navImage = await myFetchGet('/imgs', token)
                if (navImage) {
                    localStorage.setItem("profile Image", navImage.image)
                    setProPic(navImage.image)
                }
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

    const navMenu = [
        { link: "/", text: "Home" },
        { link: "/upload-img", text: "Upload Your Image" },
        // { link: "/", text: "Read More" },
        { link: "/dashboard", text: "Dashboard" },
    ]

    const navLoginMenu = [
        { link: "/login", text: "Login" },
        { link: "/signup", text: "Sign Up" },
    ]

    return (
        <nav className="text-gray-50 bg-slate-900 flex w-full justify-between items-center py-2 px-8 shadow">
            <img src={ASULOGO} className="w-12 bg-gray-300 rounded-full" alt="ASU_LOGO" />
            <ul className="flex gap-1">
                {
                    navMenu.map((item, id) => (<li key={id}>
                        <NavLink
                            className="font-semibold px-3.5 py-1.5 rounded-full hover:bg-sky-600 hover:bg-opacity-10 hover:outline hover:outline-1 hover:outline-sky-600"
                            to={item.link}
                            style={({ isActive }) => isActive ? activeStyle : undefined}
                        >
                            {item.text}
                        </NavLink>
                    </li>))
                }
            </ul>

            <ul className="flex gap-1">
                {
                    !token
                        ? <>
                            {
                                navLoginMenu.map((item, index) => (<li key={index}>
                                    <NavLink
                                        to={item.link}
                                        className="font-semibold px-3.5 py-1.5 rounded-full hover:bg-sky-600"
                                        style={({ isActive }) => isActive ? activeStyle : undefined}
                                    >
                                        {item.text}
                                    </NavLink>
                                </li>
                                ))
                            }
                        </>
                        : <>
                            <img
                                src={proPic ? proPic : genericProfile}
                                className="w-10 h-10 object-cover rounded-full border-2 border-sky-600"
                                alt="genericProfile"
                            />
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
