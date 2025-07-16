export const SET_HOMES = 'SET_HOMES'
export const SET_HOME = 'SET_HOME'
export const REMOVE_HOME = 'REMOVE_HOME'
export const ADD_HOME = 'ADD_HOME'
export const UPDATE_HOME = 'UPDATE_HOME'
export const ADD_HOME_MSG = 'ADD_HOME_MSG'
export const SET_FILTERBY = 'SET_FILTERBY'

const initialState = {
  homes: [],
  filterBy: {}

}

export function homeReducer(state = initialState, action) {
  var newState = state
  switch (action.type) {
    case SET_HOMES:
      newState = { ...state, homes: action.homes }
      break
    // case SET_HOME:
    //   newState = { ...state, home: action.home }
    //   break
    // case REMOVE_HOME:
    //   const lastRemovedHome = state.homes.find(
    //     (home) => home._id === action.homeId
    //   )
    //   homes = state.homes.filter((home) => home._id !== action.homeId)
    //   newState = { ...state, homes, lastRemovedHome }
    //   break
    // case ADD_HOME:
    //   newState = { ...state, homes: [...state.homes, action.home] }
    //   break
    // case UPDATE_HOME:
    //   homes = state.homes.map((home) =>
    //     home._id === action.home._id ? action.home : home
    //   )
    //   newState = { ...state, homes }
    //   break
    // case ADD_HOME_MSG:
    //   newState = {
    //     ...state,
    //     home: { ...state.home, msgs: [...(state.home.msgs || []), action.msg] },
    //   }
    //   break
    case SET_FILTERBY:
      newState = { ...state, filterBy: { ...state.filterBy, ...action.filterBy}}
      break
    default:
  }
  return newState
}

// unitTestReducer()

function unitTestReducer() {
  var state = initialState
  const home1 = {
    _id: 'b101',
    vendor: 'home ' + parseInt(Math.random() * 10),
    msgs: [],
  }
  const home2 = {
    _id: 'b102',
    vendor: 'home ' + parseInt(Math.random() * 10),
    msgs: [],
  }

  state = homeReducer(state, { type: SET_HOME, homes: [home1] })
  console.log('After SET_HOMES:', state)

  state = homeReducer(state, { type: ADD_HOME, home: home2 })
  console.log('After ADD_HOME:', state)

  state = homeReducer(state, {
    type: UPDATE_HOME,
    home: { ...home2, vendor: 'Good' },
  })
  console.log('After UPDATE_HOME:', state)

  state = homeReducer(state, { type: REMOVE_HOME, homeId: home2._id })
  console.log('After REMOVE_HOME:', state)

  const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
  state = homeReducer(state, { type: ADD_HOME_MSG, homeId: home1._id, msg })
  console.log('After ADD_HOME_MSG:', state)

  state = homeReducer(state, { type: REMOVE_HOME, homeId: home1._id })
  console.log('After REMOVE_HOME:', state)
}
