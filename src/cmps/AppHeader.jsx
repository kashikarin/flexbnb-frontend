import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/user.actions'
import { FaAirbnb } from 'react-icons/fa'

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()

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
    <header className='app-header main-container full'>
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
      <search className=''>
        <div className='search-bar-container'>
          <div className='inner-section'>hi</div>
          <div className='inner-section'>how</div>
          <div className='inner-section'>you</div>
          <div className='inner-section'>
            doin'?
            <div className='search-btn-section'>
              <button className='search-button'></button>
            </div>
          </div>
          {/* <div>
              <div>
                
              </div>
            </div> */}
        </div>
      </search>
    </header>
  )
}
