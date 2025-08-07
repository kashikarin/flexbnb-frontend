import { useContext } from "react"
import { HomeEditContext } from "../../context/home-edit/HomeEditContext"

export function HomeEditFooter(){
    const {step, setStep, isStepCompleted} = useContext(HomeEditContext)

    console.log("🚀 ~ step:", step)
    
    function onNextClick() {
        setStep(prev => prev + 1)
    }

    function onBackClick(){
        setStep(prev => prev > 1 ? prev - 1 : 0)
    }
    return(
        <footer className="home-edit-footer">
            <div className="home-edit-footer-loader-container">
                <div className="home-edit-footer-loader step-1">
                    <div className={`home-edit-footer-loader-progress step-1 ${step > 1 ? 'passed' : ''}`} />
                </div>
                <div className="home-edit-footer-loader step-2">
                    <div className={`home-edit-footer-loader-progress step-2 ${step > 2 ? 'passed' : ''}`} />
                </div>
                <div className="home-edit-footer-loader step-3">
                    <div className={`home-edit-footer-loader-progress step-3 ${step > 3 ? 'passed' : ''}`} />
                </div>
            </div>
            <main className="home-edit-footer-main">
                <button className="home-edit-back-btn" onClick={onBackClick}>Back</button>
                <button className="home-edit-next-btn" disabled={!isStepCompleted} onClick={onNextClick}>Next</button>
            </main>
        </footer>
    )
}