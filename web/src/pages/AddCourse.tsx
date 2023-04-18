import { MainLayout } from "../layout"

// Form
import * as Yup from "yup"
import { useFormik } from "formik"

//fetch
import { myFetchDelete, myFetchGet, myFetchPost } from "../utils/myFetch"

//Context
import UserContext from "../utils/UserContext"
import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { CourseCard } from "../comp"

type courseType = {
    [key: string]: string
}

export const AddCourse = () => {

    const {token} = useContext(UserContext)
    const [courses, setCourses] = useState<courseType[]>([])

    const validationSchema = Yup.object({
        courseName: Yup.string().required('Required'),
        courseCode: Yup.string().required('Required').length(6, "Must be 6 Chars"),
        location: Yup.string().required('Required'),

    })

    const initialValue = {
        courseName: "",
        courseCode: "",
        location: ""
    }

    const handleSubmit = async (value: object) => {
        const res = await myFetchPost('/course', formik.values, token) 
        setCourses(res)
    }

    const formik = useFormik({
        initialValues: initialValue,
        onSubmit: handleSubmit,
        validationSchema,
    })


    const my_form = [
        {
            label: "Course Name",
            type: "text",
            name: "courseName",
            onchange: formik.handleChange,
            value: formik.values.courseName,
            error: formik.errors.courseName,
            onBlur: formik.handleBlur,
            touched: formik.touched.courseName
        },
        {
            label: "Course Code",
            type: "text",
            name: "courseCode",
            onchange: formik.handleChange,
            value: formik.values.courseCode,
            error: formik.errors.courseCode,
            onBlur: formik.handleBlur,
            touched: formik.touched.courseCode
        },
        // {
        //     label: "Location",
        //     type: "text",
        //     name: "location",
        //     onchange: formik.handleChange,
        //     value: formik.values.location,
        //     error: formik.errors.location,
        //     onBlur: formik.handleBlur,
        //     touched: formik.touched.location
        // }
    ]

    async function deleteCourse(e: React.MouseEvent<HTMLButtonElement>){
        const res = await myFetchDelete('/course', {
            courseCode: (e.target as HTMLInputElement).dataset.code
        }, token)

        setCourses(res)
    }

    useEffect(()=>{
        const getCourses = async () => {
            const res = await myFetchGet("/course", token)
            console.log(res)
            setCourses(res)
        }

        getCourses()
    }, [])

    if (token === null) {
        return <Navigate to="/login" replace />;
    }

    return (
        <MainLayout>
            <div className="w-full">
                <h1 className="text-4xl m-2">Add Courses</h1>
                <form className="flex flex-col gap-3 w-1/2 bg-slate-900 p-5 rounded-2xl mx-auto" onSubmit={formik.handleSubmit}>
                    {
                        my_form.map((item, index) => <label
                            key={index}
                            className="flex flex-col text-lg"
                        >
                            {item.label}
                            <input
                                className="rounded-full px-4 py-1 text-sm bg-slate-800 outline-none border-2 border-slate-900
                                focus:border-pink-600 focus:outline-none focus:bg-slate-900"
                                name={item.name}
                                // type={item.type}
                                type="select"
                                value={item.value}
                                onChange={item.onchange}
                                onBlur={item.onBlur}
                            />
                            {item.error && item.touched
                                ? <p className="text-red-500 text-xs">{item.error}</p>
                                : null}
                        </label>)
                    }
                    <label>
                        <div className="flex gap-3 text-lg">
                            <p>Location</p>
                            <select
                                value={formik.values.location}
                                onChange={formik.handleChange}
                                name="location"
                                className="flex-1 rounded-full px-4 py-1 text-sm bg-slate-800 outline-none border-2 border-slate-900
                                focus:border-pink-600 focus:outline-none focus:bg-slate-900"
                            >
                                <option className="text-gray-300" value="">Select Hall Number</option>
                                <option value="Hall A">Hall A</option>
                                <option value="Hall B">Hall B</option>
                                <option value="Hall C">Hall C</option>
                                <option value="Hall D">Hall D</option>
                            </select>
                        </div>
                        {formik.errors.location && formik.touched.location
                            ? <p className="text-red-500 text-xs">{formik.errors.location}</p>
                            : null}
                    </label>
                    <button type="submit" className="bg-pink-600 w-fit mt-2 px-3 py-1 rounded-full">Add Course</button>
                </form>
                <div>
                    <p>ALL Courses</p>
                    {
                        courses.map((course, index)=>(
                            <CourseCard 
                            key={course.courseCode}
                            name={course.courseName}
                            code={course.courseCode}
                            location={course.location}
                            handleClick={(e) => deleteCourse(e)}
                            buttonText="Delete"
                            />
                        ))
                    }
                </div>
            </div>
        </MainLayout>
    )
}
