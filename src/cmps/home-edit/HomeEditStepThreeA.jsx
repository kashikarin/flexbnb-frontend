import { useSelector } from "react-redux"
import { setStepCompleted, setStepNotCompleted, updatePotentialHome } from "../../store/actions/home-edit.actions"
import {useEffectUpdate } from '../../customHooks/useEffectUpdate'
import { useEffect, useRef, useState } from "react"
import { utilService } from "../../services/util.service"
import { ReactSVG } from 'react-svg'


export function HomeEditStepThreeA(){
    const potentialHome = useSelector(state => state.homeEditModule.potentialHome)
    const [price, setPrice] = useState(potentialHome?.price ?? '')
    const {debounce} = utilService
    const debouncedUpdatePotentialHomeRef = useRef(debounce(updatePotentialHome, 300)).current

    useEffectUpdate(()=>{
        debouncedUpdatePotentialHomeRef({...potentialHome, price})
    }, [price])

    return (
        <section className='home-edit-step-3-a-container'>
            <article className="home-edit-step-3-a-title">
                <h1>Now, set a price per night</h1>
            </article>
            <article className="home-edit-step-3-a-price-wrapper">
                <div className="home-edit-step-3-a-price-content">  
                    <span>₪</span>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete="off"
                        placeHolder='278'
                        value={potentialHome?.price}
                        onChange={(e)=>setPrice(e.target.value)}
                    />
                    <button>
                        <ReactSVG src='/svgs/pencil.svg'/>
                    </button>
                </div>
            </article>
        </section>
    )
}