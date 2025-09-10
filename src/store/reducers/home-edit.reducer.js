import { potentialHomeService } from '../../services/potential-home/potential-home.service.local'
export const SET_POTENTIAL_HOME = 'SET_POTENTIAL_HOME'
export const UPDATE_POTENTIAL_HOME = 'UPDATE_POTENTIAL_HOME'
export const CLEAR_POTENTIAL_HOME = 'CLEAR_POTENTIAL_HOME'
export const SET_COMPLETED = 'SET_COMPLETED'
export const SET_NOT_COMPLETED = 'SET_NOT_COMPLETED'
export const SET_NEXT_SUBSTEP = 'SET_NEXT_SUBSTEP'
export const SET_PREVIOUS_SUBSTEP = 'SET_PREVIOUS_SUBSTEP'

const initialState = {
  potentialHome: null,
}

export function homeEditReducer(state = initialState, action) {
  var newState = state
  const { gTotalSteps, gSubStepsPerStep} = potentialHomeService
  switch (action.type) {
    case SET_POTENTIAL_HOME:
      newState = { ...state, potentialHome: action.potentialHome }
      break
    case UPDATE_POTENTIAL_HOME: {
      const updatedPotentialHome = action.potentialHome
      // const { currentStep, currentSubStep } = state.potentialHome.editProgress
      // let isCompleted = false
      // if (currentStep === 1 && currentSubStep === 1) {
      //   isCompleted = !!updatedPotentialHome.type
      // }
      // if (currentStep === 1 && currentSubStep === 2) {
      //   isCompleted = !!updatedPotentialHome.loc;
      // }
      // if (currentStep === 1 && currentSubStep === 3) {
      //   const {bathCount, bedsCount, bedroomsCount, adults} = updatedPotentialHome
      //   isCompleted = (!!bathCount && !!bedsCount && !!bedroomsCount && !!adults)
      // }
      // if (currentStep === 2 && currentSubStep === 1) {
      //   isCompleted = true
      // }
      // if (currentStep === 2 && currentSubStep === 2) {
      //   isCompleted = true
      // }
      // if (currentStep === 2 && currentSubStep === 3) {
      //   isCompleted = updatedPotentialHome.name
      // }
      // if (currentStep === 2 && currentSubStep === 4) {
      //   isCompleted = updatedPotentialHome.summary
      // }
      // if (currentStep === 3 && currentSubStep === 1) {
      //   isCompleted = true
      // }
      newState = { ...state, potentialHome: { ...updatedPotentialHome,
                                              editProgress: { ...state.potentialHome.editProgress } }
       }
      // newState = { ...state, 
      //              potentialHome: { ...updatedPotentialHome, 
      //                               editProgress: {
      //                                 ...state.potentialHome.editProgress,
      //                                 currentSubStepStatus: isCompleted
      //                               }
      //              }
      //             }
      break
    }
    case CLEAR_POTENTIAL_HOME: {
      newState = { ...state, potentialHome: null}
      break
    }
    case SET_COMPLETED:{
      if (state.potentialHome.editProgress.currentSubStepStatus) return state
      newState = { ...state, potentialHome: { ...state.potentialHome,
                                              editProgress: {
                                                ...state.potentialHome.editProgress,
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
      const {editProgress} = state.potentialHome
      let nextSubStep = editProgress.currentSubStep
      let nextStep = editProgress.currentStep
      if (editProgress.currentStep === gTotalSteps && editProgress.currentSubStep === gSubStepsPerStep[gSubStepsPerStep.length - 1]) break
      if (editProgress.currentSubStep === gSubStepsPerStep[editProgress.currentStep - 1]) {
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
      const { editProgress } = state.potentialHome  
      let previousSubStep = editProgress.currentSubStep
      console.log("🚀 ~ editProgress:", editProgress)
      let previousStep = editProgress.currentStep
      if (editProgress.currentStep === 1 && editProgress.currentSubStep === 1) break
      if (editProgress.currentSubStep === 1) {
        previousStep --
        previousSubStep = gSubStepsPerStep[previousStep - 1]
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
    default:
  }
  return newState
}

