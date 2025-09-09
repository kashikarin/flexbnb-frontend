import { useSelector } from "react-redux"

export function UserMenuDropdown(){
  const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    return(
        <div ref={}> 
        {/* {isOpen && ( */}
          <div className=".user-menu-dropdown-container">
            {!loggedInUser && (
                <div className="user-menu-content-no-loggedinuser">
                    <span>Log in</span>
                    <span>Sign up</span>
                </div>
            )}
            {loggedInUser && (
                <div className="user-menu-content-with-loggedinuser">
                    <span>Log out</span>
                </div>
            )}
          </div>
        {/* )} */}
      </div>
    )
}