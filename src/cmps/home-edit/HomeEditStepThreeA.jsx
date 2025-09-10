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
    const placeholderPrice = 278

    useEffect(()=>{
        if (!potentialHome) return
        const shouldBeCompleted = (!!price || price === placeholderPrice) && 
            !potentialHome.editProgress.currentSubStepStatus
        if (shouldBeCompleted) setStepCompleted()
        // else setStepNotCompleted()
    }, [price])

    useEffectUpdate(()=>{
        debouncedUpdatePotentialHomeRef({...potentialHome, price})
    }, [price])

    function handleChange(e){
        let value = e.target.value
        // Remove non-digits
        value = value.replace(/\D/g, "")

        // Prevent leading zero
        if (value.startsWith("0")) {
        
        value = value.slice(1)
  }
        setPrice(value)
    }

    return (
        <section className='home-edit-step-3-a-container'>
            <article className="home-edit-step-3-a-title">
                <h1>Now, set a price per night</h1>
            </article>
            <article className="home-edit-step-3-a-price-wrapper">
                <div className="home-edit-step-3-a-price-content">  
                    <span>$</span>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete="off"
                        placeHolder={placeholderPrice}
                        value={price}
                        onChange={handleChange}
                    />
                    <button>
                        <ReactSVG src='/svgs/pencil.svg'/>
                    </button>
                </div>
            </article>
        </section>
    )
}