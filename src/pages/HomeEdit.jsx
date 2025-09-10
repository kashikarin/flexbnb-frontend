import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {HomeEditStepOneTitle} from '../cmps/home-edit/HomeEditStepOneTitle'
import {HomeEditStepOneA} from '../cmps/home-edit/HomeEditStepOneA'
import { HomeEditStepOneB } from '../cmps/home-edit/HomeEditStepOneB'
import { HomeEditStepOneC } from '../cmps/home-edit/HomeEditStepOneC'
import { HomeEditStepTwoTitle } from '../cmps/home-edit/HomeEditStepTwoTitle'
import { HomeEditStepTwoA } from '../cmps/home-edit/HomeEditStepTwoA'
import { HomeEditStepTwoB } from '../cmps/home-edit/HomeEditStepTwoB'
import { HomeEditStepTwoC } from '../cmps/home-edit/HomeEditStepTwoC'
import { HomeEditStepTwoD } from '../cmps/home-edit/HomeEditStepTwoD'
import { HomeEditStepThreeTitle } from '../cmps/home-edit/HomeEditStepThreeTitle'
import { HomeEditStepThreeA } from '../cmps/home-edit/HomeEditStepThreeA'

export function HomeEdit(){
    const currentStep = useSelector(
        state => state.homeEditModule.potentialHome?.editProgress?.currentStep ?? 1
    )
    console.log("🚀 ~ currentStep:", currentStep)
    const currentSubStep = useSelector(
        state => state.homeEditModule.potentialHome?.editProgress?.currentSubStep ?? 1
    )
    console.log("🚀 ~ currentSubStep:", currentSubStep)
    const [displayedStep, setDisplayedStep] = useState(currentStep)
    const [displayedSubStep, setDisplayedSubStep] = useState(currentSubStep)
    const [isVisible, setIsVisible] = useState(true)

    const homeEditComponents = {
        1: {
            1: <HomeEditStepOneTitle/>,
            2: <HomeEditStepOneA />,
            3: <HomeEditStepOneB />,
            4: <HomeEditStepOneC />
        },
        2: {
            1: <HomeEditStepTwoTitle />,
            2: <HomeEditStepTwoA />,
            3: <HomeEditStepTwoB />,
            4: <HomeEditStepTwoC />,
            5: <HomeEditStepTwoD />
        },
        3: {
            1: <HomeEditStepThreeTitle />,
            2: <HomeEditStepThreeA />
        }
    }

    function renderStepComponent() {
        return homeEditComponents[currentStep]?.[currentSubStep] || null
    }

    useEffect(()=>{
        if (currentStep === displayedStep && currentSubStep === displayedSubStep) return //should occur only in step 1
        setIsVisible(false); // start fade-out animation

        const timeout = setTimeout(() => {
            setDisplayedStep(currentStep)
            setDisplayedSubStep(currentSubStep)     
            setIsVisible(true); //start fade-in animation
            // setIsStepCompleted(false)       
        }, 600); 

        return () => clearTimeout(timeout);
    }, [currentStep, currentSubStep])
    
    return(
        <section className='home-edit-container'>
            <div className={`home-edit-main ${isVisible? 'fade-in' : 'fade-out' }`}>
                {renderStepComponent()}
            </div>
        </section>
    )
}