import { FaAirbnb } from "react-icons/fa"
import { NavLink } from "react-router-dom"

export function AppHeaderHomeEdit(){

    return(
        <header className='home-edit-header full'>
            <NavLink to='hosting' className='hosting-logo'>
                <FaAirbnb />
            </NavLink>
            <NavLink to='hosting'>Save & exit</NavLink>
        </header>
        
    )
}