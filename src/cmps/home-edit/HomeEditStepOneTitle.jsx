import { useSelector } from 'react-redux'
import AccessDenied from '../AccessDenied'

export function HomeEditStepOneTitle() {
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)

  return loggedInUser ? (
    <section className="home-edit-step-1-title-container">
      <article className="home-edit-step-1-title-text-container">
        <div className="home-edit-step-1-title">Step 1</div>
        <div className="home-edit-step-1-title-subtitle">
          Tell us about your place
        </div>
        <div className="home-edit-step-1-title-description">
          In this step, we'll ask you which type of property you have and if
          guests will book the entire place or just a room. Then let us know the
          location and how many guests can stay.
        </div>
      </article>
      <article className="home-edit-step-1-title-video-container">
        <video
          src="https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high"
          autoPlay
          crossOrigin="anonymous"
          playsInline
          preload="auto"
          className="home-edit-step-1-title-video"
        />
      </article>
    </section>
  ) : (
    <AccessDenied />
  )
}
