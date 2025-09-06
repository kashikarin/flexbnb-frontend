import { useEffect, useState } from "react"
import { setStepCompleted } from "../../store/actions/home-edit.actions"
import { useSelector } from "react-redux"

export function HomeEditStepTwoTitle(){
    const potentialHome = useSelector(state => state.homeEditModule.potentialHome)
    const {currentSubStepStatus} = potentialHome.editProgress
    useEffect(()=>{
        if (!currentSubStepStatus) setStepCompleted()
    }, [])
        
    return(
        <section className='home-edit-step-2-title-container'>
            <article className="home-edit-step-2-title-text-container">
                <div className='home-edit-step-2-title-title'>
                    Step 2
                </div>
                <div className='home-edit-step-2-title-subtitle'>
                    Make your place stand out
                </div>
                <div className="home-edit-step-2-title-description">
                    In this step, you’ll add some of the amenities your place offers, plus two-title or more photos. Then, you’ll create a title and description.
                </div>
            </article>
            <article className="home-edit-step-2-title-video-container">
                <video src="https://stream.media.muscache.com/H0101WTUG2qWbyFhy02jlOggSkpsM9H02VOWN52g02oxhDVM.mp4?v_q=high" autoPlay crossOrigin="anonymous" playsInline preload='auto' className="home-edit-step-5-video" />
            </article>
        </section>
    )
}