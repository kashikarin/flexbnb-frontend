import { storageService } from '../async-storage.service'
import {
  getRandomIntInclusive,
  makeId,
  makeLorem,
  utilService,
} from '../util.service'

const STORAGE_KEY = 'potential-home'

export const potentialHomeService = {
  query,
  getById,
  save,
  remove,
  getEmptyPotentialHome
}

window.cs = potentialHomeService

async function query() {
  try {
    var potentialHomes = await storageService.query(STORAGE_KEY)
    return potentialHomes
  } catch (err) {
    console.error('Oops', err)
    throw err
  }
}

function getById(potentialHomeId) {
  return storageService.get(STORAGE_KEY, potentialHomeId)
}

async function remove(potentialHomeId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, potentialHomeId)
}

async function save(pHomeToSave) {
  try {
    if (pHomeToSave._id) {
      return await storageService.put(STORAGE_KEY, pHomeToSave)
    } else {
      return await storageService.post(STORAGE_KEY, pHomeToSave)
    }
  } catch (err) {
    console.error('Cannot save potential home', err)
    throw err
  }
}

function getEmptyPotentialHome(name = '', labels = [], amenities = []) {
  return { name, labels, amenities }
}