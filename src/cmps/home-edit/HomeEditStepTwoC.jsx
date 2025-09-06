import { useSelector } from "react-redux"
import { setStepCompleted, setStepNotCompleted, updatePotentialHome } from "../../store/actions/home-edit.actions"
import {useEffectUpdate } from '../../customHooks/useEffectUpdate'
import { useEffect, useRef, useState } from "react"
import { utilService } from "../../services/util.service"

export function HomeEditStepTwoC(){
    const potentialHome = useSelector(state => state.homeEditModule.potentialHome)
    const maxLength = 50
    const {debounce} = utilService
    const debouncedUpdatePotentialHomeRef = useRef(debounce(updatePotentialHome, 300)).current

    useEffectUpdate(()=>{
            const shouldBeCompleted = !!potentialHome.name
            if (shouldBeCompleted) setStepCompleted()
            else setStepNotCompleted()
    
        }, [potentialHome.name])
    
    const [name, setName] = useState(potentialHome?.name || null)
    useEffect(()=>{
        debouncedUpdatePotentialHomeRef({...potentialHome, name})
    }, [name])

    return (
        <section className='home-edit-step-2-c-container'>
            <article className="home-edit-step-2-c-title">
                <h1>Now, let's give your apartment a title</h1>
                <span>Short titles work best. Have fun with it—you can always change it later.</span>
            </article>
            <article className="home-edit-step-2-c-txt-container">
                <div className="home-edit-step-2-c-txt-box">
                    <textarea rows='5' maxLength={50} id='potentialHome.name' autoComplete="off" value={name} onChange={(e)=>setName(e.target.value)} />
                </div>   
            <span>{`${potentialHome?.name?.length}/${maxLength}`}</span>                
            </article>
        </section>
    )
}