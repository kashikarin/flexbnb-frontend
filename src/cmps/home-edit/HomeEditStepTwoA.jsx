import { useSelector } from 'react-redux'
import { updatePotentialHome } from '../../store/actions/home-edit.actions.js'
import { homeService } from '../../services/home'
import { ReactSVG } from 'react-svg'

export function HomeEditStepTwoA() {
  const potentialHome = useSelector(
    (state) => state.homeEditModule.potentialHome
  )

  console.log('🚀 ~ potentialHome:', potentialHome)
  const { gAmenities, getAmenityAnimatedSvgPath } = homeService

  function handleClick(amenity) {
    if (potentialHome?.amenities?.includes(amenity)) {
      const updatedAmenities = potentialHome?.amenities?.filter(
        (a) => a !== amenity
      )
      updatePotentialHome({
        ...potentialHome,
        amenities: [...updatedAmenities],
      })
    } else {
      updatePotentialHome({
        ...potentialHome,
        amenities: [...potentialHome.amenities, amenity],
      })
    }
  }

  return (
    <section
      className="home-edit-step-2-a-container"
      style={{ paddingBlockStart: '5em' }}
    >
      <article className="home-edit-step-2-a-title">
        <h1>Tell guests what your place has to offer</h1>
        <span>You can add more amenities after you publish your listing.</span>
      </article>
      <article className="home-edit-step-2-a-buttons-container">
        {gAmenities?.map((amenity, idx) => {
          const iconPath = getAmenityAnimatedSvgPath(amenity)
          // const IconComponent = homeService.icons.filled[iconName] || homeService.icons.filled.MdHome
          if (!iconPath) return null
          const selected = (potentialHome?.amenities ?? []).includes(amenity)
          return (
            <button
              key={idx}
              className={`home-edit-step-2-a-button amenity${idx + 1} ${
                selected ? 'selected' : ''
              }`}
              onClick={() => handleClick(amenity)}
            >
              <ReactSVG src={iconPath} />
              <span>{amenity}</span>
            </button>
          )
        })}
        {/* {gAmenities.map((amenity, i) => <button key={`${amenity}${i}`} >
                    <ReactSVG src={`/svgs/home-types/home-type${i+1}.svg`} className='home-amenity-icon' />          
                    <span>{amenity}</span>
                </button>)} */}
      </article>
    </section>
  )
}
