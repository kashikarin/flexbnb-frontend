import { store } from "./store"

export const SET_ORDERS = 'SET_ORDERS'
export const SET_ORDER = 'SET_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const SET_FILTERORDERSBY = 'SET_FILTERORDERSBY'




const initialState = {
  orders: [],
  order: null,
  filterOrdersBy: {}
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
    // case UPDATE_ORDER:
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

// unitTestReducer()

// function unitTestReducer() {
//   var state = initialState
//   const home1 = {
//     _id: 'b101',
//     vendor: 'home ' + parseInt(Math.random() * 10),
//     msgs: [],
//   }
//   const home2 = {
//     _id: 'b102',
//     vendor: 'home ' + parseInt(Math.random() * 10),
//     msgs: [],
//   }

//   state = homeReducer(state, { type: SET_HOME, homes: [home1] })
//   console.log('After SET_HOMES:', state)

//   state = homeReducer(state, { type: ADD_HOME, home: home2 })
//   console.log('After ADD_HOME:', state)

//   state = homeReducer(state, {
//     type: UPDATE_HOME,
//     home: { ...home2, vendor: 'Good' },
//   })
//   console.log('After UPDATE_HOME:', state)

//   state = homeReducer(state, { type: REMOVE_HOME, homeId: home2._id })
//   console.log('After REMOVE_HOME:', state)

//   const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
//   state = homeReducer(state, { type: ADD_HOME_MSG, homeId: home1._id, msg })
//   console.log('After ADD_HOME_MSG:', state)

//   state = homeReducer(state, { type: REMOVE_HOME, homeId: home1._id })
//   console.log('After REMOVE_HOME:', state)
// }
