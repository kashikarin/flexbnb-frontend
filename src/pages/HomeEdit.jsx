import { useEffect, useState } from 'react'
import {HomeEditStepOneTitle} from '../cmps/home-edit/HomeEditStepOneTitle'
import {HomeEditStepOneA} from '../cmps/home-edit/HomeEditStepOneA'
import { useSelector } from 'react-redux'
import { HomeEditStepOneB } from '../cmps/home-edit/HomeEditStepOneB'
import { HomeEditStepOneC } from '../cmps/home-edit/HomeEditStepOneC'
import { HomeEditStepTwoTitle } from '../cmps/home-edit/HomeEditStepTwoTitle'
import { HomeEditStepTwoA } from '../cmps/home-edit/HomeEditStepTwoA'

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
                return <HomeEditStepOneTitle />
            case 2:
                return <HomeEditStepOneA /> 
            case 3:
                return <HomeEditStepOneB /> 
            case 4:
                return <HomeEditStepOneC /> 
            case 5:
                return <HomeEditStepTwoTitle /> 
            case 6:
                return <HomeEditStepTwoA /> 
            case 7:
                return <HomeEditStepTwoB />
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