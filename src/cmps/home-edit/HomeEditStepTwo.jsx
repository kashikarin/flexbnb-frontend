import { gHomeTypes } from "../../services/home/home.service.local.js"
import { ReactSVG } from 'react-svg'
import { useState } from "react"
import { useSelector } from "react-redux"
import { setStepCompleted, updatePotentialHome } from "../../store/actions/home-edit.actions.js"
import { useEffectUpdate } from "../../customHooks/useEffectUpdate.js"

export function HomeEditStepTwo(){
    
    const isStepCompleted = useSelector(state => state.homeEditModule.isStepCompleted)
    const potentialHome = useSelector(state => state.homeEditModule.potentialHome)
    const [selectedType, setSelectedType] = useState(null)
    
    useEffectUpdate(()=>{
        const updatedPotentialHome = { ...potentialHome, type: gHomeTypes[selectedType]}
        updatePotentialHome(updatedPotentialHome)
    }, [selectedType])

    function handleClick(typeIdx){
        if (typeIdx !== selectedType) {
            setSelectedType(typeIdx)
        }
        if (!isStepCompleted) setStepCompleted()
    }

    return(
        <section className='home-edit-step-2-container'>
            <article className="home-edit-step-2-title">
                <h1>Which of these best describes your place?</h1>
            </article>
            <article className="home-edit-step-2-container">
                {gHomeTypes.map((homeType, i) => <button key={`${homeType}${i}`} className={`home-edit-step-2 type${i+1} ${selectedType === i? 'selected' : ''}`} onClick={()=> handleClick(i)}>
                    <ReactSVG src={`/svgs/home-types/home-type${i+1}.svg`} className='home-type-icon' />          
                    <span>{gHomeTypes[i]}</span>
                </button>)}
            </article>
        </section>
    )
}