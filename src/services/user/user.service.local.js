import { storageService } from '../async-storage.service'
import { homeService } from '../home/home.service.local'


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
    getUserReviews,
    createDemoUser
}

function getUsers() {
    return storageService.query('user')
}

async function getById(userId) {
    return await storageService.get('user', userId)
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update({ _id, score }) {
    const user = await storageService.get('user', _id)
    user.score = score
    await storageService.put('user', user)

	// When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser()
    if (loggedinUser._id === user._id) _saveLocalUser(user)

    return user
}

async function login(credentials) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === credentials.username)

    if (user) return _saveLocalUser(user)
}

async function signup(newUser) {
    const user = await storageService.post('user', newUser)
    return _saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    localStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function getLoggedinUser() {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    if (!user) return null

    const users = await storageService.query('user') 
    const userExists = users?.some(storedUser => storedUser._id === user._id)
    console.log("🚀 ~ getLoggedinUser ~ userExists:", userExists) //karin - always make new id! fix the functins 
    
    if (!userExists) await storageService.post('user', user)
    
    return user
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    localStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user)) 
    return user
}

async function getUserReviews(userId){
    const homes = await homeService.query()
    return homes.reduce((acc, home) => {
        let homeReviews = (home.reviews || []).filter(review => review.by._id === userId)
        acc.push(...homeReviews)
        return acc
    }, [])
}

async function createDemoUser(){
    const demoUser = {
        _id: 'u101',
        fullname: 'Justin Time',
        imgUrl: '/img/user/justin-img.jpg',
        username: 'just_in_time',
        password: 'bieber123',
        likedHomes: []
    }
    demoUser.reviews = await getUserReviews(demoUser._id)
    localStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(demoUser))
    return demoUser 
}

// To quickly create an admin user, uncomment the next line
// _createAdmin()
// async function _createAdmin() {
//     const user = {
//         username: 'admin',
//         password: 'admin',
//         fullname: 'Mustafa Adminsky',
//         imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
//         score: 10000,
//     }

//     const newUser = await storageService.post('user', userCred)
//     console.log('newUser: ', newUser)
// }


// const users = [
// 	{
// 		_id: 'u101',
// 		fullname: 'User 1',
// 		imgUrl: '/img/img1.jpg',
// 		username: 'user1',
// 		password: 'secret',
// 		reviews: [
// 			{
// 				id: 'madeId',
// 				txt: 'Quiet guest...',
// 				rate: 4,
// 				by: {
// 					_id: 'u102',
// 					fullname: 'user2',
// 					imgUrl: '/img/img2.jpg',
// 				},
// 			},
// 		],
// 	},
// 	{
// 		_id: 'u102',
// 		fullname: 'User 2',
// 		imgUrl: '/img/img2.jpg',
// 		username: 'user2',
// 		password: 'secret',
// 	},
// ]