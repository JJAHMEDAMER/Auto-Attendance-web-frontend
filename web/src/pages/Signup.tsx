import { useContext, useState } from "react"
import { Button, Input, Nav } from "../comp"
import { myFetchPost } from "../utils/myFetch"

//User Context
import UserContext from "../utils/UserContext"

//Router
import {Navigate} from "react-router-dom" 

export const Signup = () => {
    
    const { token, setToken } = useContext(UserContext)

    const [formInputValues, setFormInputValues] = useState({
        name: "",
        email: "",
        password: "",
        collegeID: "",
    })

    const inputData = [{
        name: "email",
        placeholder: "Your Email",
        label: "Email",
        type: "email",
        value: formInputValues.email,
        error: false,
        errorMsg: "hello",
        onChange: handleFormInput,
    }, {
        name: "name",
        label: "Name",
        placeholder: "Your full name",
        value: formInputValues.name,
        error: false,
        errorMsg: "hello",
        onChange: handleFormInput,
    },
    {
        name: "collegeID",
        label: "College ID",
        placeholder: "Your Student ID",
        value: formInputValues.collegeID,
        error: false,
        errorMsg: "hello",
        onChange: handleFormInput,
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Your password",
        type: "password",
        value: formInputValues.password,
        error: false,
        errorMsg: "hello",
        onChange: handleFormInput,
    }
    ]

    function handleFormInput(e: React.ChangeEvent<HTMLInputElement>) {
        setFormInputValues({ ...formInputValues, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const res = await myFetchPost("/signup", formInputValues, token)
        setToken(res.access_token)
        localStorage.setItem("token", token!)
    }

    if (token) {
        return <Navigate to="/" />
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Nav />
            <div className="flex justify-center items-center flex-grow">
                <div className="sm:shadow-lg flex justify-center items-stretch sm:w-3/4 min-h-5/6 h-fit bg-slate-900 rounded-2xl">
                    <div className="flex flex-col gap-5 items-start justify-between p-6">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Create An Account</h1>
                            <p className="text-gray-500 font-semibold">Let's get started with your Account</p>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
                            {inputData.map((item, index) => (<Input key={index} {...item} />))}
                            <Button text={"Sign Up"} />
                        </form>
                        <p className="text-sm text-gray-400">Already have account? <a className="underline text-sky-500" href="/login">Log In</a></p>
                    </div>
                    <div className="w-2/4 hidden sm:block">
                        <img className="object-cover h-full  rounded-2xl" src="https://media.istockphoto.com/id/1264624897/photo/biometric-verification-and-face-detection.jpg?s=612x612&w=0&k=20&c=MEAfGJH_XZRqMoJNpfB0k8VoEhyVBx7AeSx0W6b0c_o=" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
