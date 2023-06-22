import { Link } from "react-router-dom"

type courseCardPropType = {
    name: String
    code: String
    location: String
    attendance?: String
    handleClick: React.MouseEventHandler<HTMLButtonElement>
    buttonText: String
}


export const CourseCard = ({ name, code, location, handleClick, buttonText, attendance: attendance }: courseCardPropType) => {
    return (
        <div className="relative flex justify-between items-center md:w-2/3 md:max-w-2xl px-3 py-2 mb-1 border border-slate-900 rounded-lg bg-slate-800 mx-auto">
            <div>
                <h2 className="text-xs">{code}</h2>
                <h1 className="text-xl">{name}</h1>
                <p className="text-pink-600 font-bold text-sm">Location: <span className="uppercase">{location}</span></p>
            </div>

            {attendance
                ? <Link to={`/attendance/${code}`}>
                    <div
                        className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-gray-200 text-sm font-bold tracking-wider px-4 py-2 hover:bg-slate-900 transition-all hover:border rounded-full border-pink-600"
                    >
                        Attendance:: <span className="text-green-500">{attendance}</span>
                    </div>
                </Link>
                : null
            }

            <button
                data-code={code}
                data-name={name}
                onClick={handleClick}
                className="rounded-full bg-slate-900 hover:bg-pink-600 px-3 py-1"
            >
                {buttonText}
            </button>
        </div>
    )
}
