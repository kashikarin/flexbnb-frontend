import { homeService } from "../home/home.service.local"
import { userService } from "../user/user.service.local"
import { getRandomIntInclusive, makeId, randomFutureTime, randomPastTime, utilService } from "../util.service"

const STORAGE_KEY = 'order'

export const orderService = {
    query,
    save,
    remove,
    getById,
    createOrder,
    initOrders
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


function getDefaultOrderFilter() {
  return {
    status: '',
    createdAt: '',
    startDate: '',
    endDate: ''
  }
}

async function createOrder(homeId = "", userId = "", startDate = "", endDate = "", guests = "", totalPrice = ""){
    const _id = makeId()
    const serviceFeeRate = 0.14
    const msgs = []
    const status = 'pending'
    if (homeId === "") {
        homeId = await homeService.getRandomHomeId() 
        var createdAt = randomPastTime()
    }   
    const reservedHome = await homeService.getById(homeId)
    if (userId === "") userId = await userService.getRandomUserId()
    const host = await userService.getById(userId)
    if (startDate === "") {
        startDate = randomFutureTime()
        endDate = startDate + (getRandomIntInclusive(1,10) * 86400000)
    }
    if (guests === "") {
        let adults = getRandomIntInclusive(1, reservedHome.capacity)
        let children = reservedHome.capacity - adults
        guests = {adults, children}
    }
    if (totalPrice === '') {
        const nightsCount = Math.floor((Math.max(startDate, endDate) - Math.min(startDate, endDate)) / 86400000)
        const subTotalPrice = reservedHome.price * nightsCount
        totalPrice = Math.round(subTotalPrice * serviceFeeRate)
    }
    return { 
        _id,
        createdAt,
        startDate, 
        endDate, 
        guests, 
        totalPrice, 
        host: {_id: host._id, fullname: host.fullname, imgUrl: host.imgUrl}, 
        home: {_id: reservedHome._id, name: reservedHome.name, imageUrls: reservedHome.imageUrls},
        status, 
        msgs 
    }    
}

async function initOrders() {
    let orders = utilService.loadFromStorage(STORAGE_KEY)
    if (orders || orders?.length) return orders

    const orderPromises = Array.from({ length: 7 }, () => createOrder())
    orders = await Promise.all(orderPromises)
    utilService.saveToStorage(STORAGE_KEY, orders)
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
