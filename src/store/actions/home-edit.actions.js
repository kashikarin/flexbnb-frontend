import { 
         UPDATE_POTENTIAL_HOME, 
         CLEAR_POTENTIAL_HOME,
         SET_POTENTIAL_HOME,
         SET_NEXT_SUBSTEP,
         SET_PREVIOUS_SUBSTEP,
         CLOSE_HOME_EDIT_COMPLETION_MODAL,
         OPEN_HOME_EDIT_COMPLETION_MODAL,
         GO_TO_HOME_EDIT_START
        } from "../reducers/home-edit.reducer"
import { store } from "../store"
import { potentialHomeService } from "../../services/potential-home/potential-home.service.local"

export async function setPotentialHome() {
    const potentialHome = potentialHomeService.getEmptyPotentialHome()
    store.dispatch(getCmdSetPotentialHome(potentialHome))
    return potentialHome
}

export function updatePotentialHome(potentialHome) {
    store.dispatch(getCmdUpdatePotentialHome(potentialHome))
    return potentialHome
}

export function clearPotentialHome() {
    store.dispatch(getCmdClearPotentialHome())
}

export function setNextSubStep(){
  store.dispatch(getCmdSetNextSubStep())
}

export function setPreviousSubStep(){
  store.dispatch(getCmdSetPreviousSubStep())
}

export function closeHomeEditCompletionModal(){
    store.dispatch(getCmdCloseHomeEditCompletionModal())
}

export function openHomeEditCompletionModal(){
    store.dispatch(getCmdOpenHomeEditCompletionModal())
}

export function goToHomeEditStart(){
  store.dispatch(getCmdGoToHomeEditStart())
}

// Command Creators:

function getCmdSetPotentialHome(potentialHome) {
    return {
        type: SET_POTENTIAL_HOME,
        potentialHome
    }
}

function getCmdUpdatePotentialHome(potentialHome) {
  return {
    type: UPDATE_POTENTIAL_HOME,
    potentialHome,
  }
}

function getCmdClearPotentialHome() {
  return {
    type: CLEAR_POTENTIAL_HOME
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

function getCmdCloseHomeEditCompletionModal(){
  return {
    type: CLOSE_HOME_EDIT_COMPLETION_MODAL
  }
}

function getCmdOpenHomeEditCompletionModal(){
  return {
    type: OPEN_HOME_EDIT_COMPLETION_MODAL
  }
}

function getCmdGoToHomeEditStart(){
  return {
    type: GO_TO_HOME_EDIT_START
  }
}
