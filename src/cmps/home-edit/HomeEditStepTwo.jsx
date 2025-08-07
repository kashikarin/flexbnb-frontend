import { useContext } from "react"
import { gHomeTypes } from "../../services/home/home.service.local.js"
import { ReactSVG } from 'react-svg'
import { HomeEditContext } from "../../context/home-edit/HomeEditContext.jsx"
import { useState } from "react"

export function HomeEditStepTwo(){
    const {setIsStepCompleted, isStepCompleted} = useContext(HomeEditContext)
    const [selectedLabel, setSelectedLabel] = useState(null)
    
    function handleClick(labelIdx){
        if (labelIdx !== selectedLabel) {
            setSelectedLabel(labelIdx)
        }
        if (!isStepCompleted) setIsStepCompleted(true)
    }

    return(
        <section className='home-edit-step-2-container'>
            <article className="home-edit-step-2-title">
                <h1>Which of these best describes your place?</h1>
            </article>
            <article className="home-edit-step-2-labels-container">
                {gHomeTypes.map((homeType, i) => <button key={`${homeType}${i}`} className={`home-edit-step-2-label label${i+1} ${selectedLabel === i? 'selected' : ''}`} onClick={()=> handleClick(i)}>
                    <ReactSVG src={`/svgs/home-types/home-type${i+1}.svg`} className='home-type-icon' />          
                    <span>{gHomeTypes[i]}</span>
                </button>)}
            </article>
        </section>
    )
}