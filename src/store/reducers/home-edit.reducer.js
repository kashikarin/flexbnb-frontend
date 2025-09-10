import { potentialHomeService } from '../../services/potential-home/potential-home.service.local'
export const SET_POTENTIAL_HOME = 'SET_POTENTIAL_HOME'
export const UPDATE_POTENTIAL_HOME = 'UPDATE_POTENTIAL_HOME'
export const CLEAR_POTENTIAL_HOME = 'CLEAR_POTENTIAL_HOME'
export const SET_COMPLETED = 'SET_COMPLETED'
export const SET_NOT_COMPLETED = 'SET_NOT_COMPLETED'
export const SET_NEXT_SUBSTEP = 'SET_NEXT_SUBSTEP'
export const SET_PREVIOUS_SUBSTEP = 'SET_PREVIOUS_SUBSTEP'
export const OPEN_HOME_EDIT_COMLPETION_MODAL = 'OPEN_HOME_EDIT_COMLPETION_MODAL'
export const CLOSE_HOME_EDIT_COMLPETION_MODAL = 'CLOSE_HOME_EDIT_COMLPETION_MODAL'
export const GO_TO_HOME_EDIT_START = 'GO_TO_HOME_EDIT_START'
const initialState = {
  potentialHome: null,
  isHomeEditCompletionModalOpen: false
}

export function homeEditReducer(state = initialState, action) {
  var newState = state
  const { gTotalSteps, gSubStepsPerStep} = potentialHomeService
  switch (action.type) {
    case SET_POTENTIAL_HOME: {
      const defaultEditProgress = {
        currentStep: 1,
        currentStepStatus: false,
        currentSubStep: 1,
        currentSubStepStatus: false
      }

  const incoming = action.potentialHome || {}
      newState = { ...state, potentialHome: {...incoming, 
                                             editProgress: { ...defaultEditProgress, ...incoming.editProgress} } }
      break
    }
    case UPDATE_POTENTIAL_HOME: {
      const updatedPotentialHome = action.potentialHome
      
      const merged = Object.entries(updatedPotentialHome).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value
      }
      return acc
      }, { ...state.potentialHome })

      newState = {
        ...state,
        potentialHome: {
          ...merged,
          editProgress: {
            ...state.potentialHome?.editProgress,
            ...updatedPotentialHome?.editProgress
          }
        }
      }
      break
    }
    case CLEAR_POTENTIAL_HOME: {
      newState = { ...state, potentialHome: null}
      break
    }
    case SET_COMPLETED:{
      if (state.potentialHome?.editProgress?.currentSubStepStatus) return state
      newState = { ...state, potentialHome: { ...state.potentialHome,
                                              editProgress: {
                                                ...state.potentialHome?.editProgress,
                                                currentSubStepStatus: true
                                              }
                                            }
                }
      break
    }
    case SET_NOT_COMPLETED: {
      if (!state.potentialHome.editProgress.currentSubStepStatus) return state
      newState = { ...state, potentialHome: { ...state.potentialHome,
                                              editProgress: {
                                                ...state.potentialHome.editProgress,
                                                currentSubStepStatus: false
                                              }
                                            }
                }
      break
    }
      
    case SET_NEXT_SUBSTEP: {
      const editProgress = state.potentialHome?.editProgress
      if (!editProgress) return state 

      console.log("gSubStepsPerStep:", gSubStepsPerStep)
      let nextSubStep = editProgress.currentSubStep ?? 1
      let nextStep = editProgress.currentStep ?? 1
      if (nextStep === gTotalSteps && nextSubStep === gSubStepsPerStep[gSubStepsPerStep.length - 1]) break
      if (nextSubStep === gSubStepsPerStep[nextStep - 1]) {
        nextStep++
        nextSubStep = 1
      } else nextSubStep++

      newState = { ...state, potentialHome: { ...state.potentialHome,
                                              editProgress: {
                                                ...editProgress,
                                                currentStep: nextStep,
                                                currentSubStep: nextSubStep,
                                                currentSubStepStatus: false,
                                                currentStepStatus: false
                                              }
                                              
                                            }
                  }
      break
    }
    case SET_PREVIOUS_SUBSTEP: {
      const editProgress = state.potentialHome?.editProgress
      if (!editProgress) return state

      let previousSubStep = editProgress.currentSubStep ?? 1
      let previousStep = editProgress.currentStep ?? 1

      if (previousStep === 1 && previousSubStep === 1) break
      
      if (previousSubStep === 1) {
        previousStep--
        previousSubStep = gSubStepsPerStep[previousStep - 1] ?? 1
      } else previousSubStep--
      
      newState = { ...state, potentialHome: { ...state.potentialHome,
                                              editProgress: {
                                                ...editProgress,
                                                currentStep: previousStep,
                                                currentSubStep: previousSubStep,
                                                currentSubStepStatus: false,
                                                currentStepStatus: false
                                              }
                                              
                                            }
                  }
      break
    }
    case OPEN_HOME_EDIT_COMLPETION_MODAL: {
      newState = { ...state, isHomeEditCompletionModalOpen: true }
      break
    }
    case CLOSE_HOME_EDIT_COMLPETION_MODAL: {
      newState = { ...state, isHomeEditCompletionModalOpen: false }
      break
    }
    case GO_TO_HOME_EDIT_START: {
      newState = { ...state, 
                   potentialHome: { ...state.potentialHome, 
                      editProgress: { ...state.potentialHome.editProgress,
                                      currentStep: 1,
                                      currentSubStep: 1 }
                                  }
                  }
    }
    default:
  }
  return newState
}

