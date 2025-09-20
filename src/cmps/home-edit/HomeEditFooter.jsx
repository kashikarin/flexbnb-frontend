import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  openHomeEditCompletionModal,
  setNextSubStep,
  setPreviousSubStep,
} from '../../store/actions/home-edit.actions'
import { potentialHomeService } from '../../services/potential-home/potential-home.service.local'

export function HomeEditFooter() {
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
  const [isLoading, setIsLoading] = useState(false)
  const potentialHome = useSelector(
    (state) => state.homeEditModule.potentialHome
  )

  console.log('🚀 ~ potentialHome:', potentialHome)
//   const currentSubStepStatus = useSelector(
//     (state) =>
//       state.homeEditModule.potentialHome?.editProgress?.currentSubStepStatus ??
//       false
//   )
  const currentSubStep = useSelector(
    (state) =>
      state.homeEditModule.potentialHome?.editProgress?.currentSubStep ?? 1
  )
  const currentStep = useSelector(
    (state) =>
      state.homeEditModule.potentialHome?.editProgress?.currentStep ?? 1
  )
  const { gTotalSteps, gSubStepsPerStep } = potentialHomeService
  // const {isStepCompleted} = useSelector(state => state.homeEditModule.isStepCompleted)
  const steps = Array.from({ length: gTotalSteps }, (_, i) => i + 1)
  const subStepsMap = steps.reduce((map, step) => {
    map[step] = Array.from(
      { length: gSubStepsPerStep[step - 1] },
      (_, i) => i + 1
    )
    return map
  }, {})
  const isLastStep =
    currentStep === gTotalSteps &&
    currentSubStep === gSubStepsPerStep[gTotalSteps - 1]

  if (!loggedInUser) {
    return null
  }
  function getProgress(
    stepNumber,
    currentStepNumber,
    currentSubStepNumber,
    subStepsMap
  ) {
    if (stepNumber < currentStepNumber) {
      return 100
    }
    if (stepNumber > currentStepNumber) {
      return 0
    }
    const totalSubsteps = subStepsMap[stepNumber].length
    return (currentSubStepNumber / totalSubsteps) * 100
  }

  function onNextClick() {
    setIsLoading(true)

    setTimeout(() => {
      if (isLastStep) {
        openHomeEditCompletionModal()
        setIsLoading(false)
        return
      }
      setNextSubStep()
      setIsLoading(false)
    }, 1000)
  }

  function onBackClick() {
    setPreviousSubStep()
  }

  return (
    <footer className="home-edit-footer">
      <div className="home-edit-footer-loader-container">
        {steps.map((step) => {
          const progressPercent = getProgress(
            step,
            currentStep,
            currentSubStep,
            subStepsMap
          )
          return (
            <div key={step} className="home-edit-footer-loader">
              <div
                className="home-edit-footer-loader-progress"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )
        })}
      </div>
      <main className="home-edit-footer-main">
        <button
          className="home-edit-back-btn"
          onClick={onBackClick}
          disabled={isLoading}
        >
          Back
        </button>
        <button
          className="home-edit-next-btn"
          disabled={!potentialHomeService.isSubStepCompleted(potentialHome, currentStep, currentSubStep) || isLoading}
          onClick={onNextClick}
        >
          {isLoading ? <div className="loader"></div> : 'Next'}
        </button>
      </main>
    </footer>
  )
}
