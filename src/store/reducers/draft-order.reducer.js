
// export const SET_DRAFT_ORDER = 'SET_DRAFT_ORDER'
export const ADD_DRAFT_ORDER = 'ADD_DRAFT_ORDER'
export const UPDATE_DRAFT_ORDER = 'UPDATE_DRAFT_ORDER'
export const CLEAR_DRAFT_ORDER = 'CLEAR_DRAFT_ORDER'
export const OPEN_ORDER_CONFIRMATION_MODAL = 'OPEN_ORDER_CONFIRMATION_MODAL'
export const CLOSE_ORDER_CONFIRMATION_MODAL = 'CLOSE_ORDER_CONFIRMATION_MODAL' 
// export const UPDATE_ORDER = 'UPDATE_ORDER'
// export const SET_FILTERORDERSBY = 'SET_FILTERORDERSBY'

const initialState = {
  draftOrder: null,
  isOrderConfirmationModalOpen: false
}

export function draftOrderReducer(state = initialState, action) {
  var newState = state
  switch (action.type) {
    case ADD_DRAFT_ORDER:
      newState = { ...state, draftOrder: action.draftOrder }
      break
    case UPDATE_DRAFT_ORDER:
      newState = { ...state, draftOrder: state.draftOrder ? 
          { ...state.draftOrder, ...action.draftOrder }  
          : action.draftOrder }
      break
    case CLEAR_DRAFT_ORDER:
      newState = { ...state, draftOrder: null }
      break
    case OPEN_ORDER_CONFIRMATION_MODAL:
      newState = { ...state, isOrderConfirmationModalOpen: true }
      break
    case CLOSE_ORDER_CONFIRMATION_MODAL:
      newState = { ...state, isOrderConfirmationModalOpen: false }
      break
    default:
  }
  return newState
}

