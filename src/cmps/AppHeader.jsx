import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { initDemoUser } from '../store/user.actions'
import { FaAirbnb } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { SearchBar } from './SearchBar'
import { LabelsSlider } from './LabelsSlider'
import { userService } from '../services/user/user.service.local'
import { storageService } from '../services/async-storage.service'
import { SET_USER } from '../store/user.reducer'


export function AppHeader() {
  const dispatch = useDispatch()
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()
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
    loadLoggedInUser()
  }, [])

  async function loadLoggedInUser(){
    const loggedInUser = await userService.getLoggedinUser()
    if (loggedInUser) {
      dispatch({type: SET_USER, user: loggedInUser})
    } else{
      await initDemoUser()
    }

  }

  const shouldShowScrolledStyle = isScrolled || isSmallScreen

  async function onLogout() {
    try {
      await logout()
      navigate('/')
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

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
        {user?.isAdmin && <NavLink to='/admin'>Admin</NavLink>}

        {!user && (
          <NavLink to='login' className='login-link'>
            Login
          </NavLink>
        )}

        {user && (
          <div className='user-info'>
            <Link to={`user/${user._id}`}>
              {user.imgUrl && <img src={user.imgUrl} />}
              {/* {user.fullname} */}
            </Link>
            {/* <span className="score">{user.score?.toLocaleString()}</span> */}
            {/* <button onClick={onLogout}>logout</button> */}
          </div>
        )}
        {/* {<LabelsSlider />} */}
      </nav>
    </header>
  )
}
