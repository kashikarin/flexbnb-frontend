const { DEV, VITE_LOCAL } = import.meta.env
// import { getRandomIntInclusive, makeId } from '../util.service'

import { potentialHomeService as local } from './potential-home.service.local'
import { potentialHomeService as remote } from './potential-home.service.remote'

function getEmptyPotentialHome(name = '', labels = [], amenities = []) {
  return { name, labels, amenities }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const potentialHomeService = { getEmptyPotentialHome, ...service }

//* Easy access to this service from the dev tools console
//* when using script - dev / dev:local

if (DEV) window.potentialHomeService = potentialHomeService
