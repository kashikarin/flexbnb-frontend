import { storageService } from '../async-storage.service'
import { homeService } from '../home'
import { userService } from '../user'
import {
  getRandomIntInclusive,
  makeId,
  randomFutureTime,
  randomPastTime,
  utilService,
} from '../util.service'
const STORAGE_KEY = 'potential-order'

export const potentialOrderService = {
  query,
  getById,
  save,
  remove,
  createPotentialOrder
}

window.cs = potentialOrderService

async function query() {
  try {
    var potentialOrders = await storageService.query(STORAGE_KEY)
    return potentialOrders
  } catch (err) {
    console.error('Oops', err)
    throw err
  }
}

function getById(potentialOrderId) {
  return storageService.get(STORAGE_KEY, potentialOrderId)
}

async function remove(potentialOrderId) {
  await storageService.remove(STORAGE_KEY, potentialOrderId)
}

async function save(pOrderToSave) {
  try {
    if (pOrderToSave._id) {
      return await storageService.put(STORAGE_KEY, pOrderToSave)
    } else {
      return await storageService.post(STORAGE_KEY, pOrderToSave)
    }
  } catch (err) {
    console.error('Cannot save potential order', err)
    throw err
  }
}


async function createPotentialOrder(homeId, userId, filterBy) {
  const home = await homeService.getById(homeId)
  const loggedInUser = await userService.getById(userId)
  const host = {
    _id: home.host._id,
    fullname: home.host.fullname,
    imgUrl: home.host.imageUrl,
  }
  const serviceFeeRate = 0.14
  const checkIn = filterBy.checkIn 
  const checkOut = filterBy.checkOut 
  return {
    host,
    purchaser: { userId: loggedInUser._id, fullname: loggedInUser.fullname },
    totalPrice:
      home.price * _getNumberOfNights(checkIn, checkOut) * (1 + serviceFeeRate),
    checkIn,
    checkOut,
    guests: {
      adults: filterBy.adults,
      children: filterBy.children,
      infants: filterBy.infants,
      pets: filterBy.pets,
    },
    home: { homeId, name: home.name, imgUrl: home.imageUrls[0] }
  }
}


function _getNumberOfNights(checkIn, checkOut){
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const timeDiff = end.getTime() - start.getTime()
    const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
    return nights
}

