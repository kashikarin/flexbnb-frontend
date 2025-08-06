import { useState } from 'react'
import {HomeEditStepOne} from '../cmps/home-edit/HomeEditStepOne'
import { HomeEditFooter } from '../cmps/home-edit/HomeEditFooter'

export function HomeEdit(){
    const [step, setStep] = useState(1)

    return(
        <section className="home-edit-container">
            <div className="home-edit-main">
                {step === 1 && <HomeEditStepOne />}
            </div>
            <HomeEditFooter />
        </section>
    )
}