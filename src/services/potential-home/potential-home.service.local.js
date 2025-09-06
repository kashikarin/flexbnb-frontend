import { storageService } from '../async-storage.service'
import {
  getRandomIntInclusive,
  makeId,
  makeLorem,
  utilService,
} from '../util.service'

const STORAGE_KEY = 'potential-home'

const gTotalSteps = 3

const gSubStepsPerStep = [4, 5, 2]

export const potentialHomeService = {
  query,
  getById,
  save,
  remove,
  getEmptyPotentialHome,
  gTotalSteps,
  gSubStepsPerStep
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

function getEmptyPotentialHome(name = '', labels = [], amenities = [], capacity = 1, bathCount
 = 1, bedroomsCount = 1, bedsCount = 1, loc) {
  return { name, 
           labels, 
           amenities, 
           capacity, 
           bedroomsCount, 
           bedsCount, 
           bathCount, 
           loc,
          editProgress: {
            currentStep: 1,
            currentStepStatus: false,
            currentSubStep: 1,
            currentSubStepStatus: false
          } 
        }
}
