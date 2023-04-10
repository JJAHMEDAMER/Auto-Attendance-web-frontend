import { Nav } from "../comp"

export const Dashboard = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Nav />
            <div className="flex justify-center items-center flex-grow">
                dashboard
            </div>
        </div>
    )
}
