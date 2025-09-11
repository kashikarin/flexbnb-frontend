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
  'TV',
  'Kitchen',
  'Wifi',
  'Smoking allowed',
  'Pets allowed',
  'Cooking basics',
  'Free parking on premises',
  'Air conditioning',
  'Heating',
  'Washer',
  'Dryer',
  'Pool',
  'Hot tub',
  'Gym',
  'Beach access',
  'Balcony',
  'Garden',
  'BBQ grill',
  'Fireplace',
  'Piano',
  'Game room',
  'Office space',
  'Baby crib',
  'High chair',
  'Security cameras',
]

const amenityIcons = {
  TV: 'MdTv',
  Kitchen: 'MdKitchen',
  Wifi: 'MdWifi',
  'Smoking allowed': 'MdSmokingRooms',
  'Pets allowed': 'MdPets',
  'Cooking basics': 'MdRestaurantMenu',
  'Free parking on premises': 'MdLocalParking',
  'Air conditioning': 'MdAcUnit',
  Heating: 'MdThermostat',
  Washer: 'MdLocalLaundryService',
  Dryer: 'MdDryCleaning',
  Pool: 'MdPool',
  'Hot tub': 'MdHotTub',
  Gym: 'MdFitnessCenter',
  'Beach access': 'MdBeachAccess',
  Balcony: 'MdBalcony',
  Garden: 'MdLocalFlorist',
  'BBQ grill': 'MdOutdoorGrill',
  Fireplace: 'MdFireplace',
  Piano: 'MdPiano',
  'Game room': 'MdSportsEsports',
  'Office space': 'MdWork',
  'Baby crib': 'MdChildCare',
  'High chair': 'MdChair',
  'Security cameras': 'MdSecurity',
}

const gHomeLabels = ['Top of the world', 'Trending', 'Play', 'Tropical']

function getAmenityIcon(amenity){
  return amenityIcons[amenity] || 'MdHome'
} 

console.log('VITE_LOCAL:', VITE_LOCAL)

const service = VITE_LOCAL === 'true' ? local : remote
export const homeService = {
  getEmptyHome,
  getDefaultFilter,
  getFilterFromSearchParams,
  gHomeTypes,
  gAmenities,
  getAmenityIcon,
  amenityIcons,
  gHomeLabels,
  ...service,
}


//* Easy access to this service from the dev tools console
//* when using script - dev / dev:local

if (DEV) window.homeService = homeService

