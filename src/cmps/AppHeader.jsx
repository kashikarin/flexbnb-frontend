import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaAirbnb } from 'react-icons/fa'
import { useEffect, useState, useContext } from 'react'
import { SearchBar } from './SearchBar'
import { LabelsSlider } from './LabelsSlider'
import { userService } from '../services/user/user.service.local'
import { SET_LOGGEDINUSER } from '../store/user.reducer'
import { initUsers } from '../store/user.actions'
import { orderService } from '../services/order/order.service.local'
import { loadOrders } from '../store/order.actions'
import { ScrollContext } from '../context/ScrollContext'
import { AppHeaderHomeDetails } from './AppHeaderHomeDetails'
// import { orderService } from '../services/order/order.service.local'

export function AppHeader() {
  const dispatch = useDispatch()
  const location = useLocation()
  const isHomeIndex = location.pathname === '/'
  const isHosting = location.pathname.startsWith('/hosting')
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const orders = useSelector((state) => state.orderModule.orders)
  const {isImgScrolledPast, isStickyScrolledPast} = useContext(ScrollContext)


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
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    ;(async function initAndLoadData() {
      try {
        await initUsers()
        // await loadOrders()
        await loadLoggedInUser()
      } catch (err) {
        console.error('Cannot create or load data', err)
      }
    })()
  }, [])

  async function loadLoggedInUser() {
    const loggedInUser = await userService.getLoggedinUser()
    if (loggedInUser) {
      dispatch({ type: SET_LOGGEDINUSER, user: loggedInUser })
    }
  }

  const shouldShowScrolledStyle = isScrolled || isSmallScreen || !isHomeIndex

  return (
    <header
      className={`app-header ${
        shouldShowScrolledStyle ? 'scrolled' : ''
      }  full`}
    >
      {isImgScrolledPast ? 
      <AppHeaderHomeDetails /> 
      :
      (<nav className='app-header-main-nav'>
        <NavLink to='/' className='logo'>
          <FaAirbnb />
          <span>flexbnb</span>
        </NavLink>
        {isHosting ? 
          (<nav className='hosting-header-nav'>
            <NavLink to='/hosting/edit'>Create a new listing</NavLink>
            <NavLink to='/hosting/reservations/'>Reservations</NavLink>
          </nav>)
          :
          <SearchBar isScrolled={shouldShowScrolledStyle} />}
        <div className='app-header-user-area'>
          <Link to={isHosting ? '/' : '/hosting'}>{isHosting ? 'Switch to traveling' : 'Switch to hosting'}</Link>
          {/* {loggedInUser?.isAdmin && <NavLink to='/admin'>Admin</NavLink>}

          {!loggedInUser && (
            <NavLink to='login' className='login-link'>
              Login
            </NavLink>
          )} */}

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
        </div>
        
        {<LabelsSlider />}
      </nav>)}
    </header>
  )
}
