// React
import { useContext } from "react"

// Comp
import { Nav, CourseCard } from "../comp"
import { MainLayout } from "../layout";

// Router
import { Navigate } from "react-router-dom";

//context
import UserContext from '../utils/UserContext'


export const Dashboard = () => {
    const { token, setToken } = useContext(UserContext)

    const courses = [
        { name: "Graduation project", code: "ASU111", location: "hall 3" },
        { name: "Microwave", code: "ASU112", location: "hall A" }
    ]

    const registeredCourses = [
        { name: "STC", code: "ASU113", location: "911" },
        { name: "Electronics", code: "ASU114", location: "254" }
    ]

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log((e.target as HTMLInputElement).getAttribute("data-code"))
        console.log((e.target as HTMLInputElement).dataset.code)
    }


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
                <div className="w-full">
                    <h1 className="text-center mt-10 mb-2">Available Courses</h1>
                    {
                        courses.map(course => (
                            <CourseCard
                                key={course.code}
                                name={course.name}
                                code={course.code}
                                location={course.location}
                                handleClick={(e: any) => handleClick(e)}
                            />

                        ))
                    }
                </div>
            </div>
        </MainLayout>
    )
}
