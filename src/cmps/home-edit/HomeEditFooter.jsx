import { useContext } from "react"
import { HomeEditContext } from "../../context/home-edit/HomeEditContext"

export function HomeEditFooter(){
    const {step, setStep} = useContext(HomeEditContext)

    return(
        <footer className="home-edit-footer">
            <div className="home-edit-footer-loader-container">
                <div className="home-edit-footer-loader step-1">
                    <div className="home-edit-footer-loader-progress step-1" />
                </div>
                <div className="home-edit-footer-loader step-2">
                    <div className="home-edit-footer-loader-progress step-2" />
                </div>
                <div className="home-edit-footer-loader step-3">
                    <div className="home-edit-footer-loader-progress step-3" />
                </div>
            </div>
            <main className="home-edit-footer-main">
                <button className="home-edit-back-btn" onClick={setStep(prev => prev > 1 ? prev - 1 : 0)}>Back</button>
                <button className="home-edit-next-btn" onClick={setStep(prev => prev + 1)}>Next</button>
            </main>
        </footer>
    )
}