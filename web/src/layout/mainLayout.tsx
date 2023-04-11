import { ReactNode } from 'react'
import { Nav } from '../comp'

type mainLayoutPropTypes = {
    children: ReactNode
}
export const MainLayout = ({ children }: mainLayoutPropTypes) => {
    return (
        <>
            <Nav />
            <div className='flex justify-center h-screen pt-16'>
                {children}
            </div>
        </>
    )
}
