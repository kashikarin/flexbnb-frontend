import { useEffect } from "react"
import { useSelector } from "react-redux"
import { setStepCompleted } from "../../store/actions/home-edit.actions"

export function HomeEditStepTwoB(){
    const potentialHome = useSelector(state => state.homeEditModule.potentialHome)
    const {currentSubStepStatus} = potentialHome.editProgress

    useEffect(() => {
            if (!currentSubStepStatus) setStepCompleted()
        }, [currentSubStepStatus])

    return (
        <section className='home-edit-step-2-b-container'>
            <article className="home-edit-step-2-b-title">
                <h1>Add some photos of your apartment</h1>
                <span>You'll need 5 photos to get started. You can add more or make changes later.</span>
            </article>
            <article className="home-edit-step-2-b-image-upload">
                <div className="home-edit-step-2-b-image-upload-content">
                    <img src="https://a0.muscache.com/im/pictures/mediaverse/mys-amenities-n8/original/c83b2a87-3be4-43c9-ad47-12dd2aee24c4.jpeg" data-original-uri="https://a0.muscache.com/im/pictures/mediaverse/mys-amenities-n8/original/c83b2a87-3be4-43c9-ad47-12dd2aee24c4.jpeg">
                    </img>
                    <button>Add photos</button>
                </div>
            </article>
        </section>
    )
}