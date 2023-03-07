import { useEffect, useState } from "react"
import ASULOGO from "../assets/asu-logo.png"
import { myFetchGet } from "../utils/myFetch";


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

    return (
        <nav className="text-gray-50 flex w-full justify-between items-center py-4 px-12">
            <img src={ASULOGO} className="w-14" alt="ASU_LOGO" />
            <img src={proPic} className="w-14" alt="jj" />
            <ul
                className="flex gap-3 child:font-semibold child:px-3.5 child:py-1.5 child:rounded-full 
                        child-hover:bg-sky-600 child-hover:bg-opacity-10 child-hover:outline child-hover:outline-1 child-hover:outline-sky-600"
            >
                <li><a href="/">Home</a></li>
                <li><a href="/upload-img">Upload Your Image</a></li>
                <li>Read More</li>
            </ul>
            <ul className="flex gap-3 child:font-semibold child:px-3.5 child:py-1.5 child:rounded-full child-hover:bg-sky-600">
                <li><a href="/login">Login</a></li>
                <li><a href="signup">Sign Up</a></li>
            </ul>
        </nav>
    )
}
