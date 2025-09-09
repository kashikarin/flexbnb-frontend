import { homeService } from '../home'
// import { homeService } from '@/services/home'

import { userService } from '../user/user.service.local'
import { storageService } from '../async-storage.service'
import {
  getRandomIntInclusive,
  makeId,
  randomFutureTime,
  randomPastTime,
  utilService,
} from '../util.service'
import { getDefaultOrderFilter, getEmptyOrder } from './index.js'
const STORAGE_KEY = 'order'
import { httpService } from '../http.service'

// _createOrders()

export const orderService = {
  query,
  save,
  remove,
  getEmptyOrder,
  // getInitialOrderDetails,
  getById,
  // updateStatus,
  // createOrder,
  // initOrders
}

async function query(filterOrdersBy = getDefaultOrderFilter()) {
  return httpService.get(`home`, filterOrdersBy)
  // const { status, createdAt, checkIn, checkOut } = filterOrdersBy
  // if (status) {
  //   orders = orders.filter((order) =>
  //     order.status.toLowerCase().includes(status.toLowerCase())
  //   )
  // }
  // return orders
}

async function save(orderToSave) {
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

// async function getInitialOrderDetails(homeId, userId, filterBy) {
//   const home = await httpService.get(`home/${homeId}`)
//   const loggedInUser = await httpService.get(`user/${userId}`)
//   const host = {
//     _id: home.host._id,
//     fullname: home.host.fullname,
//     imgUrl: home.host.imageUrl,
//   }
//   const serviceFeeRate = 0.14
//   const checkIn = filterBy.checkIn || randomFutureTime()
//   const checkOut = filterBy.checkOut || checkIn + 3 * 86400000
//   return {
//     host,
//     guest: { _id: loggedInUser._id, fullname: loggedInUser.fullname },
//     totalPrice:
//       home.price *
//       Math.floor((Math.max(checkOut) - Math.min(checkIn)) / 86400000) *
//       (1 + serviceFeeRate),
//     checkIn,
//     checkOut,
//     guests: {
//       adults: filterBy.adults,
//       children: filterBy.children,
//       infants: filterBy.infants,
//       pets: filterBy.pets,
//     },
//     home: { _id: homeId, name: home.name, imgUrl: home.imageUrls[0] },
//   }
// }

// async function _createOrder() {
//   let order = {}
//   const serviceFeeRate = 0.14
//   order._id = makeId()
//   order.status = 'pending'
//   order.msgs = []
//   order.host = {}
//   order.home = {}
//   order.guests = {}
//   order.guest = {}
//   order.createdAt = randomPastTime()
//   //order.home
//   order.home._id = await homeService.getRandomHomeId()
//   const reservedHome = await homeService.getById(order.home._id)
//   order.home.name = reservedHome.name
//   order.home.imgUrl = reservedHome.imageUrls[0]
//   order.home.name = reservedHome.name
//   //order-guests
//   order.guests.adults = Math.ceil(Math.random() * getRandomIntInclusive(1, 5))
//   order.guests.children = Math.floor(
//     Math.random() * getRandomIntInclusive(1, 4)
//   )
//   order.guests.infants = Math.floor(Math.random() * getRandomIntInclusive(1, 4))
//   order.guests.pets = Math.floor(Math.random() * getRandomIntInclusive(0, 2))
//   //order dates:
//   order.checkIn = randomFutureTime()
//   order.checkOut = order.checkIn + getRandomIntInclusive(1, 10) * 86400000
//   //order.totalPrice
//   const nightsCount = Math.floor(
//     (Math.max(order.checkIn, order.checkOut) -
//       Math.min(order.checkIn, order.checkOut)) /
//       86400000
//   )
//   const subTotalPrice = reservedHome.price * nightsCount
//   order.totalPrice = Math.round(subTotalPrice * serviceFeeRate)
//   //order.host
//   order.host._id = await userService.getRandomUserId()
//   const host = await userService.getById(order.host._id)
//   order.host.fullname = host.fullname
//   order.host.imgUrl = host.imgUrl
//   //order.guest
//   order.guest._id = await userService.getRandomUserId()
//   const { fullname } = await userService.getById(order.guest._id)
//   order.guest.fullname = fullname
//   return order
// }

// async function _createOrders() {
//   let orders = utilService.loadFromStorage(STORAGE_KEY)
//   if (!orders || !orders.length) {
//     const orderPromises = Array.from({ length: 7 }, () => _createOrder())
//     orders = await Promise.all(orderPromises)
//     utilService.saveToStorage(STORAGE_KEY, orders)
//   }
// }

