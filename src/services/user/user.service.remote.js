import { httpService } from '../http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getUsers,
  getById,
  remove,
  update,
  getLoggedinUser,
  toggleHomeLike,
  getUserLikes,
}

function getUsers() {
	return httpService.get(`users`)
}

async function getById(userId) {
	const user = await httpService.get(`users/${userId}`)
	return user
}

function remove(userId) {
	return httpService.delete(`users/${userId}`)
}

async function update({ _id, score }) {
	const user = await httpService.put(`users/${_id}`, { _id, score })
  return httpService.get(`user`)
}

async function getById(userId) {
  const user = await httpService.get(`user/${userId}`)
  return user
}

function remove(userId) {
  return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
  const user = await httpService.put(`users/${_id}`, { _id, score })
  // const user = await httpService.post('user', userCred)

  // When admin updates other user's details, do not update loggedinUser
  const loggedinUser = getLoggedinUser() // Might not work because its defined in the main service???
  if (loggedinUser._id === user._id) _saveLocalUser(user)

  return user
}

async function login(userCred) {
  const user = await httpService.post('auth/login', userCred)
  if (user) return _saveLocalUser(user)
}

async function signup(userCred) {
  if (!userCred.imgUrl) userCred.imgUrl = ''
  //https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png
  userCred.likedHomes = []

  const user = await httpService.post('auth/signup', userCred)
  return _saveLocalUser(user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return await httpService.post('auth/logout')
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _saveLocalUser(user) {
  const userToSave = {
    _id: user._id,
    fullname: user.fullname,
    username: user.username,
    email: user.email,
    imgUrl: user.imgUrl,
    score: user.score || 10000,
    isAdmin: user.isAdmin,
    isHost: user.isHost,
    likedHomes: user.likedHomes || [],
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
  return userToSave
}

async function toggleHomeLike(homeId) {
  const result = await httpService.post(`users/like/${homeId}`)
  return result
}

async function getUserLikes() {
  const result = await httpService.get('users/likes/me')
  return result.likedHomes
}
