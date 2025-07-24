import { homeService } from "../home/home.service.local"
import { userService } from "../user/user.service.local"
import { storageService } from '../async-storage.service'
import { getRandomIntInclusive, makeId, randomFutureTime, randomPastTime, utilService } from "../util.service"

const STORAGE_KEY = 'order'

_createOrders()

export const orderService = {
    query,
    save,
    remove,
    getEmptyOrder,
    getById,
    // createOrder,
    // initOrders
}

async function query(filterOrdersBy = getDefaultOrdersFilter()){
    try {
        var orders = await storageService.query(STORAGE_KEY)
        const {status, createdAt, startDate, endDate} = filterOrdersBy
        if (status) {
            orders = orders.filter((order) => order.status.toLowerCase().includes(status.toLowerCase()))
        }
        return orders
    } catch(err) {
        console.error('Cannot get orders', err)
        throw err
    }
}

async function save(orderToSave) {
  try {
    if (orderToSave._id) {
      return await storageService.put(STORAGE_KEY, orderToSave)
    } else {
      return await storageService.post(STORAGE_KEY, orderToSave)
    }
  } catch(err) {
      console.error('Cannot save order', err)
      throw err
  }  
}

async function remove(orderId) {
  await storageService.remove(STORAGE_KEY, orderId)
}

function getById(homeId) {
  return storageService.get(STORAGE_KEY, homeId)
}

function getEmptyOrder(){
    return {status: 'pending', msgs: [], startDate: '', endDate: '', adults: 0, children: 0, infants: 0, pets: 0}
}

function getDefaultOrderFilter() {
  return {
    status: '',
    createdAt: '',
    startDate: '',
    endDate: ''
  }
}

async function _createOrder(homeId = "", userId = "", startDate = "", endDate = "", guests = "", totalPrice = ""){
    let order = {}
    const serviceFeeRate = 0.14
    order._id = makeId()
    order.status = 'pending'
    order.msgs = []
    order.createdAt = homeId = "" ? randomPastTime() : new Date().getTime()
    if (homeId === "") {
        order.home._id = await homeService.getRandomHomeId() 
        const reservedHome = await homeService.getById(order.home._id)
        order.guests = reservedHome.capacity
        order.home.name = reservedHome.name
        order.home.imageUrls = reservedHome.imageUrls
    }   
    if (userId === "") {
        order.host._id = await userService.getRandomUserId()
        const host = await userService.getById(order.host._id)
        order.host.fullname = host.fullname
        order.host.imgUrl = host.imgUrl
    }
    if (startDate === "") {
        startDate = randomFutureTime()
        endDate = startDate + (getRandomIntInclusive(1,10) * 86400000)
    }
    if (totalPrice === '') {
        const nightsCount = Math.floor((Math.max(startDate, endDate) - Math.min(startDate, endDate)) / 86400000)
        const subTotalPrice = reservedHome.price * nightsCount
        totalPrice = Math.round(subTotalPrice * serviceFeeRate)
    }
    return order
}

async function _createOrders() {
    let orders = utilService.loadFromStorage(STORAGE_KEY)
    if (!orders || !orders.length) 
        {
            const orderPromises = Array.from({ length: 7 }, () => createOrder())
            orders = await Promise.all(orderPromises)
            utilService.saveToStorage(STORAGE_KEY, orders)
        }
}



// const orders = [
// 	{
// 		_id: 'o1225',
// 		host: { _id: 'u102', fullname: "bob", imgUrl: "..."},
// 		guest: {
// 			_id: 'u101',
// 			fullname: 'User 1',
// 		},
// 		totalPrice: 160,
// 		startDate: '2025/10/15',
// 		endDate: '2025/10/17',
// 		guests: {
// 			adults: 1,
// 			kids: 2,
// 		},
// 		stay: {
// 			// mini-stay
// 			_id: 'h102',
// 			name: 'House Of Uncle My',
// 			imgUrl: 'first img url (or more...)',
// 		},
// 		msgs: [], // host - guest chat
// 		status: 'pending', // approved / rejected
// 	},
// ]
