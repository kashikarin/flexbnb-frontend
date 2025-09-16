const { DEV, VITE_LOCAL } = import.meta.env
import { getRandomIntInclusive, makeId } from '../util.service'

import { homeService as local } from './home.service.local'
import { homeService as remote } from './home.service.remote'

function getEmptyHome() {
  return {
    vendor: makeId(),
    price: getRandomIntInclusive(1000, 9000),
    speed: getRandomIntInclusive(80, 240),
    msgs: [],
  }
}

function getDefaultFilter() {
  return {
    city: '',
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
    type: '',
    minPrice: 0,
    maxPrice: '',
    amenities: [],
    bedRoomsCount: 0,
    bedsCount: 0,
    bathCount: 0,
    labels: [],
    checkIn: '',
    checkOut: '',
  }
}

export function getFilterFromSearchParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || ''
  }
  return filterBy
}

const gHomeTypes = ['House', 'Apartment', 'Guesthouse', 'Hotel']

const gAmenities = [
  'Wifi',
  'TV',
  'Kitchen',
  'Washer',
  'Free parking on premises',
  'Paid parking on premises',
  'Air conditioning',
  'Dedicated workspace',
  'Pool',
  'Hot tub',
  'Patio',
  'BBQ grill',
  'Outdoor dining area',
  'Fire pit',
  'Pool table',
  'Indoor fireplace',
  'Piano',
  'Exercise equipment',
  'Lake access',
  'Beach access',
  'Ski-in/Ski-out',
  'Outdoor shower',
  'Smoke alarm',
  'First aid kit',
  'Fire extinguisher',
  'Carbon monoxide alarm'  
]

const amenityIconsMap = {
  'Wifi': '/svgs/amenities/wifi.svg',
  'TV': '/svgs/amenities/tv.svg',
  'Kitchen': '/svgs/amenities/kitchen.svg',
  'Washer': '/svgs/amenities/washer.svg',
  'Free parking on premises': '/svgs/amenities/freeParkingOnPremises.svg',
  'Paid parking on premises': '/svgs/amenities/paidParkingOnPremises.svg',
  'Air Conditioning': '/svgs/amenities/airConditioning.svg',
  'Dedicated workspace': '/svgs/amenities/dedicatedWorkspace.svg',
  'Pool': '/svgs/amenities/pool.svg',
  'HotTub': '/svgs/amenities/hotTub.svg',
  'Patio': '/svgs/amenities/patio.svg',
  'BBQ Grill': '/svgs/amenities/bbqGrill.svg',
  'Outdoor dining area': '/svgs/amenities/outdoorDiningArea.svg',
  'Fire pit': '/svgs/amenities/firePit.svg',
  'Pool table': '/svgs/amenities/poolTable.svg',
  'Indoor fireplace': '/svgs/amenities/indoorFireplace.svg',
  'Piano': '/svgs/amenities/piano.svg',
  'Exercise equipment': '/svgs/amenities/exerciseEquipment.svg',
  'Lake access': '/svgs/amenities/lakeAccess.svg',
  'Beach access': '/svgs/amenities/beachAccess.svg',
  'Ski-in/Ski-out': '/svgs/amenities/skiInSkiOut.svg',
  'Outdoor shower': '/svgs/amenities/outdoorShower.svg',
  'Smoke alarm': '/svgs/amenities/smokeAlarm.svg',  
  'First aid kit': '/svgs/amenities/firstAidKit.svg',
  'Fire extinguisher': '/svgs/amenities/fireExtinguisher.svg',
  'Carbon monoxide alarm': '/svgs/amenities/carbonMonoxideAlarm.svg',
}

const gHomeLabels = ['Top of the world', 'Trending', 'Play', 'Tropical']

function getAmenityIcon(amenity){
  return amenityIconsMap[amenity]
} 

// const icons = {
//   filled: {
//     MdTv,
//     MdKitchen,
//     MdWifi,
//     MdSmokingRooms,
//     MdPets,
//     MdRestaurantMenu,
//     MdLocalParking,
//     MdAcUnit,
//     MdThermostat,
//     MdLocalLaundryService,
//     MdDryCleaning,
//     MdPool,
//     MdHotTub,
//     MdFitnessCenter,
//     MdBeachAccess,
//     MdBalcony,
//     MdLocalFlorist,
//     MdOutdoorGrill,
//     MdFireplace,
//     MdPiano,
//     MdSportsEsports,
//     MdWork,
//     MdChildCare,
//     MdChair,
//     MdSecurity,
//     MdHome,
//   }
// }

console.log('VITE_LOCAL:', VITE_LOCAL)

const service = VITE_LOCAL === 'true' ? local : remote
export const homeService = {
  getEmptyHome,
  getDefaultFilter,
  getFilterFromSearchParams,
  gHomeTypes,
  gAmenities,
  getAmenityIcon,
  amenityIconsMap,
  gHomeLabels,
  ...service,
}


//* Easy access to this service from the dev tools console
//* when using script - dev / dev:local

if (DEV) window.homeService = homeService

