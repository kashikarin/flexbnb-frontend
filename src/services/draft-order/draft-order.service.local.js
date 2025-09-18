import { storageService } from '../async-storage.service'
import { homeService } from '../home'
import { getEmptyOrder, orderService } from '../order'
import { userService } from '../user'

export const draftOrderService = {
  // query,
  // getById,
  // save,
  // remove,
  getDraftOrder,
  _findFirstAvailable,
  getNumberOfNights,
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

async function getDraftOrder(homeId, filterBy) {
  let draftOrder = getEmptyOrder()

  draftOrder.guests = {
    adults: filterBy.adults || 1,
    children: filterBy.children || 0,
    infants: filterBy.infants || 0,
    pets: filterBy.pets || 0,
  }
  
  draftOrder.purchaser = null
  // if (!loggedInUser) draftOrder.purchaser = null
  // else {
  //   const { _id: userId, fullname, imageUrl, email } = loggedInUser
  //   draftOrder.purchaser = { userId, fullname, imageUrl, email }
  // }

  let { checkIn, checkOut } = filterBy
  const home = await homeService.getById(homeId)

  if (!checkIn || !checkOut) {
    const firstAvailableBooking = _findFirstAvailable(home)
    draftOrder.checkIn = firstAvailableBooking.checkIn
    draftOrder.checkOut = firstAvailableBooking.checkOut
  } else {
    const parsedCheckIn = new Date(checkIn)
    const parsedCheckOut = new Date(checkOut)

    // fallback if parsing failed
    if (isNaN(parsedCheckIn.getTime()) || isNaN(parsedCheckOut.getTime())) {
      const firstAvailableBooking = _findFirstAvailable(home)
      draftOrder.checkIn = firstAvailableBooking.checkIn
      draftOrder.checkOut = firstAvailableBooking.checkOut
    } else {
      draftOrder.checkIn = parsedCheckIn
      draftOrder.checkOut = parsedCheckOut
    }
  }

  draftOrder.host = {
    userId: home.host.userId || home.host.id,
    fullname: home.host.fullname,
    imageUrl: home.host.imageUrl, 
  }

  const nights = getNumberOfNights(draftOrder.checkIn, draftOrder.checkOut)
  const serviceFeeRate = 0.14

  
  draftOrder.totalPrice = home.price * nights * (1 + serviceFeeRate)

  draftOrder.home = {
    homeId,
    name: home.name,
    imageUrl: home.imageUrls[0],
  }

  return draftOrder
}

function getNumberOfNights(checkIn, checkOut) {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const oneDay = 1000 * 60 * 60 * 24
  return Math.round((end - start) / oneDay)
}

function _findFirstAvailable(home, nights = 2) {
  const today = new Date()
  const bookings = home.bookings
    .map((b) => ({
      checkIn: new Date(b.checkIn),
      checkOut: new Date(b.checkOut),
    }))
    .sort((a, b) => a.checkIn - b.checkIn)

  let start = today.setHours(0, 0, 0, 0)

  for (const booking of bookings) {
    if ((booking.checkIn - start) / (1000 * 60 * 60 * 24) >= nights) {
      const checkIn = new Date(start)
      const checkOut = new Date(checkIn)
      checkOut.setDate(checkOut.getDate() + nights)
      return { checkIn, checkOut }
    }
    if (booking.checkOut > start) {
      start = new Date(booking.checkOut)
    }
  }

  const checkIn = new Date(start)
  const checkOut = new Date(checkIn)
  checkOut.setDate(checkOut.getDate() + nights)
  return { checkIn, checkOut }
}
