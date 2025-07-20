import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/user.actions'
import { FaAirbnb } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { SearchBar } from './SearchBar'
import { ReactSVG } from 'react-svg'

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
      handleScroll() 
  }, [])

  function handleScroll() {
    setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }

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
      <SearchBar isScrolled={isScrolled} />
    </header>
  )
}
