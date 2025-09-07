export const SET_ORDERS = 'SET_ORDERS'
export const SET_ORDER = 'SET_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const SET_FILTERORDERSBY = 'SET_FILTERORDERSBY'

const initialState = {
  potentialOrder:  
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
    // case REMOVE_ORDER:
    //   const lastRemovedOrder = state.orders.find(
    //     (order) => order._id === action.orderId
    //   )
    //   orders = state.orders.filter((order) => order._id !== action.orderId)
    //   newState = { ...state, orders, lastRemovedHome }
    //   break
    case ADD_ORDER:
      newState = { ...state, orders: [...state.orders, action.order] }
      break
    case UPDATE_ORDER:
      const updatedOrders = state.orders.map((order) =>
        order._id === action.order._id ? action.order : order
      )
      newState = { ...state, orders: updatedOrders }
      break
    // case ADD_HOME_MSG:
    //   newState = {
    //     ...state,
    //     home: { ...state.home, msgs: [...(state.home.msgs || []), action.msg] },
    //   }
    //   break
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

