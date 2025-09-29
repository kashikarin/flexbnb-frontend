export const SET_HOMES = 'SET_HOMES'
export const SET_HOME = 'SET_HOME'
export const REMOVE_HOME = 'REMOVE_HOME'
export const ADD_HOME = 'ADD_HOME'
export const UPDATE_HOME = 'UPDATE_HOME'
export const SET_FILTERBY = 'SET_FILTERBY'
export const ADD_USER_LIKE = 'ADD_USER_LIKE'
export const REMOVE_USER_LIKE = 'REMOVE_USER_LIKE'

const initialState = {
  homes: null,
  home: null,
  filterBy: {},
}

export function homeReducer(state = initialState, action) {
  var newState = state
  switch (action.type) {
    case SET_HOMES:
      newState = { ...state, homes: action.homes }
      break
    case SET_HOME:
      newState = { ...state, home: action.home }
      break

    // case ADD_HOME:
    //   newState = { ...state, homes: [...state.homes, action.home] }
    //   break
    // case UPDATE_HOME:
    //   homes = state.homes.map((home) =>
    //     home._id === action.home._id ? action.home : home
    //   )
    //   newState = { ...state, homes }
    //   break

    case SET_FILTERBY:
      newState = {
        ...state,
        filterBy: { ...state.filterBy, ...action.filterBy },
      }
      break
    case ADD_USER_LIKE:
      newState = {
        ...state,
        homes: state.homes?.map((home) =>
          home._id === action.homeId
            ? { ...home, likedByUsers: [...home.likedByUsers, action.userId] }
            : home
        ),
      }
      break
    case REMOVE_USER_LIKE:
      newState = {
        ...state,
        homes: state.homes?.map((home) =>
          home._id === action.homeId
            ? {
                ...home,
                likedByUsers: home.likedByUsers?.filter(
                  (id) => id !== action.userId
                ),
              }
            : home
        ),
      }
      break
    default:
  }
  return newState
}
