import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ReactSVG } from 'react-svg'
import { Link } from 'react-router-dom'

import { userService } from '../services/user/index'
import { SET_LOGGEDINUSER } from '../store/reducers/user.reducer'

export function UserMenu() {
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
  // const loggedInUser = false

  const dispatch = useDispatch()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const dropdownRef = useRef(null)

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    fullname: '',
    username: '',
  })

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen)
  }

  function openAuthModal(isSignupMode = false) {
    setIsSignup(isSignupMode)
    setIsAuthModalOpen(true)
    setIsDropdownOpen(false)
    setError('')
  }

  function closeAuthModal() {
    setIsAuthModalOpen(false)
    setCredentials({ email: '', password: '', fullname: '', username: '' })
    setError('')
  }

  function handleInputChange(ev) {
    const { name, value } = ev.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  function toggleSignup() {
    setIsSignup(!isSignup)
    setError('')
    setCredentials({ email: '', password: '', fullname: '', username: '' })
  }
  async function handleAuth() {
    setIsLoading(true)
    setError('')

    try {
      let user
      if (isSignup) {
        user = await userService.signup({
          email: credentials.email,
          username: credentials.username,
          password: credentials.password,
          fullname: credentials.fullname,
        })
      } else {
        user = await userService.login({
          email: credentials.email,
          password: credentials.password,
        })
      }

      dispatch({ type: SET_LOGGEDINUSER, user })
      closeAuthModal()
    } catch (err) {
      console.error('Auth error:', err)
      setError(err.response?.data?.err || err.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleLogout() {
    try {
      await userService.logout()
      dispatch({ type: SET_LOGGEDINUSER, user: null })
      setIsDropdownOpen(false)
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  function handleKeyPress(ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault()
      handleAuth()
    }
  }

  return (
    <>
      <div className="user-menu-container" ref={dropdownRef}>
        <div className="user-menu" onClick={toggleDropdown}>
          <ReactSVG src="/svgs/user-menu-hamburger.svg" />
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="user-menu-dropdown">
            {loggedInUser ? (
              // Logged in user menu
              <div className="user-menu-content">
                <div className="user-greeting">
                  Hi, {loggedInUser.fullname || loggedInUser.username}
                </div>
                <div className="menu-divider"></div>
                <Link
                  to={`/user/${loggedInUser._id}`}
                  className="menu-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/my-travels"
                  className="menu-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Travels
                </Link>
                <Link
                  to="/help"
                  className="menu-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Help Center
                </Link>
                <div className="menu-divider"></div>
                <button
                  className="menu-item logout-item"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            ) : (
              // Not logged in menu
              <div className="user-menu-content">
                <button
                  className="menu-item"
                  onClick={() => openAuthModal(false)}
                >
                  Log In
                </button>
                <button
                  className="menu-item"
                  onClick={() => openAuthModal(true)}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Auth Modal - Only shows when clicking Login/Signup */}
      {isAuthModalOpen && (
        <>
          {/* Dark overlay */}
          <div className="modal-overlay" onClick={closeAuthModal}></div>

          {/* Floating window */}
          <div className="auth-modal">
            <div className="auth-modal-content">
              {/* Close button */}
              <button className="close-btn" onClick={closeAuthModal}>
                ×
              </button>

              <div className="auth-content">
                <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>

                {error && <div className="error-message">{error}</div>}

                <div className="auth-form">
                  {isSignup && (
                    <>
                      <div className="input-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          name="fullname"
                          value={credentials.fullname}
                          onChange={handleInputChange}
                          onKeyPress={handleKeyPress}
                          placeholder="Enter full name"
                          disabled={isLoading}
                          required
                        />
                      </div>

                      <div className="input-group">
                        <label>Username</label>
                        <input
                          type="text"
                          name="username"
                          value={credentials.username}
                          onChange={handleInputChange}
                          onKeyPress={handleKeyPress}
                          placeholder="Enter username"
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="input-group">
                    <label>{isSignup ? 'Email' : 'Email or Username'}</label>
                    <input
                      type={isSignup ? 'email' : 'text'}
                      name="email"
                      value={credentials.email}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder={
                        isSignup ? 'Enter email' : 'Enter email or username'
                      }
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter password"
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <button
                    className="auth-submit-btn"
                    onClick={handleAuth}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : isSignup ? 'Sign Up' : 'Log In'}
                  </button>

                  <div className="auth-toggle">
                    <span>
                      {isSignup
                        ? 'Already have an account? '
                        : "Don't have an account? "}
                      <button
                        className="toggle-link"
                        onClick={toggleSignup}
                        disabled={isLoading}
                      >
                        {isSignup ? 'Log In' : 'Sign Up'}
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
