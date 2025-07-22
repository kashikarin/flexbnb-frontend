import { userService } from '../services/user'


export const SET_LOGGEDINUSER = 'SET_LOGGEDINUSER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const ADD_LIKE_HOME = 'ADD_LIKE_HOME'
export const REMOVE_LIKE_HOME = 'REMOVE_LIKE_HOME'


const initialState = {
    loggedInUser: null,
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
        case ADD_LIKE_HOME:
            const { loggedInUser } = state
            newState = { ...state, 
                            users: state.users?.map(user => user._id === loggedInUser._id ? {...user, likedHomes: [...user.likedHomes, action.homeId] } : user),
                            loggedInUser: { ...state.loggedInUser, likedHomes: [...state.loggedInUser.likedHomes, action.homeId]}}
            break
        case REMOVE_LIKE_HOME:
            newState = { ...state, 
                            users: state.users?.map(user => user._id === loggedInUser._id ? {...user, likedHomes: user.likedHomes?.filter(likedHome => likedHome !== action.homeId) } : user),
                            loggedInUser: { ...state.loggedInUser, likedHomes: state.loggedInUser?.likedHomes?.filter(likedHome => likedHome !== action.homeId)}
                        }
            break
        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
