import { useEffect, useState, useContext } from "react"
import ASULOGO from "../assets/asu-logo.png"
import genericProfile from "../assets/genericProfile.png"
import { myFetchGet } from "../utils/myFetch";

//icons
import { TbClearAll, TbMenu2 } from "react-icons/tb"

// NavLink 
import { NavLink, useNavigate } from "react-router-dom";

// UserContext
import UserContext from "../utils/UserContext";

export const Nav = () => {
    const [proPic, setProPic] = useState<string | null>("");
    const [hidden, setHidden] = useState<boolean>(true)
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
        { link: "/upload-img", text: "Your Image" },
        // { link: "/", text: "Read More" },
        { link: "/dashboard", text: "Dashboard" },
    ]

    const navLoginMenu = [
        { link: "/login", text: "Login" },
        { link: "/signup", text: "Sign Up" },
    ]

    return (
        <>
            <nav className="fixed top-0 right-0 w-full z-50 text-gray-50 bg-slate-900 flex justify-between items-center py-2 lg:px-8 px-4 shadow">
                <div className="flex gap-4 justify-center items-center">
                    <span className="md:hidden" onClick={() => { setHidden(!hidden) }}>
                        {
                            hidden
                                ? <TbMenu2 className="text-pink-600" size={30} />
                                : <TbClearAll className="text-pink-600" size={30} />
                        }
                    </span>
                    <img src={ASULOGO} className="w-12 bg-gray-300 rounded-full" alt="ASU_LOGO" />
                    <p className="hidden lg:block text-lg">Auto Attendance System</p>
                </div>
                <ul className="hidden md:flex gap-1 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
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
            <ul className={`fixed z-10 top-16 bg-slate-900 w-full shadow-lg ${hidden ? "hidden" : ""}`}>
                {
                    navMenu.map((item, id) => (<li key={id}>
                        <NavLink
                            className={`block font-semibold px-3.5 py-3 rounded-full`}
                            to={item.link}
                            style={({ isActive }) => isActive ? activeStyle : undefined}
                        >
                            {item.text}
                        </NavLink>
                        {/* <br /> */}
                    </li>))
                }
            </ul>
        </>
    )
}
