import { useEffect, useState } from 'react'
import {HomeEditStepOne} from '../cmps/home-edit/HomeEditStepOne'
import {HomeEditStepTwo} from '../cmps/home-edit/HomeEditStepTwo'
import { useSelector } from 'react-redux'
import { HomeEditStepThree } from '../cmps/home-edit/HomeEditStepThree'
import { HomeEditStepFour } from '../cmps/home-edit/HomeEditStepFour'

export function HomeEdit(){
    const step = useSelector(state => state.homeEditModule.step)
    const [displayedStep, setDisplayedStep] = useState(step.number)   
    const [isVisible, setIsVisible] = useState(true)

    useEffect(()=>{
        if (step.number === displayedStep) return //should occur only in step 1
        setIsVisible(false); // start fade-out animation

        const timeout = setTimeout(() => {
            setDisplayedStep(step.number); //set the displayedStep 0.6s after the next-click     
            setIsVisible(true); //start fade-in animation
            // setIsStepCompleted(false)       
        }, 600); 

        return () => clearTimeout(timeout);
    }, [step.number])
    
    function renderStepComponent(){
        switch(displayedStep){
            case 1:
                return <HomeEditStepOne />
            case 2:
                return <HomeEditStepTwo /> 
            case 3:
                return <HomeEditStepThree /> 
            case 4:
                return <HomeEditStepFour /> 
            case 5:
                return <HomeEditStepFive /> 
            default: 
                return null
        }
    }
    
    return(
        <section className='home-edit-container'>
            <div className={`home-edit-main ${isVisible? 'fade-in' : 'fade-out' }`}>
                {renderStepComponent()}
            </div>
        </section>
    )
}