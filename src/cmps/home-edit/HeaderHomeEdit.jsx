import { FaAirbnb } from "react-icons/fa"
import { NavLink } from "react-router-dom"

export function HeaderHomeEdit(){

    return(
        <header className='home-edit-header'>
            <NavLink to='hosting' className='logo-black'>
                <FaAirbnb />
            </NavLink>
            <NavLink to='hosting'>Save & exit</NavLink>
        </header>
        
    )
}