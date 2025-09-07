const { DEV, VITE_LOCAL } = import.meta.env
import { getRandomIntInclusive, makeId } from '../util.service'

import { homeService as local } from './home.service.local'
import { homeService as remote } from './home.service.remote'

function getEmptyHome() {
  return {
    vendor: makeId(),
    price: getRandomIntInclusive(1000, 9000),
    speed: getRandomIntInclusive(80, 240),
    msgs: [],
  }
}

function getDefaultFilter() {
  return {
    city: '',
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
    type: '',
    minPrice: 0,
    maxPrice: '',
    amenities: [],
    bedRoomsCount: 0,
    bedsCount: 0,
    bathCount: 0,
    labels: [],
    checkIn: '',
    checkOut: ''
  }
}

export function getFilterFromSearchParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || ''
  }
  return filterBy
}

// console.log('VITE_LOCAL:', VITE_LOCAL)

const service = VITE_LOCAL === 'true' ? local : remote
export const homeService = { getEmptyHome, getDefaultFilter, getFilterFromSearchParams, ...service }

//* Easy access to this service from the dev tools console
//* when using script - dev / dev:local

if (DEV) window.homeService = homeService
