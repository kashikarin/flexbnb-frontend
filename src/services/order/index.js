const { DEV, VITE_LOCAL } = import.meta.env

import { orderService as local } from './order.service.local'
import { orderService as remote } from './order.service.remote'

export function getEmptyOrder() {
  return {
    host: { _id: '', fullname: '', imageUrl: '' },
    purchaser: { _id: '', fullname: '', imageUrl: '', email: '' },
    totalPrice: '',
    checkIn: '',
    checkOut: '',
    guests: { adults: '', children: '' },
    home: { _id: '', name: '', imageUrl: '' },
    status: 'pending',
  }
}

export function getDefaultOrderFilter() {
  return {
    status: '',
    createdAt: '',
    checkIn: '',
    checkOut: '',
    totalPrice: '',
  }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const orderService = { ...service, getEmptyOrder, getDefaultOrderFilter }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.orderService = orderService
