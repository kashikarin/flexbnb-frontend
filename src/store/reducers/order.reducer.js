export const SET_ORDERS = 'SET_ORDERS'
export const SET_ORDER = 'SET_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const SET_FILTERORDERSBY = 'SET_FILTERORDERSBY'

const initialState = {
  orders: [],
  order: null,
  filterOrdersBy: {},
}

export function orderReducer(state = initialState, action) {
  var newState = state
  switch (action.type) {
    case SET_ORDERS:
      newState = { ...state, orders: action.orders }
      break
    case SET_ORDER:
      newState = { ...state, order: action.order }
      break
    case ADD_ORDER:
      newState = { ...state, orders: [...state.orders, action.order] }
      break
    case UPDATE_ORDER:
      const updatedOrders = state.orders.map((order) =>
        order._id === action.order._id ? action.order : order
      )
      newState = { ...state, orders: updatedOrders }
      break
    case SET_FILTERORDERSBY:
      newState = {
        ...state,
        filterOrdersBy: { ...state.filterOrdersBy, ...action.filterOrdersBy },
      }
      break

    default:
  }
  return newState
}

