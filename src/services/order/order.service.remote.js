import { getEmptyOrder } from './index.js'
import { httpService } from '../http.service'
import { normalizeDateToUTC } from '../util.service.js'



export const orderService = {
  query,
  save,
  remove,
  getEmptyOrder,
  getById,
}

async function query() {
  return httpService.get(`orders`)
}

async function save(orderToSave) {
  orderToSave.checkIn = normalizeDateToUTC(orderToSave.checkIn)
  orderToSave.checkOut = normalizeDateToUTC(orderToSave.checkOut)

  try {
    if (orderToSave._id) {
      return await httpService.put(`orders/${orderToSave._id}`, orderToSave)
    } else {
      orderToSave.status = 'pending'
      return await httpService.post(`orders`, orderToSave)
    }
  } catch (err) {
    console.error('Cannot save order', err)
    throw err
  }
}

async function remove(orderId) {
  await httpService.delete(`orders/${orderId}`)
}

function getById(orderId) {
  return httpService.get(`orders/${orderId}`)
}

