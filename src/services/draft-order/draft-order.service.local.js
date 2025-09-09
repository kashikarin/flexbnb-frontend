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
// const STORAGE_KEY = 'draft-order'

export const draftOrderService = {
  // query,
  // getById,
  // save,
  // remove,
  getDraftOrder,
  _findFirstAvailable
}

window.cs = draftOrderService

// // async function query() {
// //   try {
// //     var draftOrders = await storageService.query(STORAGE_KEY)
// //     return draftOrders
// //   } catch (err) {
// //     console.error('Oops', err)
// //     throw err
// //   }
// // }

// function getById(draftOrderId) {
//   return storageService.get(STORAGE_KEY, draftOrderId)
// }

// async function remove(draftOrderId) {
//   await storageService.remove(STORAGE_KEY, draftOrderId)
// }

// async function save(draftOrderToSave) {
//   try {
//     if (draftOrderToSave._id) {
//       return await storageService.put(STORAGE_KEY, draftOrderToSave)
//     } else {
//       return await storageService.post(STORAGE_KEY, draftOrderToSave)
//     }
//   } catch (err) {
//     console.error('Cannot save draft order', err)
//     throw err
//   }
// }


async function getDraftOrder(homeId, userId, filterBy) {
  const guests = {adults: filterBy.adults,
      children: filterBy.children,
      infants: filterBy.infants,
      pets: filterBy.pets
  }
  if (!guests.adults) guests.adults = 1
  let { checkIn, checkOut } = filterBy
  const home = await homeService.getById(homeId)
  if (!checkIn || !checkOut) {
    const firstAvailableBooking = _findFirstAvailable(home)
    checkIn = firstAvailableBooking.checkIn
    checkOut = firstAvailableBooking.checkOut
  }
  const loggedInUser = await userService.getById(userId)
  const host = {
    userId: home.host.userId,
    fullname: home.host.fullname,
    imgUrl: home.host.imageUrl,
  }
  const serviceFeeRate = 0.14
  
  console.log("🚀 ~ checkIn:", checkIn)
  console.log("🚀 ~ checkOut:", checkOut)
  return {
    host,
    purchaser: { userId: loggedInUser._id, fullname: loggedInUser.fullname },
    totalPrice: 
      home.price * _getNumberOfNights(checkIn, checkOut) * (1 + serviceFeeRate),
    checkIn,
    checkOut,
    guests,
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

function _findFirstAvailable(home, nights = 2) {
  const today = new Date()
  const bookings = home.bookings
    .map(b => ({
      checkIn: new Date(b.checkIn),
      checkOut: new Date(b.checkOut),
    }))
    .sort((a, b) => a.checkIn - b.checkIn)

  let start = today

  for (const booking of bookings) {
    if ((booking.checkIn - start) / (1000 * 60 * 60 * 24) >= nights) {
      const checkIn = new Date(start)
      const checkOut = new Date(checkIn)
      checkOut.setDate(checkOut.getDate() + nights)
      return { checkIn, checkOut }
    }
    if (booking.checkOut > start) {
      start = new Date(booking.checkOut);
    }
  }

  const checkIn = new Date(start)
  const checkOut = new Date(checkIn)
  checkOut.setDate(checkOut.getDate() + nights)
  return { checkIn, checkOut }
}
