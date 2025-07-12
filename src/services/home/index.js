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
    txt: '',
    maxPrice: '',
    minSpeed: '',
    sortField: '',
    sortDir: '',
    // pageIdx: 0
  }
}

// console.log('VITE_LOCAL:', VITE_LOCAL)

const service = VITE_LOCAL === 'true' ? local : remote
export const homeService = { getEmptyHome, getDefaultFilter, ...service }

//* Easy access to this service from the dev tools console
//* when using script - dev / dev:local

if (DEV) window.homeService = homeService
