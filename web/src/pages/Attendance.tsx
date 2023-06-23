//React 
import { useContext, useEffect, useState } from "react"

//context
import UserContext from "../utils/UserContext"

// Lay Out
import { MainLayout } from '../layout'
import { Navigate, useParams } from 'react-router-dom'
import { myFetchGet } from "../utils/myFetch"

type resType = {
    [key: string]: string
}

export const Attendance = () => {
    const { courseCode } = useParams()

    const { token } = useContext(UserContext)
    const [attendance, setAttendance] = useState<resType[]>([])

    useEffect(() => {
        const getAttendance = async () => {
            const res = await myFetchGet(`/attendance/all/?courseCode=${courseCode}`, token)
            setAttendance(res)
            console.log(res)
        }
        getAttendance()
    }, [])

    console.log(attendance[0])
    if (!token) return <Navigate to="/login" replace />;
    return (
        <MainLayout>
            <div className='w-full px-2 md:px-7 md:w-2/3'>
                <h1 className='text-2xl m-3'>Attendance For {courseCode}</h1>
                <div className='overflow-x-auto rounded-2xl'>
                    <table className='text-center w-full border-2 border-slate-900 rounded-2xl'>
                        <thead>
                            <tr className='lg:text-xl text-sm uppercase child:py-2 bg-slate-900'>
                                <th className='w-1/12'>#</th>
                                <th className='w-4/12'>Date</th>
                                <th className='w-3/12'>Score</th>
                                <th className='w-4/12'>Attendance</th>
                            </tr>
                        </thead>
                        <tbody className='[&>*:nth-child(even)]:bg-slate-700 child-hover:text-pink-600 child:transition-all'>
                            {
                                attendance.map((item, id) => (
                                    <tr key={id} className={`border-b border-slate-900 child:py-2`}>
                                        <td>{id}</td>
                                        <td>{item.date}</td>
                                        <td>{item.attendanceScore}</td>
                                        <td className={`font-semibold ${item.attendance.toLowerCase() === "absent" ? "text-red-700 " : "text-green-500"}`}>{item.attendance}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    )
}
