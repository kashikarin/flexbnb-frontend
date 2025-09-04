export const SET_STEP = 'SET_STEP'
export const SET_POTENTIAL_HOMES = 'SET_POTENTIAL_HOMES'
export const SET_POTENTIAL_HOME = 'SET_POTENTIAL_HOME'
export const ADD_POTENTIAL_HOME = 'ADD_POTENTIAL_HOME'
export const UPDATE_POTENTIAL_HOME = 'UPDATE_POTENTIAL_HOME'
export const SET_COMPLETED = 'SET_COMPLETED'
export const SET_NOT_COMPLETED = 'SET_NOT_COMPLETED'

const initialState = {
  step: {number: 1, status: false},
  potentialHome: null,
  potentialHomes: [],
}

export function homeEditReducer(state = initialState, action) {
  var newState = state
  switch (action.type) {
    case SET_STEP:
      newState = { ...state, step: {number: action.step.number, status: false} }
      break
    case SET_POTENTIAL_HOMES:
      newState = { ...state, potentialHomes: action.potentialHomes }
      break
    case SET_POTENTIAL_HOME:
      newState = { ...state, potentialHome: action.potentialHome }
      break
    case ADD_POTENTIAL_HOME:
      newState = { ...state, potentialHomes: [...state.potentialHomes, action.potentialHome] }
      break
    case UPDATE_POTENTIAL_HOME:
      const updatedPotentialHomes = state.potentialHomes.map((pHome) =>
        pHome._id === action.potentialHome._id ? action.potentialHome : pHome
      )
      newState = { ...state, potentialHomes: updatedPotentialHomes, potentialHome: action.potentialHome }
      break
    case SET_COMPLETED:
      newState = { ...state, step: {...state.step, status: true } }
      break
    case SET_NOT_COMPLETED:
      newState = { ...state, step: {...state.step, status: false } }
      break  
    default:
  }
  return newState
}

