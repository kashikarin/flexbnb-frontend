import { potentialHomeService } from '../../services/potential-home/potential-home.service.local'
export const SET_POTENTIAL_HOMES = 'SET_POTENTIAL_HOMES'
export const SET_POTENTIAL_HOME = 'SET_POTENTIAL_HOME'
export const ADD_POTENTIAL_HOME = 'ADD_POTENTIAL_HOME'
export const UPDATE_POTENTIAL_HOME = 'UPDATE_POTENTIAL_HOME'
export const SET_COMPLETED = 'SET_COMPLETED'
export const SET_NOT_COMPLETED = 'SET_NOT_COMPLETED'
export const SET_NEXT_SUBSTEP = 'SET_NEXT_SUBSTEP'
export const SET_PREVIOUS_SUBSTEP = 'SET_PREVIOUS_SUBSTEP'
// const gTotalSteps = 3

// const gSubStepsPerStep = [4, 5, 2]
const {gTotalSteps, gSubStepsPerStep} = potentialHomeService

const initialState = {
  potentialHome: potentialHomeService.getEmptyPotentialHome(),
  potentialHomes: []
}

export function homeEditReducer(state = initialState, action) {
  var newState = state
  switch (action.type) {
    case SET_POTENTIAL_HOMES:
      newState = { ...state, potentialHomes: action.potentialHomes }
      break
    case SET_POTENTIAL_HOME:
      newState = { ...state, potentialHome: action.potentialHome }
      break
    case ADD_POTENTIAL_HOME:
      newState = { ...state, 
                   potentialHomes: [ ...state.potentialHomes, action.potentialHome ],
                   potentialHome: action.potentialHome
                  } 
      break
    case UPDATE_POTENTIAL_HOME:
      const updatedPotentialHome = action.potentialHome
      const { currentStep, currentSubStep } = state.potentialHome.editProgress
      let isCompleted = false
      if (currentStep === 1 && currentSubStep === 1) {
        isCompleted = !!updatedPotentialHome.type
      }
      if (currentStep === 1 && currentSubStep === 2) {
        isCompleted = !!updatedPotentialHome.loc;
      }
      if (currentStep === 1 && currentSubStep === 3) {
        isCompleted = !!(bathCount && bedsCount && bedroomsCount && capacity)
      }
  
  // ...repeat for other steps/substeps

      const updatedPotentialHomes = state.potentialHomes.map((pHome) =>
        pHome._id === updatedPotentialHome._id ? updatedPotentialHome : pHome
      )
     
      newState = { ...state, 
                   potentialHomes: updatedPotentialHomes, 
                   potentialHome: { ...updatedPotentialHome, 
                                    editProgress: {
                                      ...state.potentialHome.editProgress,
                                      currentSubStepStatus: isCompleted
                                    }
                   }
                  }
      break
    case SET_COMPLETED:
      if (state.potentialHome.editProgress.currentSubStepStatus) return state
      newState = { ...state, potentialHome: { ...state.potentialHome,
                                              editProgress: {
                                                ...state.potentialHome.editProgress,
                                                currentSubStepStatus: true
                                              }
                                            }
                }
      break
    case SET_NOT_COMPLETED:
      if (!state.potentialHome.editProgress.currentSubStepStatus) return state
      newState = { ...state, potentialHome: { ...state.potentialHome,
                                              editProgress: {
                                                ...state.potentialHome.editProgress,
                                                currentSubStepStatus: false
                                              }
                                            }
                }
      break
    case SET_NEXT_SUBSTEP:
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
    case SET_PREVIOUS_SUBSTEP:
      let previousSubStep = editProgress.currentSubStep
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
    default:
  }
  return newState
}

