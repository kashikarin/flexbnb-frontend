import { userService } from '../../services/user/user.service.local'
// import { socketService } from '../services/socket.service'
import { store } from '../store'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'
import { REMOVE_USER, 
         SET_LOGGEDINUSER, 
         SET_USERS, 
         SET_WATCHED_USER, 
         ADD_LIKE_HOME, 
         REMOVE_LIKE_HOME } from '../reducers/user.reducer'

export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.error('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.error('UserActions: err in removeUser', err)
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_LOGGEDINUSER,
            user
        })
        // socketService.login(user._id)
        return user
    } catch (err) {
        console.error('Cannot login', err)
        throw err
    }
}

export async function signup(signingUpUser) {
    try {
        const user = await userService.signup(signingUpUser)
        store.dispatch({
            type: SET_LOGGEDINUSER,
            user
        })
        // socketService.login(user)
        return user
    } catch (err) {
        console.error('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_LOGGEDINUSER,
            user: null
        })
        // socketService.logout()
    } catch (err) {
        console.error('Cannot logout', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        console.error('Cannot load user', err)
        throw err
    }
}

export async function addLike(homeId, userId){
    try {
        const user = await userService.getById(userId)
        user.likedHomes = [ ...user.likedHomes, homeId]
        await userService.update(user)
        store.dispatch({type: ADD_LIKE_HOME, homeId, userId})
    } catch(err) {
        console.error('Cannot add like', err)
        throw err
    }
}

export async function removeLike(homeId, userId){
    try {
        const user = await userService.getById(userId)
        if (!user || !user.likedHomes) return
        user.likedHomes = user?.likedHomes?.filter(likedHome => likedHome !== homeId)
        await userService.update(user)
        store.dispatch({type: REMOVE_LIKE_HOME, homeId, userId})
    } catch(err) {
        console.error('Cannot remove like', err)
        throw err
    }
}

export async function initUsers() {
    try {
        const users = await userService.createUsers()
        store.dispatch({type: SET_USERS, users})
    } catch(err) {
        console.error('Cannot init users', err)
    }
    
}

