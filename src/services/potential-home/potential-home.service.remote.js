import { httpService } from '../http.service.js'

export const potentialHomeService = {
  query,
  getById,
  save,
  remove
}

window.cs = potentialHomeService

async function query() {
  return httpService.get(`user`)
}

function getById(potentialHomeId) {
  return httpService.get(`user/${potentialHomeId}`)
}

async function remove(potentialHomeId) {
  // throw new Error('Nope')
  await httpService.delete(`user/${potentialHomeId}`, potentialHomeId)
}

async function save(pHomeToSave) {
  try {
    if (pHomeToSave._id) {
      return await httpService.put(`user/${pHomeToSave}`, pHomeToSave)
    } else {
      return await httpService.post('user', pHomeToSave)
    }
  } catch (err) {
    console.error('Cannot save potential home', err)
    throw err
  }
}

