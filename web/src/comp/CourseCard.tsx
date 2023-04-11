type courseCardPropType = {
    name: String
    code: String
    location: String
    handleClick: React.MouseEventHandler<HTMLButtonElement>
}


export const CourseCard = ({ name, code, location, handleClick }: courseCardPropType) => {
    return (
        <div className="flex justify-between items-center w-2/3 max-w-2xl px-3 py-2 mb-1 border border-slate-900 rounded-lg bg-slate-800 mx-auto">
            <div>
                <h2 className="text-xs">{code}</h2>
                <h1 className="text-xl">{name}</h1>
                <p className="text-pink-600 font-bold text-sm">Location: <span className="uppercase">{location}</span></p>
            </div>
            <button
                data-code={code}
                data-name={name}
                onClick={handleClick}
                className="rounded-full bg-slate-900 hover:bg-pink-600 px-2 py-1"
            >
                Register
            </button>
        </div>
    )
}
