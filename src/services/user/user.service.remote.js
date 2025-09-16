import { httpService } from '../http.service'

export const userService = {
  login,
  signup,
  logout,
  googleAuth,
  getCurrentUser,
  getLoggedinUser,
  getById,
  getUsers,
  update,
  remove,
  toggleHomeLike,
}

async function login(userCred) {
  try {
    const user = await httpService.post('auth/login', userCred)
    if (user) {
      _saveLocalUser(user)
    }
    return user
  } catch (err) {
    throw err
  }
}

async function signup(userCred) {
  try {
    const user = await httpService.post('auth/signup', userCred)
    if (user) {
      _saveLocalUser(user)
    }
    return user
  } catch (err) {
    throw err
  }
}

async function googleAuth(credentials) {
  try {
    const user = await httpService.post('auth/google', credentials)
    if (user) {
      _saveLocalUser(user)
    }
    return user
  } catch (err) {
    throw err
  }
}

async function getCurrentUser() {
  try {
    const user = await httpService.get('auth/me')
    if (user) {
      _saveLocalUser(user)
    }
    return user
  } catch (err) {
    throw err
  }
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem('loggedInUser') || 'null')
}

async function logout() {
  try {
    await httpService.post('auth/logout')
    _clearLocalUser()
  } catch (err) {
    throw err
  }
}

async function getById(userId) {
  return await httpService.get(`users/${userId}`)
}

async function getUsers() {
  return await httpService.get('users')
}

async function update(user) {
  const updatedUser = await httpService.put(`users/${user._id}`, user)
  if (updatedUser) {
    _saveLocalUser(updatedUser)
  }
  return updatedUser
}

async function remove(userId) {
  return await httpService.delete(`users/${userId}`)
}

async function toggleHomeLike(homeId) {
  return await httpService.post(`users/like/${homeId}`)
}

function _saveLocalUser(user) {
  user = {
    _id: user._id,
    fullname: user.fullname,
    username: user.username,
    imageUrl: user.imageUrl,
    email: user.email,
    isHost: user.isHost,
    isAdmin: user.isAdmin,
    likedHomes: user.likedHomes,
    createdAt: user.createdAt,
  }
  sessionStorage.setItem('loggedInUser', JSON.stringify(user))
  return user
}

function _clearLocalUser() {
  sessionStorage.removeItem('loggedInUser')
}
