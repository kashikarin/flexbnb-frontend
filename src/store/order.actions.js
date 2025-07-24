import { orderService } from '../services/order/order.service.local'
import { store } from './store'
import {
  ADD_ORDER,
  REMOVE_ORDER,
  SET_ORDERS,
  SET_ORDER,
  UPDATE_ORDER,
//   ADD_ORDER_MSG,
  SET_FILTERORDERSBY,

} from './order.reducer'

export async function loadOrders(filterOrdersBy) {
  try {
    const orders = await orderService.query(filterOrdersBy)
    store.dispatch(getCmdSetOrders(orders))
  } catch (err) {
    console.error('Cannot load orders', err)
    throw err
  }
}

export async function loadOrder(orderId) {
  try {
    const order = await orderService.getById(orderId)
    store.dispatch(getCmdSetOrder(order))
  } catch (err) {
        console.error('Cannot load order', err)
        throw err
  }
}

export async function addOrder(order) {
  try {
    const newOrder = orderService.createOrder(order) 
    const savedOrder = await orderService.save(newOrder)
    store.dispatch(getCmdAddOrder(savedOrder))
    return savedOrder
  } catch (err) {
        console.error('Cannot add order', err)
        throw err
  }
}
export async function removeOrder(orderId) {
  try {
    await orderService.remove(orderId)
    store.dispatch(getCmdRemoveOrder(orderId))
  } catch (err) {
        console.error('Cannot remove order', err)
        throw err
  }
}


export async function updateOrder(order) {
  try {
    const savedOrder = await orderService.save(order)
    store.dispatch(getCmdUpdateOrder(savedOrder))
    return savedOrder
  } catch (err) {
        console.error('Cannot save order', err)
        throw err
  }
}

export function setFilterBy(filterBy) {
  store.dispatch(getCmdSetFilterBy(filterBy))
}

// Command Creators:
function getCmdSetOrders(orders) {
  return {
    type: SET_ORDERS,
    orders,
  }
}
function getCmdSetOrder(order) {
  return {
    type: SET_ORDER,
    order,
  }
}
function getCmdRemoveOrder(orderId) {
  return {
    type: REMOVE_ORDER,
    orderId,
  }
}
function getCmdAddOrder(order) {
  return {
    type: ADD_ORDER,
    order,
  }
}
function getCmdUpdateOrder(order) {
  return {
    type: UPDATE_ORDER,
    order,
  }
}

function getCmdSetFilterOrderBy(filterOrdersBy) {
  return {
    type: SET_FILTERORDERSBY,
    filterOrdersBy,
  }
}