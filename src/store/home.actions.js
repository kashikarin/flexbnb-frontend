import { homeService } from '../services/home/home.service.local'
import { store } from './store'
import {
  ADD_HOME,
  REMOVE_HOME,
  SET_HOMES,
  SET_HOME,
  UPDATE_HOME,
  ADD_HOME_MSG,
  SET_FILTERBY,
} from './home.reducer'

export async function loadHomes(filterBy) {
  try {
    const homes = await homeService.query(filterBy)
    store.dispatch(getCmdSetHomes(homes))
  } catch (err) {
    console.log('Cannot load homes', err)
    throw err
  }
}

export async function loadHome(homeId) {
  try {
    const home = await homeService.getById(homeId)
    store.dispatch(getCmdSetHome(home))
  } catch (err) {
    console.log('Cannot load home', err)
    throw err
  }
}

export async function removeHome(homeId) {
  try {
    await homeService.remove(homeId)
    store.dispatch(getCmdRemoveHome(homeId))
  } catch (err) {
    console.log('Cannot remove home', err)
    throw err
  }
}

export async function addHome(home) {
  try {
    const savedHome = await homeService.save(home)
    store.dispatch(getCmdAddHome(savedHome))
    return savedHome
  } catch (err) {
    console.log('Cannot add home', err)
    throw err
  }
}

export async function updateHome(home) {
  try {
    const savedHome = await homeService.save(home)
    store.dispatch(getCmdUpdateHome(savedHome))
    return savedHome
  } catch (err) {
    console.log('Cannot save home', err)
    throw err
  }
}

export async function addHomeMsg(homeId, txt) {
  try {
    const msg = await homeService.addHomeMsg(homeId, txt)
    store.dispatch(getCmdAddHomeMsg(msg))
    return msg
  } catch (err) {
    console.log('Cannot add home msg', err)
    throw err
  }
}

export function setFilterBy(filterBy) {
  store.dispatch(getCmdSetFilterBy(filterBy))
}

// Command Creators:
function getCmdSetHomes(homes) {
  return {
    type: SET_HOMES,
    homes,
  }
}
function getCmdSetHome(home) {
  return {
    type: SET_HOME,
    home,
  }
}
function getCmdRemoveHome(homeId) {
  return {
    type: REMOVE_HOME,
    homeId,
  }
}
function getCmdAddHome(home) {
  return {
    type: ADD_HOME,
    home,
  }
}
function getCmdUpdateHome(home) {
  return {
    type: UPDATE_HOME,
    home,
  }
}
function getCmdAddHomeMsg(msg) {
  return {
    type: ADD_HOME_MSG,
    msg,
  }
}

function getCmdSetFilterBy(filterBy) {
  return {
    type: SET_FILTERBY,
    filterBy,
  }
}

// unitTestActions()
async function unitTestActions() {
  await loadHomes()
  await addHome(homeService.getEmptyHome())
  await updateHome({
    _id: 'm1oC7',
    title: 'Home-Good',
  })
  await removeHome('m1oC7')
  // TODO unit test addHomeMsg
}
