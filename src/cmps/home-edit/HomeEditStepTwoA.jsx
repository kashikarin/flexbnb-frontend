import { useSelector } from 'react-redux'
import {
  setStepCompleted,
  updatePotentialHome,
} from '../../store/actions/home-edit.actions.js'
import { homeService } from '../../services/home'
import {
  MdTv,
  MdKitchen,
  MdWifi,
  MdSmokingRooms,
  MdPets,
  MdRestaurantMenu,
  MdLocalParking,
  MdAcUnit,
  MdThermostat,
  MdLocalLaundryService,
  MdDryCleaning,
  MdPool,
  MdHotTub,
  MdFitnessCenter,
  MdBeachAccess,
  MdBalcony,
  MdLocalFlorist,
  MdOutdoorGrill,
  MdFireplace,
  MdPiano,
  MdSportsEsports,
  MdWork,
  MdChildCare,
  MdChair,
  MdSecurity,
  MdHome,
} from 'react-icons/md'
import { useEffect } from 'react'

export function HomeEditStepTwoA() {
  const potentialHome = useSelector(
    (state) => state.homeEditModule.potentialHome
  )
  console.log('🚀 ~ potentialHome:', potentialHome)
  const currentSubStepStatus = potentialHome?.editProgress?.currentSubStepStatus
  const { gAmenities } = homeService
  const iconComponents = {
    MdTv,
    MdKitchen,
    MdWifi,
    MdSmokingRooms,
    MdPets,
    MdRestaurantMenu,
    MdLocalParking,
    MdAcUnit,
    MdThermostat,
    MdLocalLaundryService,
    MdDryCleaning,
    MdPool,
    MdHotTub,
    MdFitnessCenter,
    MdBeachAccess,
    MdBalcony,
    MdLocalFlorist,
    MdOutdoorGrill,
    MdFireplace,
    MdPiano,
    MdSportsEsports,
    MdWork,
    MdChildCare,
    MdChair,
    MdSecurity,
    MdHome,
  }
  useEffect(() => {
    if (currentSubStepStatus === false) setStepCompleted()
  }, [currentSubStepStatus])

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
    <section className="home-edit-step-2-a-container">
      <article className="home-edit-step-2-a-title">
        <h1>Tell guests what your place has to offer</h1>
        <span>You can add more amenities after you publish your listing.</span>
      </article>
      <article className="home-edit-step-2-a-buttons-container">
        {gAmenities?.map((amenity, idx) => {
          const IconComponent =
            iconComponents[homeService.getAmenityIcon(amenity)]
          if (!IconComponent) return null
          const selected = (potentialHome?.amenities ?? []).includes(amenity)
          return (
            <button
              key={idx}
              className={`home-edit-step-2-a-button amenity${idx + 1} ${
                selected ? 'selected' : ''
              }`}
              onClick={() => handleClick(amenity)}
            >
              <IconComponent className="home-edit-step-2-amenity-icon" />
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
