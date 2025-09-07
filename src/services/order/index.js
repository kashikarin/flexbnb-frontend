const { DEV, VITE_LOCAL } = import.meta.env

import { orderService as local } from './order.service.local'
import { orderService as remote } from './order.service.remote'

export function getEmptyOrder() {
  return {
    host: { _id: '', fullname: '', imgUrl: '' },
    guest: { _id: '', fullname: '' },
    totalPrice: '',
    checkIn: '',
    checkOut: '',
    guests: { adults: '', children: '' },
    home: { _id: '', name: '', imgUrl: '' },
    msgs: [],
    status: 'pending',
  }
}

export function getDefaultOrderFilter() {
  return {
    status: '',
    createdAt: '',
    checkIn: '',
    checkOut: '',
  }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const orderService = { ...service, getEmptyOrder, getDefaultOrderFilter }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.orderService = orderService