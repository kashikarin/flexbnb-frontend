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
import { HeaderHomeDetails } from './HeaderHomeDetails'
import { HeaderHomeEdit } from './home-edit/HeaderHomeEdit'

export function AppHeader({scrollContainerRef}) {
  const dispatch = useDispatch()
  const location = useLocation()
  const {isScrolled, setIsScrolled} = useContext(ScrollContext)
  const isHomeIndex = location.pathname === '/'
  const isHosting = location.pathname.startsWith('/hosting')
  const isHomeEdit = location.pathname === '/hosting/edit'
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const {isImgScrolledPast, isStickyScrolledPast} = useContext(ScrollContext)


  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 580)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const elMain = scrollContainerRef.current
    if (!elMain) return
    const handleScroll = () => setIsScrolled(elMain.scrollTop > 20)
    elMain.addEventListener('scroll', handleScroll)
    return () => elMain.removeEventListener('scroll', handleScroll)
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
  useEffect(()=>{
    if (!isHomeIndex || isSmallScreen) setIsScrolled(true)
  }, [isSmallScreen, isHomeIndex])

const shouldCollapse = isScrolled || !isHomeIndex || isSmallScreen;

  return (
    <header className={`app-header ${(shouldCollapse)? '' : "expanded"} ${isHosting || isImgScrolledPast? 'one-row-divider' : ''}`}>
      {isImgScrolledPast && <HeaderHomeDetails />}
      {isHomeEdit && <HeaderHomeEdit />}
      {(!isImgScrolledPast && !isHomeEdit) && (<nav className={`app-header-main-nav ${shouldCollapse ? 'scrolled' : 'expanded'}`}>
        
          <div className="app-header-main-nav-content">
          {/* main-nav - left section */}
          <div className="app-header-left-section">
            <NavLink to='/' className='logo'>
              <FaAirbnb className="logo-icon"/>
              <span>flexbnb</span>
            </NavLink>
          </div>
          {/* main - nav - mid section */}
          <div className={`app-header-mid-section ${shouldCollapse? 'scrolled' : 'expanded'}`}>
          {isHosting ? (
            <nav className='hosting-header-nav'>
              <NavLink to='/hosting/edit'>Create a new listing</NavLink>
              <NavLink to='/hosting/reservations/'>Reservations</NavLink>
            </nav>
          ) : (     
            <div className={`searchbar-wrapper ${shouldCollapse? 'scrolled' : 'expanded'}`}>
              <SearchBar isScrolled={shouldCollapse} />
            </div>
          )}
          </div>
          {/* main - nav - right section */}
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
        </div>
        
      </nav>)}
      <div className="app-header-bottom-row">
          {isHomeIndex && isScrolled && (<div className="app-header-labels-slider-wrapper">
            <LabelsSlider isScrolled={isScrolled}/>
          </div>)}
      </div>
    </header>
    )
}
