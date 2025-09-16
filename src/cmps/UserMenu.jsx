import { useState, useRef, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ReactSVG } from 'react-svg'
import { Link } from 'react-router-dom'
import { Camera, Upload, User } from 'lucide-react'

import { userService } from '../services/user/index'
import { uploadService } from '../services/upload.service.js'
import { SET_LOGGEDINUSER } from '../store/reducers/user.reducer'

export function UserMenu() {
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)

  const dispatch = useDispatch()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [error, setError] = useState('')

  const dropdownRef = useRef(null)
  const fileInputRef = useRef(null)

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    fullname: '',
    username: '',
    imageUrl: null,
  })

  const handleGoogleCallback = useCallback(async (response) => {
    setIsLoading(true)
    setError('')

    try {
      console.log('🔍 Google Response:', response)
      console.log(
        '🎫 JWT Token:',
        response.credential?.substring(0, 50) + '...'
      )

      alert(
        'Google Callback עובד! JWT: ' +
          response.credential.substring(0, 20) +
          '...'
      )

      const user = await userService.googleAuth({
        credential: response.credential,
      })

      dispatch({ type: SET_LOGGEDINUSER, user })
      closeAuthModal()
    } catch (err) {
      setError(`Google sign in failed: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }, [])

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
  useEffect(() => {
    const initUser = async () => {
      try {
        const user = await userService.getCurrentUser()
        if (user) {
          dispatch({ type: SET_LOGGEDINUSER, user })
        }
      } catch (err) {
        console.log('No user session found')
      }
    }

    if (!loggedInUser) {
      initUser()
    }
  }, [dispatch, loggedInUser])
  useEffect(() => {
    const loadGoogleScript = () => {
      return new Promise((resolve, reject) => {
        if (window.google) {
          resolve(window.google)
          return
        }

        const existingScript = document.querySelector(
          'script[src*="gsi/client"]'
        )
        if (existingScript) {
          existingScript.onload = () => resolve(window.google)
          existingScript.onerror = reject
          return
        }

        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client'
        script.async = true
        script.defer = true
        script.onload = () => {
          resolve(window.google)
        }
        script.onerror = () => {
          reject(new Error('Failed to load Google SDK'))
        }

        document.head.appendChild(script)
      })
    }

    const initGoogleAuth = async () => {
      try {
        await loadGoogleScript()

        const waitForGoogle = () => {
          return new Promise((resolve) => {
            if (window.google?.accounts?.id) {
              resolve()
            } else {
              setTimeout(() => waitForGoogle().then(resolve), 100)
            }
          })
        }

        await waitForGoogle()

        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleCallback,
          auto_select: false,
          cancel_on_tap_outside: true,
          use_fedcm_for_prompt: false,
          itp_support: true,
        })

        if (isAuthModalOpen && !isSignup) {
          setTimeout(() => {
            const container = document.getElementById('google-signin-button')
            if (container) {
              container.innerHTML = ''
              window.google.accounts.id.renderButton(container, {
                theme: 'outline',
                size: 'large',
                width: '100%',
                text: 'continue_with',
                type: 'standard',
              })
            }
          }, 100)
        }
      } catch (error) {
        console.error(error)
      }
    }

    initGoogleAuth()
  }, [handleGoogleCallback, isAuthModalOpen, isSignup])

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
    setCredentials({
      email: '',
      password: '',
      fullname: '',
      username: '',
      imageUrl: null,
    })
    setError('')
  }

  function handleInputChange(ev) {
    const { name, value } = ev.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  function toggleSignup() {
    setIsSignup(!isSignup)
    setError('')
    setCredentials({
      email: '',
      password: '',
      fullname: '',
      username: '',
      imageUrl: null,
    })
  }

  async function handleImageSelect(event) {
    const file = event.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file only')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image too large. Maximum 5MB')
      return
    }

    setIsUploadingImage(true)
    setError('')

    try {
      const imgData = await uploadService.uploadImg(file)

      if (imgData?.secure_url) {
        setCredentials((prev) => ({
          ...prev,
          imageUrl: imgData.secure_url,
        }))
        console.log('Image uploaded:', imgData.secure_url)
      } else {
        throw new Error('Failed to get image URL')
      }
    } catch (err) {
      console.error('Image upload error:', err)
      setError('Failed to upload image. Please try again')
    } finally {
      setIsUploadingImage(false)
    }
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
          imageUrl: credentials.imageUrl,
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

        {isDropdownOpen && (
          <div className="user-menu-dropdown">
            {loggedInUser ? (
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
                  to="/wishlists"
                  className="menu-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Wishlists
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

      {isAuthModalOpen && (
        <>
          <div className="modal-overlay" onClick={closeAuthModal}></div>

          <div className="auth-modal">
            <div className="auth-modal-content">
              <button className="close-btn" onClick={closeAuthModal}>
                ×
              </button>

              <div className="auth-content">
                <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>

                {error && <div className="error-message">{error}</div>}

                <div className="auth-form">
                  {isSignup && (
                    <div className="signup-layout">
                      <div className="profile-image-section">
                        <div className="image-upload-container">
                          <div className="image-preview">
                            {credentials.imageUrl ? (
                              <img
                                src={credentials.imageUrl}
                                alt="Profile preview"
                                className="preview-image"
                              />
                            ) : (
                              <div className="image-placeholder">
                                <User size={40} />
                              </div>
                            )}

                            {isUploadingImage && (
                              <div className="upload-overlay">
                                <Upload className="spinning" size={20} />
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploadingImage || isLoading}
                            className="upload-btn"
                          >
                            <Camera size={16} />
                            {credentials.imageUrl ? 'Change' : 'Add Photo'}
                          </button>

                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            style={{ display: 'none' }}
                          />
                        </div>
                        <p className="upload-hint">Optional</p>
                      </div>

                      <div className="form-fields">
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

                        <div className="input-group">
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter email"
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
                      </div>
                    </div>
                  )}

                  {!isSignup && (
                    <>
                      <div className="input-group">
                        <label>Email or Username</label>
                        <input
                          type="text"
                          name="email"
                          value={credentials.email}
                          onChange={handleInputChange}
                          onKeyPress={handleKeyPress}
                          placeholder="Enter email or username"
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
                    </>
                  )}

                  <button
                    className="auth-submit-btn"
                    onClick={handleAuth}
                    disabled={isLoading || isUploadingImage}
                  >
                    {isLoading ? 'Loading...' : isSignup ? 'Sign Up' : 'Log In'}
                  </button>

                  {!isSignup && (
                    <>
                      <div className="auth-divider">
                        <span>or</span>
                      </div>

                      <div
                        id="google-signin-button"
                        style={{ marginBottom: '20px' }}
                      ></div>
                    </>
                  )}

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
