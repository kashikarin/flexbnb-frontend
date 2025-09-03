import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ReactSVG } from 'react-svg'
import { updatePotentialHome } from "../../store/actions/home-edit.actions"

export function HomeEditStepFour(){
    const isStepCompleted = useSelector(state => state.homeEditModule.isStepCompleted)
    const potentialHome = useSelector(state => state.homeEditModule.potentialHome)
    const {bathCount, bedsCount, bedroomsCount, capacity} = potentialHome
    console.log(capacity)
    // useEffectUpdate(()=>{
    //     const updatedPotentialHome = { ...potentialHome, type: gHomeTypes[selectedType]}
    //     updatePotentialHome(updatedPotentialHome)
    // }, [selectedType])

    // function handleClick(typeIdx){
    //     if (typeIdx !== selectedType) {
    //         setSelectedType(typeIdx)
    //     }
    //     if (!isStepCompleted) setStepCompleted()
    // }

    return(
        <section className='home-edit-step-4-container'>
            <article className="home-edit-step-4-title">
                <h1>Share some basics about your place</h1>
                <span>You'll add more details later, like bed types.</span>
            </article>
            <article className="home-edit-step-4-inputs-container">
                <div className="home-edit-step-4-input guests-input">
                    <span>Guests</span>
                    <div className="home-edit-step-4-data guests">
                        <button 
                            onClick={()=>updatePotentialHome({...potentialHome, capacity: capacity - 1})}
                            disabled={capacity <= 0}
                        >
                            <ReactSVG src='/svgs/minus-icon.svg'/>
                        </button>
                        <span>{capacity}</span>
                        <button
                            onClick={()=>updatePotentialHome({...potentialHome, capacity: capacity + 1})}
                        >
                            <ReactSVG src='/svgs/plus-icon.svg'/>
                        </button>
                    </div>
                </div>
            </article>
        </section>
    )
}