import { MainLayout } from '../layout'
import { useParams } from 'react-router-dom'

export const Attendance = () => {
    const { courseCode } = useParams()

    const atten = [
        { date: "12/12/12", attendance: "Attended" },
        { date: "12/12/12", attendance: "Attended" },
        { date: "12/12/12", attendance: "Attended" },
    ]
    return (
        <MainLayout>
            <div className='w-full px-5'>
                <h1 className='text-2xl m-3'>Attendance For {courseCode}</h1>
                <div className='overflow-x-auto rounded-2xl'>
                    <table className='text-center w-full border-2 border-slate-900 rounded-2xl'>
                        <thead>
                            <tr className='text-xl uppercase child:py-2 bg-slate-900'>
                                <th className='w-1/12'>#</th>
                                <th className='w-5/12'>Date</th>
                                <th className='w-6/12'>Attendance</th>
                            </tr>
                        </thead>
                        <tbody className='[&>*:nth-child(even)]:bg-slate-700 child-hover:text-pink-600 child:transition-all'>
                            {
                                atten.map((item, id) =>
                                    <tr className='border-b border-slate-900'>
                                        <td>{id}</td>
                                        <td>{item.date}</td>
                                        <td>{item.attendance}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    )
}
