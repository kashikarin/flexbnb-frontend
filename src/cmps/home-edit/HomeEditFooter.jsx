import { useState } from "react"
import { useSelector } from "react-redux"
import { setStep } from "../../store/actions/home-edit.actions"

export function HomeEditFooter(){
    const [isLoading, setIsLoading] = useState(false)
    const step = useSelector(state => state.homeEditModule.step)
    // const {isStepCompleted} = useSelector(state => state.homeEditModule.isStepCompleted)
 
    
    
    function onNextClick() {
        setIsLoading(true)
       setTimeout(() => {
            setStep(step.number, 1)
            setIsLoading(false)
        }, 1000)
    }

    function onBackClick(){
        setStep(step.number, -1)
    }

    const segments = [1,2,3]
    
    return(
        <footer className="home-edit-footer">
            <div className="home-edit-footer-loader-container" role="progressbar" aria-valuenow={step.number} aria-valuemin={1} aria-valuemax={3}>
                {segments.map((seg) => (
                    <div key={seg} className={`home-edit-footer-loader step-${seg}`}>
                        <div className={`home-edit-footer-loader-progress ${seg < step.number ? "passed" : ""}`} />
                    </div>
                ))}
            </div>
            <main className="home-edit-footer-main">
                <button className="home-edit-back-btn" onClick={onBackClick} disabled={isLoading}>
                    Back
                </button>
                <button 
                    className="home-edit-next-btn" 
                    disabled={!step.status || isLoading} 
                    onClick={onNextClick}
                >
                    {isLoading ? <div className="loader" ></div> : "Next"}
                </button>
            </main>
        </footer>
    )
}