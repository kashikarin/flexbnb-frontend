import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  setStepCompleted,
  updatePotentialHome,
} from '../../store/actions/home-edit.actions'
import { CloudinaryDragUpload } from '../CloudinaryUploadButton'

export function HomeEditStepTwoB() {
  const potentialHome = useSelector(
    (state) => state.homeEditModule.potentialHome
  )
  const { currentSubStepStatus } = potentialHome.editProgress
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

  function handleRemovePhoto(indexToRemove) {
    const updatedImageUrls = imageUrls.filter(
      (_, index) => index !== indexToRemove
    )
    const updatedHome = {
      ...potentialHome,
      imageUrls: updatedImageUrls,
    }
    updatePotentialHome(updatedHome)
  }

  const remainingPhotos = Math.max(0, 5 - imageUrls.length)

  return (
    <section
      className="home-edit-step-2-b-container"
      style={{ alignItems: 'unset' }}
    >
      <article className="home-edit-step-2-b-title">
        <h1>Add Photos of Your Property</h1>
        <span>
          You need at least 5 photos to proceed.{' '}
          {remainingPhotos > 0 && ` (Remaining: ${remainingPhotos} photos)`}
        </span>
      </article>

      <article className="home-edit-step-2-b-image-upload">
        <div className="home-edit-step-2-b-image-upload-content">
          {imageUrls.length > 0 ? (
            <div className="cover-photo-wrapper">
              <img
                src={imageUrls[0]}
                alt="cover"
                className="uploaded-photo cover-photo"
              />
              <span className="photo-label">Cover Photo</span>×
              <button
                className="remove-photo-btn"
                onClick={() => handleRemovePhoto(0)}
                aria-label="Remove photo"
              >
                X
              </button>
            </div>
          ) : (
            <div className="upload-tile cover-photo">
              <CloudinaryDragUpload
                preset="profile_images"
                onUpload={handlePhotoUpload}
                className="cover-upload"
              />
            </div>
          )}

          {/* Next 4 photos */}
          {imageUrls.slice(1, 5).map((url, idx) => (
            <div key={idx} className="photo-wrapper">
              <img
                src={url}
                alt={`home-${idx + 1}`}
                className="uploaded-photo"
              />
              <button
                className="remove-photo-btn"
                onClick={() => handleRemovePhoto(idx + 1)}
                aria-label="Remove photo"
              >
                ×
              </button>
            </div>
          ))}

          {Array.from({
            length: Math.min(4, Math.max(0, 5 - imageUrls.length)),
          }).map((_, idx) => (
            <div key={`upload-${idx}`} className="upload-tile">
              <CloudinaryDragUpload
                preset="profile_images"
                onUpload={handlePhotoUpload}
              />
            </div>
          ))}

          {imageUrls.length >= 5 && (
            <div className="upload-tile additional">
              <CloudinaryDragUpload
                preset="profile_images"
                onUpload={handlePhotoUpload}
              />
            </div>
          )}
        </div>

        <div className="upload-progress-indicator">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(100, (imageUrls.length / 5) * 100)}%`,
              }}
            ></div>
          </div>
          <span className="progress-text">
            {imageUrls.length} out of 5 required photos
          </span>
        </div>
      </article>
    </section>
  )
}
