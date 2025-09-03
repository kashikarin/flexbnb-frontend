import { SET_COMPLETED, 
         ADD_POTENTIAL_HOME, 
         SET_POTENTIAL_HOMES, 
         SET_NOT_COMPLETED, 
         UPDATE_POTENTIAL_HOME, 
         SET_STEP, 
         SET_POTENTIAL_HOME} from "../reducers/home-edit.reducer"
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
    return savedPotentialHome
  } catch (err) {
    console.error('Cannot update potential home', err)
    throw err
  }
}
export async function addPotentialHome() {
    try {
        const savedPotentialHome = await potentialHomeService.save(potentialHomeService.getEmptyPotentialHome())
        store.dispatch(getCmdAddPotentialHome(savedPotentialHome))
        return savedPotentialHome
    } catch(err){
        console.error('Cannot add potential home', err)
        throw err
    }
}

export function setStep(stepNumber, direction) {
    const newStep = {number: Math.max(1, stepNumber + direction), status: false}
    console.log('setStep function', newStep)
    store.dispatch(getCmdSetStep(newStep))
}

export function setStepCompleted() {
    store.dispatch(getCmdSetCompleted())
}

export function setStepNotCompleted() {
    store.dispatch(getCmdSetNotCompleted())
}


// Command Creators:
function getCmdSetStep(step) {
  return {
    type: SET_STEP,
    step
  }
}

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
