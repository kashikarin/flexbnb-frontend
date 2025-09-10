import { useState } from "react"
import { useSelector } from "react-redux"
import { setNextSubStep, setPreviousSubStep } from "../../store/actions/home-edit.actions"
import { potentialHomeService } from '../../services/potential-home/potential-home.service.local'
import { addHome } from "../../store/actions/home.actions"

export function HomeEditFooter(){
    const [isLoading, setIsLoading] = useState(false)
    const potentialHome = useSelector(state => state.homeEditModule.potentialHome)
    console.log("🚀 ~ potentialHome:", potentialHome)
    const {currentStep, currentSubStep, currentSubStepStatus } = useSelector(state => state.homeEditModule.potentialHome.editProgress)
    const {gTotalSteps, gSubStepsPerStep} = potentialHomeService
    // const {isStepCompleted} = useSelector(state => state.homeEditModule.isStepCompleted)
    const steps = Array.from({ length: gTotalSteps }, (_, i) => i + 1)
    const subStepsMap = steps.reduce((map, step) => {
        map[step] = Array.from({length: gSubStepsPerStep[step-1]}, (_, i) => i + 1)
        return map
    }, {})
    const isLastStep =
        currentStep === gTotalSteps &&
        currentSubStep === gSubStepsPerStep[gTotalSteps - 1]
    
    function getProgress(stepNumber, currentStepNumber, currentSubStepNumber, subStepsMap) {
        if (stepNumber < currentStepNumber) {
            return 100; 
        }
        if (stepNumber > currentStepNumber) {
            return 0; 
        }
        const totalSubsteps = subStepsMap[stepNumber].length
        return (currentSubStepNumber / totalSubsteps) * 100
    }

    async function onNextClick() {
       setIsLoading(true)
       const MIN_DELAY = 800
       const start = Date.now()

       try {
            if (isLastStep) {
                await addHome(potentialHome)
            } else {
                setNextSubStep()
            }
        } catch (err) {
            console.error("Failed to save home", err)
        } finally {
            const elapsed = Date.now() - start
            const remaining = MIN_DELAY - elapsed
            if (remaining > 0) {
                setTimeout(() => setIsLoading(false), remaining)
            } else {
                setIsLoading(false)
            }
        }
    }
    
    function onBackClick(){
        setPreviousSubStep()
    }
   
    
    return(
        <footer className="home-edit-footer">
            <div className="home-edit-footer-loader-container">
                {steps.map((step) => {
                    const progressPercent = getProgress(step, currentStep, currentSubStep, subStepsMap)
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
                <button className="home-edit-back-btn" onClick={onBackClick} disabled={isLoading}>
                    Back
                </button>
                <button 
                    className="home-edit-next-btn" 
                    disabled={!currentSubStepStatus || isLoading} 
                    onClick={onNextClick}
                >
                    {isLoading ? <div className="loader" ></div> : "Next"}
                </button>
            </main>
        </footer>
    )
}