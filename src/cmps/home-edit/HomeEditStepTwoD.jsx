import { useSelector } from "react-redux"
import { updatePotentialHome } from "../../store/actions/home-edit.actions"
import { utilService } from "../../services/util.service"
import { useRef, useState, useEffect } from "react"
import { useEffectUpdate } from "../../customHooks/useEffectUpdate"

export function HomeEditStepTwoD(){
    const potentialHome = useSelector(state => state.homeEditModule.potentialHome)
    const maxLength = 500
    const {debounce} = utilService
    const debouncedUpdatePotentialHomeRef = useRef(debounce(updatePotentialHome, 300)).current
    const [summary, setSummary] = useState(potentialHome?.summary || null)

    useEffectUpdate(()=>{
                const shouldBeCompleted = !!potentialHome.summary
                if (shouldBeCompleted) setStepCompleted()
                else setStepNotCompleted()
        
            }, [potentialHome.summary]
    )

    useEffect(()=>{
        debouncedUpdatePotentialHomeRef({...potentialHome, summary})
    }, [summary])
return(
    <section className='home-edit-step-2-d-container'>
        <article className="home-edit-step-2-d-title">
            <h1>Now, let's give your apartment a title</h1>
            <span>Short titles work best. Have fun with it—you can always change it later.</span>
        </article>
        <article className="home-edit-step-2-d-txt-container">
            <div className="home-edit-step-2-d-txt-box">
                <textarea rows='7' maxLength={500} id='potentialHome.summary' autoComplete="off" value={summary} onChange={(e)=>setSummary(e.target.value) }/>
            </div>   
        <span>{`${potentialHome?.summary?.length}/${maxLength}`}</span>                
        </article>
    </section>
    )
}