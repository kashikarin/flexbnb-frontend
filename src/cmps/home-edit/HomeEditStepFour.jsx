import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export function HomeEditStepFour(){
    const isStepCompleted = useSelector(state => state.homeEditModule.isStepCompleted)
    const potentialHome = useSelector(state => state.homeEditModule.potentialHome)
    const [selectedType, setSelectedType] = useState(null)
    
    return(
        <section className='home-edit-step-4-container'>
            <article className="home-edit-step-4-title">
                <h1>Share some basics about your place</h1>
                <span>You'll add more details later, like bed types.</span>
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