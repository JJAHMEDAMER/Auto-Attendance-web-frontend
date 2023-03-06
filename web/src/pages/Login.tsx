import { useState } from "react"
import { Button, Input, Nav } from "../comp"

export const Login = () => {
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
        const URL = "http://127.0.0.1:8000/login/"
        const res = await fetch(URL, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formInputValue)
        })

        const resObj = await res.json()
        console.log(resObj)
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
    console.log(formInputValue)
    console.log(formInputValueError)

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Nav />
            <div className="flex justify-center items-center flex-grow">
                <div className="shadow-lg flex justify-between items-stretch max-w-2xl min-h-fit h-5/6 mx-10 bg-slate-900 rounded-2xl">
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
                            <Button text={"Login"} />
                        </form>
                        <p className="text-sm text-gray-400">Don't Have an Account? <a className="underline text-sky-500" href="/signup">Sign Up</a></p>
                    </div>
                    <div className="max-w-1/2 w-2/5 ">
                        <img className="object-cover h-full  rounded-2xl" src="https://media.istockphoto.com/id/1264624897/photo/biometric-verification-and-face-detection.jpg?s=612x612&w=0&k=20&c=MEAfGJH_XZRqMoJNpfB0k8VoEhyVBx7AeSx0W6b0c_o=" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
