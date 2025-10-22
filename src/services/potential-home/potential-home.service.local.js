import { storageService } from '../async-storage.service'

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
  gSubStepsPerStep,
  isSubStepCompleted
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

 function getEmptyPotentialHome(type = '', name = '', summary = '', price = '', labels = [], amenities = [], capacity = 1, bathCount
 = 1, bedroomsCount = 1, bedsCount = 1, loc) {
  return { 
           type,
           name, 
           summary,
           imageUrls: [],
           price,
           labels, 
           amenities, 
           capacity, 
           bedroomsCount, 
           bedsCount, 
           bathCount, 
           loc,
          editProgress: {
            currentStep: 1,
            currentSubStep: 1
          } 
        }
}

function isSubStepCompleted(potentialHome, step, subStep) {
  switch (`${step}-${subStep}`) {
    case "1-1":
      return true
    case "1-2": 
      return Boolean(potentialHome.type)
    case "1-3":
      return Boolean(potentialHome.loc?.lat)
    case "1-4":
      const { bathCount, bedsCount, bedroomsCount, capacity } = potentialHome
      return !!(
        bathCount &&
        bedsCount &&
        bedroomsCount &&
        capacity
      )
    case "2-1": 
      return true
    case "2-2":
      return true
    case "2-3":
      return Boolean(potentialHome.imageUrls?.length) 
    case "2-4":
      return Boolean(potentialHome.name)
    case "2-5":
      return Boolean(potentialHome.summary)
    case "3-1":
      return true
    case "3-2": 
      return Boolean(potentialHome.price)
    default:
      return false
  }
}