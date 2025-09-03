import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ReactSVG } from 'react-svg'
import { setStepCompleted, updatePotentialHome, setStepNotCompleted } from "../../store/actions/home-edit.actions"
setStepCompleted
export function HomeEditStepOneC(){
    const isStepCompleted = useSelector(state => state.homeEditModule.isStepCompleted)
    const potentialHome = useSelector(state => state.homeEditModule.potentialHome)
    const {bathCount, bedsCount, bedroomsCount, capacity} = potentialHome

    useEffect(()=>{
        if (bathCount && bedsCount && bedroomsCount && capacity) setStepCompleted()
        else setStepNotCompleted()

    }, [potentialHome])
    
    return(
        <section className='home-edit-step-one-c-container'>
            <article className="home-edit-step-one-c-title">
                <h1>Share some basics about your place</h1>
                <span>You'll add more details later, like bed types.</span>
            </article>
            <article className="home-edit-step-one-c-inputs-container">
                <div className="home-edit-step-one-c-input guests-input">
                    <span>Guests</span>
                    <div className="home-edit-step-one-c-data guests">
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
                <div className="home-edit-step-one-c-input bedrooms-input">
                    <span>Bedrooms</span>
                    <div className="home-edit-step-one-c-data bedrooms">
                        <button 
                            onClick={()=> updatePotentialHome({...potentialHome, bedroomsCount: bedroomsCount - 1})}
                            disabled={bedroomsCount <= 0}
                        >
                            <ReactSVG src='/svgs/minus-icon.svg'/>
                        </button>
                        <span>{bedroomsCount}</span>
                        <button
                            onClick={()=>updatePotentialHome({...potentialHome, bedroomsCount: bedroomsCount + 1})}
                        >
                            <ReactSVG src='/svgs/plus-icon.svg'/>
                        </button>
                    </div>
                </div>
                <div className="home-edit-step-one-c-input beds-input">
                    <span>Beds</span>
                    <div className="home-edit-step-one-c-data beds">
                        <button 
                            onClick={()=> updatePotentialHome({...potentialHome, bedsCount: bedsCount - 1})}
                            disabled={bedsCount <= 0}
                        >
                            <ReactSVG src='/svgs/minus-icon.svg'/>
                        </button>
                        <span>{bedsCount}</span>
                        <button
                            onClick={()=>updatePotentialHome({...potentialHome, bedsCount: bedsCount + 1})}
                        >
                            <ReactSVG src='/svgs/plus-icon.svg'/>
                        </button>
                    </div>
                </div>
                <div className="home-edit-step-one-c-input beds-input">
                    <span>Bathrooms</span>
                    <div className="home-edit-step-one-c-data bathrooms">
                        <button 
                            onClick={()=> updatePotentialHome({...potentialHome, bathCount: bathCount - 1})}
                            disabled={bathCount <= 0}
                        >
                            <ReactSVG src='/svgs/minus-icon.svg'/>
                        </button>
                        <span>{bathCount}</span>
                        <button
                            onClick={()=>updatePotentialHome({...potentialHome, bathCount: bathCount + 1})}
                        >
                            <ReactSVG src='/svgs/plus-icon.svg'/>
                        </button>
                    </div>
                </div>
            </article>
        </section>
    )
}