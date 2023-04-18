// React
import { useContext, useEffect, useState } from "react"

// Comp
import { Nav, CourseCard } from "../comp"
import { MainLayout } from "../layout";

// Router
import { Navigate } from "react-router-dom";

//context
import UserContext from '../utils/UserContext'
import { myFetchGet } from "../utils/myFetch";


type courseType ={
    [key: string] : string
}

export const Dashboard = () => {
    const { token, setToken } = useContext(UserContext)
    const [courses, setCourses] = useState<courseType[]>([])

    const registeredCourses = [
        { name: "STC", code: "ASU113", location: "911" },
        { name: "Electronics", code: "ASU114", location: "254" }
    ]

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log((e.target as HTMLInputElement).getAttribute("data-code"))
        console.log((e.target as HTMLInputElement).dataset.code)
    }

    useEffect(() => {
        const getCourses = async () => {
            const res = await myFetchGet('/course', token)
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
            <div className="flex flex-col flex-grow w-full">
                <h1 className="text-2xl m-3">Dashboard</h1>
                <div className="w-full">
                    <h1 className="text-center mb-2">Registered Courses</h1>
                    {
                        registeredCourses.map(course => (
                            <CourseCard
                                key={course.code}
                                name={course.name}
                                code={course.code}
                                location={course.location}
                                handleClick={(e) => handleClick(e)}
                            />
                        ))
                    }
                </div>

                {/* Available Course */}
                <div className="w-full">
                    <h1 className="text-center mt-10 mb-2">Available Courses</h1>
                    {
                        courses.map((course: courseType) => (
                            <CourseCard
                                key={course.courseCode}
                                name={course.courseName}
                                code={course.courseCode}
                                location={course.location}
                                handleClick={(e) => handleClick(e)}
                            />

                        ))
                    }
                </div>
            </div>
        </MainLayout>
    )
}
