import { useContext } from "react"
import { HomeEditContext } from "../../context/home-edit/HomeEditContext"

export function HomeEditStepOne(){
    const {setIsStepCompleted} = useContext(HomeEditContext)
    setIsStepCompleted(true)
    
    return(
        <section className='home-edit-step-1-container'>
            <article className="home-edit-step-1-text-container">
                <div className='home-edit-step-1-title'>
                    Step 1
                </div>
                <div className='home-edit-step1-subtitle'>
                    Tell us about your place
                </div>
                <div className="home-edit-step-1-description">
                    In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.
                </div>
            </article>
            <article className="home-edit-step-1-video-container">
                <video src="https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high" autoPlay crossOrigin="anonymous" playsInline preload='auto' className="home-edit-step-1-video" />
            </article>
        </section>
    )
}