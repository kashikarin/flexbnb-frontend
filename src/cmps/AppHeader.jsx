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
    <header
      className={`app-header ${
        isScrolled ? 'scrolled' : ''
      } main-container full`}
    >
      <nav className=''>
        <NavLink to='/' className='logo'>
          <FaAirbnb />
          <span>flexbnb</span>
        </NavLink>
        <SearchBar isScrolled={isScrolled} />
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
              {user.fullname}
            </Link>
            {/* <span className="score">{user.score?.toLocaleString()}</span> */}
            <button onClick={onLogout}>logout</button>
          </div>
        )}
      </nav>
    </header>
  )
}
