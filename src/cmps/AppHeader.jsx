import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaAirbnb } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { SearchBar } from './SearchBar'
import { LabelsSlider } from './LabelsSlider'
import { userService } from '../services/user/user.service.local'
import { SET_LOGGEDINUSER } from '../store/user.reducer'
import { initUsers } from '../store/user.actions'

export function AppHeader() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.userModule.loggedInUser)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 580)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    (async function initAndLoadUsers(){
      try {
        await initUsers()
        await loadLoggedInUser()
      } catch(err) {
          console.error('Cannot create or load users', err)
      }
    })()
  }, [])

  async function loadLoggedInUser(){
    const loggedInUser = await userService.getLoggedinUser()
    if (loggedInUser) {
      dispatch({type: SET_LOGGEDINUSER, user: loggedInUser})
    }
  }

  const shouldShowScrolledStyle = isScrolled || isSmallScreen

  return (
    <header
      className={`app-header ${
        shouldShowScrolledStyle ? 'scrolled' : ''
      }  full`}
    >
      <nav className=''>
        <NavLink to='/' className='logo'>
          <FaAirbnb />
          <span>flexbnb</span>
        </NavLink>
        <SearchBar isScrolled={shouldShowScrolledStyle} />
        {loggedInUser?.isAdmin && <NavLink to='/admin'>Admin</NavLink>}

        {!loggedInUser && (
          <NavLink to='login' className='login-link'>
            Login
          </NavLink>
        )}

        {loggedInUser && (
          <div className='user-info'>
            <Link to={`user/${loggedInUser._id}`}>
              {loggedInUser.imgUrl && <img src={loggedInUser.imgUrl} />}
              {/* {user.fullname} */}
            </Link>
            {/* <span className="score">{user.score?.toLocaleString()}</span> */}
            {/* <button onClick={onLogout}>logout</button> */}
          </div>
        )}
        {<LabelsSlider />}
      </nav>
    </header>
  )
}
