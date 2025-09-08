import { homeService } from '../../services/home'
// import { homeService } from '@/services/home'

import { store } from '../store'
import {
  ADD_HOME,
  REMOVE_HOME,
  SET_HOMES,
  SET_HOME,
  UPDATE_HOME,
  ADD_HOME_MSG,
  SET_FILTERBY,
  ADD_USER_LIKE,
  REMOVE_USER_LIKE,
} from '../reducers/home.reducer'

export async function loadHomes(filterBy) {
  try {
    const homes = await homeService.query(filterBy)
    store.dispatch(getCmdSetHomes(homes))
  } catch (err) {
    console.error('Cannot load homes', err)
    throw err
  }
}

export async function loadHome(homeId) {
  try {
    const home = await homeService.getById(homeId)
    store.dispatch(getCmdSetHome(home))
  } catch (err) {
    console.error('Cannot load home', err)
    throw err
  }
}

export async function removeHome(homeId) {
  try {
    await homeService.remove(homeId)
    store.dispatch(getCmdRemoveHome(homeId))
  } catch (err) {
    console.error('Cannot remove home', err)
    throw err
  }
}

export async function addHome(home) {
  try {
    const savedHome = await homeService.save(home)
    store.dispatch(getCmdAddHome(savedHome))
    return savedHome
  } catch (err) {
    console.error('Cannot add home', err)
    throw err
  }
}

export async function updateHome(home) {
  try {
    const savedHome = await homeService.save(home)
    store.dispatch(getCmdUpdateHome(savedHome))
    return savedHome
  } catch (err) {
    console.error('Cannot save home', err)
    throw err
  }
}

export async function addUserLike(homeId, userId) {
  try {
    const home = await homeService.getById(homeId)
    home.likedByUsers = [...home?.likedByUsers, userId]
    await homeService.save(home)
    store.dispatch({ type: ADD_USER_LIKE, homeId, userId })
  } catch (err) {
    console.error('Cannot add user like', err)
    throw err
  }
}

export async function removeUserLike(homeId, userId) {
  try {
    const home = await homeService.getById(homeId)
    home.likedByUsers = home.likedByUsers?.filter((id) => id !== userId)
    await homeService.save(home)
    store.dispatch({ type: REMOVE_USER_LIKE, homeId, userId })
  } catch (err) {
    console.error('Cannot remove user like', err)
    throw err
  }
}

export async function addHomeMsg(homeId, txt) {
  try {
    const msg = await homeService.addHomeMsg(homeId, txt)
    store.dispatch(getCmdAddHomeMsg(msg))
    return msg
  } catch (err) {
    console.error('Cannot add home msg', err)
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
