import { useContext, useEffect, useState } from 'react'
import {HomeEditStepOne} from '../cmps/home-edit/HomeEditStepOne'
import {HomeEditStepTwo} from '../cmps/home-edit/HomeEditStepTwo'
import { HomeEditContext } from '../context/home-edit/HomeEditContext'


export function HomeEdit(){
    const {step, setIsStepCompleted} = useContext(HomeEditContext)
    const [displayedStep, setDisplayedStep] = useState(step)   
    const [isVisible, setIsVisible] = useState(true)

    useEffect(()=>{
        if (step === displayedStep) return //should occur only in step 1
        setIsVisible(false); // start fade-out animation

        const timeout = setTimeout(() => {
            setDisplayedStep(step); //set the displayedStep 0.6s after the next-click     
            setIsVisible(true); //start fade-in animation
            setIsStepCompleted(false)       
        }, 600); 

        return () => clearTimeout(timeout);
    }, [step])
    
    function renderStepComponent(){
        switch(displayedStep){
            case 1:
                return <HomeEditStepOne />
            case 2:
                return <HomeEditStepTwo />      
            default: 
                return null
        }
    }
    
    return(
        <section className="home-edit-container">
            <div className={`home-edit-main ${isVisible? 'fade-in' : 'fade-out' }`}>
                {renderStepComponent()}
            </div>
        </section>
    )
}