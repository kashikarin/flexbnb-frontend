import { FaAirbnb } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import { clearPotentialHome } from "../../store/actions/home-edit.actions"

export function HeaderHomeEdit(){
    return(
        <header className='home-edit-header' narrow-layout>
            <NavLink to='hosting' className='logo-black'>
                <FaAirbnb />
            </NavLink>
            <NavLink to='hosting' onClick={clearPotentialHome}>Exit without saving</NavLink>
        </header>
        
    )
}