import { userService } from '../services/user'


export const SET_LOGGEDINUSER = 'SET_LOGGEDINUSER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'


const initialState = {
    loggedInUser: userService.getLoggedinUser(),
    users: [],
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {

        case SET_LOGGEDINUSER:
            newState = { ...state, loggedInUser: action.user }
            break
        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        case SET_SCORE:
            newState = { ...state, user: { ...state.user, score: action.score } }
            break
        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
