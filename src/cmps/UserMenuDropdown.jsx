export function UserMenuDropdown({loggedInUser, isOpen, onOpen, UserMenuDropdownRef, onClose}){
  
  function handleClick(ev) {
    console.log("🚀 ~ ev:", ev)
    onClose()
  }

    return(
        isOpen && (<div className='user-menu-dropdown-container'>
            <div className="user-menu-content-no-loggedinuser">
                    <span onClick={handleClick}>Log in</span>
                    <span onClick={handleClick}>Sign up</span>
            </div>
          </div>)
    )
}