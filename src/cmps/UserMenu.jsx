import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ReactSVG } from 'react-svg'
import { UserMenuDropdown } from './UserMenuDropdown'

export function UserMenu(){
    const [openedDropdown, setOpenedDropdown] = useState(false)
    const userMenuDropdownRef = useRef()
    const userMenuRef = useRef()
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    
    function onUserMenuClick(){
        setOpenedDropdown(prev => prev === true? false : true)
    }

    
    useEffect(() => {
        // Close dropdown when clicking outside
        function handleClickOutside(event) {
          if (openedDropdown &&
            !userMenuDropdownRef.current.contains(event.target) && 
            !userMenuRef.current.contains(event.target)) {
                setOpenedDropdown(false)
          }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }, [openedDropdown])

    return(
        <>
            <div className='user-menu' ref={userMenuRef} onClick={onUserMenuClick}>
                <ReactSVG src="/svgs/user-menu-hamburger.svg" />
            </div>
            <div className="user-menu-dropdown-wrapper" ref={userMenuDropdownRef}>
                <UserMenuDropdown
                    loggedInUser={loggedInUser}
                    isOpen={openedDropdown}
                    onOpen={() => setOpenedDropdown(true)}
                    userMenuDropdownRef={userMenuDropdownRef}
                    onClose={() => setOpenedDropdown(false)}
                />
            </div>
        </>
    )
}