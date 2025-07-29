import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaAirbnb } from 'react-icons/fa'
import { useEffect, useState, useContext } from 'react'
import { SearchBar } from './SearchBar'
import { LabelsSlider } from './LabelsSlider'
import { userService } from '../services/user/user.service.local'
import { SET_LOGGEDINUSER } from '../store/user.reducer'
import { initUsers } from '../store/user.actions'
import { ScrollContext } from '../context/ScrollContext'
import { AppHeaderHomeDetails } from './AppHeaderHomeDetails'
import { AppHeaderHomeEdit } from './AppHeaderHomeEdit'

export function AppHeader() {
  const dispatch = useDispatch()
  const location = useLocation()
  const isHomeIndex = location.pathname === '/'
  const isHosting = location.pathname.startsWith('/hosting')
  const isHomeEdit = location.pathname === '/hosting/edit'
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
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
    (async function initAndLoadData() {
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
    <header className='app-header'>
      {isImgScrolledPast && <AppHeaderHomeDetails />} 
      {isHomeEdit && <AppHeaderHomeEdit />}
      {(!isImgScrolledPast && !isHomeEdit) && (<div className={`app-header-main-container ${shouldShowScrolledStyle ? 'scrolled' : 'expanded'}`}>
          <div className="layout-wrapper">
            <nav className="app-header-main-nav">
              <div className="app-header-left-section">
                <NavLink to='/' className='logo'>
                  <FaAirbnb />
                  <span>flexbnb</span>
                </NavLink>
              </div>
              <div className={`app-header-mid-section ${shouldShowScrolledStyle ? 'scrolled' : 'expanded'}`}>
                {isHosting ? 
                  (<nav className='hosting-header-nav'>
                    <NavLink to='/hosting/edit'>Create a new listing</NavLink>
                    <NavLink to='/hosting/reservations/'>Reservations</NavLink>
                  </nav>)
                    :
                  <div className={`searchbar-wrapper ${isScrolled ? '' : 'expanded'}`}>
                    <SearchBar isScrolled={shouldShowScrolledStyle} />
                  </div>}
              </div>
              <div className="app-header-right-section">
                <Link to={isHosting ? '/' : '/hosting'}>{isHosting ? 'Switch to traveling' : 'Switch to hosting'}</Link>
                {loggedInUser && (
                    <div className='user-info'>
                      <Link to={`user/${loggedInUser._id}`}>
                        {loggedInUser.imgUrl && <img src={loggedInUser.imgUrl} />}
                      </Link>
                    </div>
                  )}
              </div>
          </nav>
        
          {isHomeIndex && <LabelsSlider isScrolled={isScrolled}/>}
          </div>
        </div>)}
    </header>
    )
}
