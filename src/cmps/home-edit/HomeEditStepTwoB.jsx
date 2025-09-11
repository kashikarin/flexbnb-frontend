import { useEffect } from "react"
import { useSelector } from "react-redux"
import { setStepCompleted } from "../../store/actions/home-edit.actions"
import { CloudinaryUploadButton } from "../../cmps/CloudinaryUploadButton"

export function HomeEditStepTwoB(){
    const potentialHome = useSelector(state => state.homeEditModule.potentialHome)
    const {currentSubStepStatus} = potentialHome.editProgress
    const { imageUrls = [] } = potentialHome

    useEffect(() => {
            if (!currentSubStepStatus) setStepCompleted()
        }, [currentSubStepStatus])

    function handlePhotoUpload(url) {
        const updatedHome = {
        ...potentialHome,
        imageUrls: [...imageUrls, url], // add uploaded photo
        }
        updatePotentialHome(updatedHome)
    }

    return (
        <section className='home-edit-step-2-b-container'>
            <article className="home-edit-step-2-b-title">
                <h1>Add some photos of your apartment</h1>
                <span>You'll need 5 photos to get started. You can add more or make changes later.</span>
            </article>
            <article className="home-edit-step-2-b-image-upload">
                <div className="home-edit-step-2-b-image-upload-content">
                    {/* Cover photo (first image) */}
                    {imageUrls[0] ? (
                        <img
                            src={imageUrls[0]}
                            alt="cover"
                            className="uploaded-photo cover-photo"
                        />
                        ) : (
                        <div className="upload-tile cover-photo">
                        <CloudinaryUploadButton
                            preset="flexbnb_listings_preset"
                            onUpload={handlePhotoUpload}
                        />
                        </div>
                    )}

                    {/* Next 4 photos */}
                    {imageUrls.slice(1, 5).map((url, idx) => (
                        <img
                        key={idx}
                        src={url}
                        alt={`home-${idx + 1}`}
                        className="uploaded-photo"
                        />
                    ))}

                    {/* Upload tile at the end */}
                    <div className="upload-tile">
                        <CloudinaryUploadButton
                        preset="flexbnb_listings_preset"
                        onUpload={handlePhotoUpload}
                        />
                    </div>
                </div>
            </article>
        </section>
    )
}