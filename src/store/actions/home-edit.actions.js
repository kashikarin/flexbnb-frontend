import { 
         SET_COMPLETED, 
         ADD_POTENTIAL_HOME, 
         SET_POTENTIAL_HOMES, 
         SET_NOT_COMPLETED, 
         UPDATE_POTENTIAL_HOME, 
         SET_POTENTIAL_HOME,
         SET_NEXT_SUBSTEP,
         SET_PREVIOUS_SUBSTEP
        } from "../reducers/home-edit.reducer"
import { store } from "../store"
import { potentialHomeService } from "../../services/potential-home/potential-home.service.local"

export async function loadPotentialHome(potentialHomeId) {
  try {
    const potentialHome = await potentialHomeService.getById(potentialHomeId)
    store.dispatch(getCmdSetPotentialHome(potentialHome))
  } catch (err) {
    console.error('Cannot load potential home', err)
    throw err
  }
}

export async function loadPotentialHomes() {
  try {
    const potentialHomes = await potentialHomeService.query()
    store.dispatch(getCmdSetPotentialHomes(potentialHomes))
  } catch (err) {
    console.error('Cannot load potential homes', err)
    throw err
  }
}

export async function updatePotentialHome(potentialHome) {
  try {
    const savedPotentialHome = await potentialHomeService.save(potentialHome)
    store.dispatch(getCmdUpdatePotentialHome(savedPotentialHome))
    store.dispatch(getCmdSetPotentialHome(savedPotentialHome))
    return savedPotentialHome
  } catch (err) {
    console.error('Cannot update potential home', err)
    throw err
  }
}
export async function addPotentialHome() {
    try {
        const savedPotentialHome = await potentialHomeService.save(potentialHomeService.getEmptyPotentialHome())
        console.log("🚀 ~ savedPotentialHome:", savedPotentialHome)
        
        store.dispatch(getCmdAddPotentialHome(savedPotentialHome))
        return savedPotentialHome
    } catch(err){
        console.error('Cannot add potential home', err)
        throw err
    }
}

export function setStepCompleted() {
    store.dispatch(getCmdSetCompleted())
}

export function setStepNotCompleted() {
    store.dispatch(getCmdSetNotCompleted())
}

export function setNextSubStep(){
  store.dispatch(getCmdSetNextSubStep())
}

export function setPreviousSubStep(){
  store.dispatch(getCmdSetPreviousSubStep())
}

// Command Creators:

function getCmdSetPotentialHome(potentialHome) {
    return {
        type: SET_POTENTIAL_HOME,
        potentialHome
    }
}

function getCmdSetPotentialHomes(potentialHomes) {
    return {
        type: SET_POTENTIAL_HOMES,
        potentialHomes
    }
}

function getCmdAddPotentialHome(potentialHome) {
  return {
    type: ADD_POTENTIAL_HOME,
    potentialHome,
  }
}

function getCmdUpdatePotentialHome(potentialHome) {
  return {
    type: UPDATE_POTENTIAL_HOME,
    potentialHome,
  }
}

function getCmdSetCompleted() {
    return {
       type: SET_COMPLETED 
    }
}

function getCmdSetNotCompleted() {
    return {
       type: SET_NOT_COMPLETED 
    }
}

function getCmdSetNextSubStep() {
    return {
       type: SET_NEXT_SUBSTEP 
    }
}

function getCmdSetPreviousSubStep() {
    return {
       type: SET_PREVIOUS_SUBSTEP 
    }
}