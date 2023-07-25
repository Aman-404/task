import React from 'react'
import { NavBar } from './Navbar'

export const Base = ({children}) => {
    return (
        <div>
            <NavBar/>
        {children}
        </div>
    )
}
