import { MainLayout } from '../layout'
import { useParams } from 'react-router-dom'

export const Attendance = () => {
    const { courseCode } = useParams()

    return (
        <MainLayout>
            <div className='w-full px-5'>
                <h1 className='text-2xl m-3'>Attendance For {courseCode}</h1>
            </div>
        </MainLayout>
    )
}
