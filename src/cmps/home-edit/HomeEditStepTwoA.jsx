import { ReactSVG } from 'react-svg'
import { useSelector } from "react-redux"
import { setStepCompleted, updatePotentialHome } from "../../store/actions/home-edit.actions.js"
import { amenityIcons, homeService } from '../../services/home/home.service.local.js'
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

export function HomeEditStepTwoA(){
    const isStepCompleted = useSelector(state => state.homeEditModule.isStepCompleted)
    const potentialHome = useSelector(state => state.homeEditModule.potentialHome)
    const {gAmenities} = homeService
    // const amentityIconsList = Object.values(amenityIcons)
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
    function handleClick(amentity){
        if (potentialHome.amentities.includes(amentity)) {
            const updatedAmentities = potentialHome.amentities.filter(a => a !== amentity)
            updatePotentialHome({...potentialHome, amentities: updatedAmentities})
        } else {
            updatePotentialHome({...potentialHome, amentities: [potentialHome.amentities, amentity]})
        }
    }
    return(
        <section className='home-edit-step-2-a-container'>
            <article className="home-edit-step-2-a-title">
                <h1>Tell guests what your place has to offer</h1>
                <span>You can add more amenities after you publish your listing.</span>
            </article>
            <article className="home-edit-step-2-a-buttons-container">
                
                    {gAmenities.map((amenity, idx) => {
                    const iconName = homeService.getAmenityIcon(amenity)
                    const IconComponent = iconComponents[iconName]
                    return (
                        <button key={idx} className={`home-edit-step-2-a-button amentity${idx+1} ${potentialHome?.amentities?.includes(amentity)? 'selected' : ''}`} onClick={handleClick}>
                            <IconComponent className='home-edit-step-2-amenity-icon' />
                            <span>{amenity}</span>
                        </button>
                    )
                    })}
                {/* {gAmenities.map((amentity, i) => <button key={`${amentity}${i}`} >
                    <ReactSVG src={`/svgs/home-types/home-type${i+1}.svg`} className='home-amentity-icon' />          
                    <span>{amentity}</span>
                </button>)} */}
                
            </article>
        </section>
    )
}