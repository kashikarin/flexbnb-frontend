import { gHomeTypes } from "../../services/home/home.service.local.js"
import { ReactSVG } from 'react-svg'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { setStepCompleted, setStepNotCompleted, updatePotentialHome } from "../../store/actions/home-edit.actions.js"

export function HomeEditStepOneA(){
    const potentialHome = useSelector(state => state.homeEditModule.potentialHome)
    const {type} = potentialHome
    
    useEffect(()=>{
        const shouldBeCompleted = !!type && !potentialHome.editProgress.currentSubStepStatus
        if (shouldBeCompleted) setStepCompleted()
        else setStepNotCompleted()
    }, [type])

console.log(potentialHome)

    return(
        <section className='home-edit-step-one-a-container'>
            <article className="home-edit-step-one-a-title">
                <h1>Which of these best describes your place?</h1>
            </article>
            <article className="home-edit-step-one-a-buttons-container">
                {gHomeTypes.map((homeType, i) => <button key={`${homeType}${i}`} className={`home-edit-step-one-a type${i+1} ${type === gHomeTypes[i]? 'selected' : ''}`} onClick={()=> updatePotentialHome({ ...potentialHome, type: gHomeTypes[i] })}>
                    <ReactSVG src={`/svgs/home-types/home-type${i+1}.svg`} className='home-type-icon' />          
                    <span>{gHomeTypes[i]}</span>
                </button>)}
            </article>
        </section>
    )
}