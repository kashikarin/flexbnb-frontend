import { useSelector } from "react-redux"
import { clearPotentialHome, closeHomeEditCompletionModal, openHomeEditCompletionModal, setStepCompleted, setStepNotCompleted, updatePotentialHome } from "../../store/actions/home-edit.actions"
import {useEffectUpdate } from '../../customHooks/useEffectUpdate'
import { useEffect, useRef, useState } from "react"
import { utilService } from "../../services/util.service"
import { ReactSVG } from 'react-svg'
import { potentialHomeService } from "../../services/potential-home/potential-home.service.local"
import { HomeEditCompletionModal } from "./HomeEditCompletionModal"
import { addHome } from '../../store/actions/home.actions.js'

export function HomeEditStepThreeA(){
    const potentialHome = useSelector(state => state.homeEditModule.potentialHome)
    const [price, setPrice] = useState(potentialHome?.price ?? '')
    const {debounce} = utilService
    const debouncedUpdatePotentialHomeRef = useRef(debounce(updatePotentialHome, 300)).current
    const placeholderPrice = 278
    const {currentStep, currentSubStep} = potentialHome.editProgress
    const effectivePrice = price === "" ? placeholderPrice : Number(price)
    const {gTotalSteps, gSubStepsPerStep} = potentialHomeService
    const isHomeEditCompletionModalOpen = useSelector(state => state.homeEditModule.isHomeEditCompletionModalOpen)    

    useEffect(()=>{
        if (!potentialHome) return
        const shouldBeCompleted = !!effectivePrice && !potentialHome.editProgress.currentSubStepStatus
        if (shouldBeCompleted) setStepCompleted()
        // else setStepNotCompleted()
    }, [effectivePrice])

    useEffectUpdate(()=>{
        debouncedUpdatePotentialHomeRef({...potentialHome, price: effectivePrice})
    }, [effectivePrice])

    function handleChange(e){
        let value = e.target.value
        // Remove non-digits
        value = value.replace(/\D/g, "")
        // Prevent leading zero
        if (value.startsWith("0")) value = value.slice(1)
        setPrice(value)
    }

    useEffect(()=>{
        const isProcessComplete = currentStep === gTotalSteps && currentSubStep === gSubStepsPerStep[gTotalSteps - 1] + 1
        if (isProcessComplete) openHomeEditCompletionModal()
    }, [currentSubStep])

    return (
        <>
            <section className='home-edit-step-3-a-container'>
                <article className="home-edit-step-3-a-title">
                    <h1>Now, set a price per night</h1>
                </article>
                <article className="home-edit-step-3-a-price-wrapper">
                    <span>$</span>
                    <input
                        type="text"
                        style={{ "--chars": (price || String(placeholderPrice)).length }}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete="off"
                        placeholder={placeholderPrice}
                        value={price}
                        onChange={handleChange}
                    />
                    <button>
                        <ReactSVG src='/svgs/pencil.svg'/>
                    </button>
                </article>
            </section>
            {isHomeEditCompletionModalOpen && (
                <HomeEditCompletionModal 
                    potentialHome={potentialHome}
                    closeHomeEditCompletionModal={closeHomeEditCompletionModal}
                    addHome={addHome}
                    clearPotentialHome={clearPotentialHome}
                />    
            )}
        </>
        
    )
}