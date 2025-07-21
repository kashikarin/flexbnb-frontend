import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { initDemoUser } from '../store/user.actions'
import { FaAirbnb } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { SearchBar } from './SearchBar'
import { ReactSVG } from 'react-svg'

export function AppHeader() {
  // const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 580)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 580)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  useEffect(() => {
      const onScroll = () => setIsScrolled(window.scrollY > 20)
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(()=>{
    initDemoUser()
  }, [])

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
   <header className={`app-header ${isScrolled ? 'scrolled' : ''} main-container full`}>
      {!isMobile && <section className="app-header-regular">
        <nav className=''>
          <NavLink to='/' className='logo'>
            <FaAirbnb />
            <span>flexbnb</span>
          </NavLink>  
        
          {/* <div className='nav-links-container'>
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/home'>Homes</NavLink>
            <NavLink to='/chat'>Chat</NavLink>
            <NavLink to='/review'>Review</NavLink>
          </div> */}
          <div className="user-container">
            <button className='user-menu-btn'>
              <ReactSVG src="/svgs/hamburger-icon.svg" />
              <ReactSVG src="/svgs/user-icon.svg" />
            </button>
          </div>
        </nav>
      </section>}
      {isMobile && <section className="app-header-mobile">
        
      </section>}
      
      <SearchBar isScrolled={isScrolled} />
    </header>
  )
}
