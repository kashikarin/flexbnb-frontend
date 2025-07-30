import { useState } from 'react'
import {HomeEditStepOne} from '../cmps/home-edit/HomeEditStepOne'

export function HomeEdit(){
    const [step, setStep] = useState(1)

    return(
        <section className="home-edit-container">
            <div className="home-edit-main">
                <div className="home-edit-form">
                    <div className={`home-edit-step-1 ${step === 1? 'selected' : ''}`}>
                        <HomeEditStepOne />
                    </div>
                </div>
            </div>
            
        </section>
    )
}