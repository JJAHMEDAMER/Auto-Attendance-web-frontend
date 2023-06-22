import { useParams } from 'react-router-dom'

export const Attendance = () => {
    const { courseCode } = useParams()
    return (
        <div>Attendance: {courseCode}</div>
    )
}
