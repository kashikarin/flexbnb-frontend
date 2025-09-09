import { useSelector } from 'react-redux'
import { ReactSVG } from 'react-svg'
useSelector
export function UserMenu(){
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    function openUserMenu(){

    }

    return(
        <div className='user-menu' onClick={openUserMenu}>
            <ReactSVG src="/svgs/user-menu-hamburger.svg" />
        </div>
    )
}