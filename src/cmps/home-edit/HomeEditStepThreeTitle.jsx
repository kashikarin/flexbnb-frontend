import { useEffect, useState } from "react"
import { setStepCompleted } from "../../store/actions/home-edit.actions"
import { useSelector } from "react-redux"

export function HomeEditStepThreeTitle(){
    const potentialHome = useSelector(state => state.homeEditModule.potentialHome)
    const {currentSubStepStatus} = potentialHome.editProgress
    useEffect(()=>{
        if (!currentSubStepStatus) setStepCompleted()
    }, [])
        
    return(
        <section className='home-edit-step-3-title-container'>
            <article className="home-edit-step-3-title-text-container">
                <div className='home-edit-step-3-title-title'>
                    Step 3
                </div>
                <div className='home-edit-step-3-title-subtitle'>
                    Finish up and publish
                </div>
                <div className="home-edit-step-3-title-description">
                    Finally, you'll choose booking settings, set up pricing, and publish your listing.
                </div>
            </article>
            <article className="home-edit-step-3-title-video-container">
                <video src="https://stream.media.muscache.com/KeNKUpa01dRaT5g00SSBV95FqXYkqf01DJdzn01F1aT00vCI.mp4?v_q=high" autoPlay crossOrigin="anonymous" playsInline preload='auto' className="home-edit-step-3-video" />
            </article>
        </section>
    )
}