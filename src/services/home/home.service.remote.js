import { httpService } from '../http.service'

export const homeService = {
  query,
  getById,
  save,
  remove,
  addHomeMsg,
}

async function query(filterBy = { txt: '', price: 0 }) {
  console.log('[HOME SERVICE] REMOTE query called', filterBy)

  return httpService.get(`homes`, filterBy)
}

function getById(homeId) {
  return httpService.get(`home/${homeId}`)
}

async function remove(homeId) {
  return httpService.delete(`home/${homeId}`)
}

async function save(home) {
  var savedHome
  if (home._id) {
    savedHome = await httpService.put(`home/${home._id}`, home)
  } else {
    savedHome = await httpService.post('home', home)
  }
  return savedHome
}

async function addHomeMsg(homeId, txt) {
  const savedMsg = await httpService.post(`home/${homeId}/msg`, { txt })
  return savedMsg
}
