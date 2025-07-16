import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/user.actions'
import { FaAirbnb } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { SearchBar } from './SearchBar'

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
    // <header className='app-header main-container full'>
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
      <SearchBar isScrolled={isScrolled} />
      {/* <search className=''>
          <div className={`search-bar-container ${isScrolled ? 'scrolled' : ''}`}>
            <div>
              <div className='inner-section'>
                <div className='sTitle'>{isScrolled ? 'Anywhere' : 'Where'}</div>
                {!isScrolled && <input className='placeholder-content' type='search' placeholder='Search destination'></input>}
              </div>
              <div className="sep"></div>
              <div className='inner-section'>
                <div className='sTitle'>{isScrolled ? 'Anytime' : 'Check in'}</div>
                {!isScrolled && <input className='placeholder-content' type='search' placeholder='Add dates'></input>}
              </div>
              <div className="sep"></div>
              {!isScrolled && <div className='inner-section'>
                <div className='sTitle'>Check out</div>
                <input className='placeholder-content' type='search' placeholder='Add dates'></input>
              </div>}
              {!isScrolled && <div className="sep"></div>}
              <div className='inner-section'>
                <div className='sTitle'>{isScrolled ? 'Add guests' : 'Who'}</div>
                {!isScrolled && <input className='placeholder-content' type='search' placeholder='Add guests'></input>}
                <div className='search-btn-section'>
                  <button className='search-button'>
                    <div className='search-icon'></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
      </search> */}
    </header>
  )
}
