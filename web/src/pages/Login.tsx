import { useState, useContext, useEffect } from "react"
import { Button, Input, Nav } from "../comp"
import { myFetchPost } from "../utils/myFetch"

// User Context
import UserContext from "../utils/UserContext"

// Router
import {Link, Navigate } from "react-router-dom"

export const Login = () => {

    const { token, setToken } = useContext(UserContext)

    const [error, setError] = useState<string | null>(null)
    const [formInputValue, setFormInputValue] = useState({
        email: "",
        password: "",
        collegeID: "",
    })

    const [formInputValueError, setFormInputValueError] = useState({
        email: false,
        password: false,
        collegeID: false,
    })

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const res = await myFetchPost(
            '/login',
            {
                email: formInputValue.email,
                password: formInputValue.password
            },
            token
        )

        if (res.access_token) {
            setToken(res.access_token)
            localStorage.setItem("token", res.access_token)
        }else {
            setError(res.detail)
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormInputValue({ ...formInputValue, [e.target.name]: e.target.value })

        // let pattern
        // if (e.target.name === "email") {
        //     pattern = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        // } else if (e.target.name === "password") {
        //     pattern = new RegExp('^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$');
        // } else if (e.target.name === "collegeID") {
        //     pattern = new RegExp('^([A-Z0-9]{6})\d$');
        // }

        // if (pattern?.test(e.target.value) || e.target.value === "") {
        //     setFormInputValueError({ ...formInputValueError, [e.target.name]: false })
        // } else {
        //     setFormInputValueError({ ...formInputValueError, [e.target.name]: true })
        // }
    }

    useEffect(()=>{
        const time = setTimeout(() => {
            setError(null)
        }, 3000)

        return () => {
            clearTimeout(time)
        }
    }, [error])

    if (token) {
        return <Navigate to="/dashboard" />
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Nav />
            <div className="flex justify-center items-center flex-grow">
                <div className="md:shadow-lg flex justify-center items-stretch md:w-3/4 min-h-5/6 h-fit bg-slate-900 rounded-2xl">
                    <div className="flex flex-col items-start justify-between p-6">
                        <div>
                            <h1 className="mb-2 text-4xl font-bold">Enter Your Account</h1>
                            <p className="text-gray-500 font-semibold">Let's get into your Account</p>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                            <Input
                                label={"Email"}
                                placeholder={"Your Email"}
                                type={"email"}
                                name={"email"}
                                value={formInputValue.email}
                                onChange={handleChange}
                                required
                                error={formInputValueError.email}
                                errorMsg={"Enter a valid email"}
                            />
                            <Input
                                label={"Password"}
                                placeholder={"your Password"}
                                type={"password"}
                                name={"password"} // just like in the state object
                                value={formInputValue.password}
                                onChange={handleChange}
                                required
                                error={formInputValueError.password}
                                errorMsg={"Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"}
                            />
                            <Input
                                label={"College ID"}
                                placeholder={"your ID"}
                                name={"collegeID"} // just like in the state object
                                value={formInputValue.collegeID}
                                onChange={handleChange}
                                error={formInputValueError.collegeID}
                                errorMsg={"password must contain at least 1 letter, 1 number and 1 special character"}
                            />
                            <p className="text-center text-red-500 text-sm h-2">{error}</p>
                            <Button text={"Login"} />
                        </form>
                        <p className="text-sm text-gray-400">Don't Have an Account? <Link className="underline text-sky-500" to="/signup">Sign Up</Link></p>
                    </div>
                    <div className="max-w-1/2 w-2/5 hidden md:block">
                        <img className="object-cover h-full  rounded-2xl" src="https://media.istockphoto.com/id/1264624897/photo/biometric-verification-and-face-detection.jpg?s=612x612&w=0&k=20&c=MEAfGJH_XZRqMoJNpfB0k8VoEhyVBx7AeSx0W6b0c_o=" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
