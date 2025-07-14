import { storageService } from '../async-storage.service'
import { getRandomIntInclusive, makeId, makeLorem, utilService } from '../util.service'

const STORAGE_KEY = 'home'
export const homeService = {
  query,
  getById,
  save,
  remove,
  addHomeMsg,
}


window.cs = homeService
const gHomeTypes = ['House', 'Apartment', 'Condo', 'Villa']
const gAmenities = [
  'TV',
  'Kiten',
  'Wifi',
  'Smoking allowed',
  'Pets allowed',
  'Cooking basics',
  'Free parking on premises']
const gCities = ['barcelona', 'telaviv', 'london']
const gLocs = [
{
  country: 'spain',
  countryCode: 'ES',
  city: 'barcelona',
  lat: 41.335777,
  lng: 2.180649,
  address: "08039 Dic de l'Est, España"
},
{
  country: 'spain',
  countryCode: 'ES',
  city: 'barcelona',
  lat: 41.343353,
  lng: 2.182212,
  address: "08039 Barcelona, España"
},
{
  country: 'spain',
  countryCode: 'ES',
  city: 'barcelona',
  lat: 41.407354,
  lng: 2.179874,
  address: "Calle Cartagena, 234, 08013 Barcelona, Spain"
},
{
  country: 'spain',
  countryCode: 'ES',
  city: 'barcelona',
  lat: 41.325503,
  lng: 2.219794,
  address: "España"
},
{
  country: 'spain',
  countryCode: 'ES',
  city: 'barcelona',
  lat: 41.407279,
  lng: 2.228101,
  address: "El Parc dels Auditoris, 08019 Barcelona, España"
},
{
  country: 'spain',
  countryCode: 'ES',
  city: 'barcelona',
  lat: 41.403244,
  lng: 2.151345,
  address: "Carrer de les Carolines, 11I, 08006 Barcelona, España"
},
{
  country: 'spain',
  countryCode: 'ES',
  city: 'barcelona',
  lat: 41.45603,
  lng: 2.210712,
  address: "Calle Nord, 24, 08921 Santa Coloma De Gramenet, Spain"
},
{
  country: 'spain',
  countryCode: 'ES',
  city: 'barcelona',
  lat: 41.454552,
  lng: 2.194432,
  address: "C-58, 08033 Barcelona, España"
},

{
  country: 'spain',
  countryCode: 'ES',
  city: 'barcelona',
  lat: 41.437182,
  lng: 2.178361,
  address: "Carrer dels Garrofers, 47X, 08016 Barcelona, España"
},
{
  country: 'spain',
  countryCode: 'ES',
  city: 'barcelona',
  lat: 41.352509,
  lng: 2.200391,
  address: "08002, España"
},
{
  country: 'israel',
  countryCode: 'IL',
  city: 'telaviv',
  lat: 32.12765,
  lng: 34.800638,
  address: "Meir Feinstein 53, St. Tel Aviv, israel 4704356"
},
{
  country: 'israel',
  countryCode: 'IL',
  city: 'telaviv',
  lat: 32.061736,
  lng: 34.774502,
  address: "5 Levontin St, Tel Aviv-Yafo, 6578103, Israel"
},
{
  country: 'israel',
  countryCode: 'IL',
  city: 'telaviv',
  lat: 32.094308,
  lng: 34.765904,
  address: "14 Tel Aviv Port, Tel Aviv-Yafo, 6340506, Israel"
},,
{ 
  country: 'israel',
  countryCode: 'IL',
  city: 'telaviv',
  lat: 32.1288,
  lng: 34.76216,
  address: "Tel Aviv-Yafo, 6946032, Israel"
},
{
  country: 'israel',
  countryCode: 'IL',
  city: 'telaviv',
  lat: 32.11131,
  lng: 34.790462,
  address: "Yehuda Burla St, Tel Aviv-Yafo, 6946032, Israel"
},
{
  country: 'israel',
  countryCode: 'IL',
  city: 'telaviv',
  lat: 32.116403,
  lng: 34.779574,
  address: "Yitzhak Artsi St, Tel Aviv-Yafo, 6946032, Israel"
},
{
  country: 'israel',
  countryCode: 'IL',
  city: 'telaviv',
  lat: 32.116403,
  lng: 34.779574,
  address: "Yitzhak Artsi St, Tel Aviv-Yafo, 6946032, Israel"
},
{
  country: 'israel',
  countryCode: 'IL',
  city: 'telaviv',
  lat: 32.1186,
  lng: 34.76577,
  address: "Tel Aviv-Yafo, 6946032, Israel"
}, 
{
  country: 'israel',
  countryCode: 'IL',
  city: 'telaviv',
  lat: 32.11713,
  lng: 34.767221,
  address: "Tel Aviv-Yafo, 6946032, Israel"
}, 
{
  country: 'israel',
  countryCode: 'IL',
  city: 'telaviv',
  lat: 32.111274,
  lng: 34.8192,
  address: "Kehilat Resistencia St, Tel Aviv-Yafo, 4704356, Israel"
},
{
  country: 'unitedKingdom',
  countryCode: 'UK',
  city: 'london',
  address: "Lightermans Road, Millwall, London, E14 9DQ, United Kingdom",
  lat: 51.49872,
  lng: -0.020831
},
{
  country: 'unitedKingdom',
  countryCode: 'UK',
  city: 'london',
  address: "Booth Road, London, E16 2FW, United Kingdom",
  lat: 51.499395,
  lng: 0.037443
},
{
  country: 'unitedKingdom',
  countryCode: 'UK',
  city: 'london',
  address: "Killick Street Health Centre, 75 Killick Street, London, N1 9RH, United Kingdom",
  lat: 51.534291,
  lng: -0.118712
},
{
  country: 'unitedKingdom',
  countryCode: 'UK',
  city: 'london',
  address: "Penryn House, Kennington Park Road, London, SE11 4RR, United Kingdom",
  lat: 51.488481,
  lng: -0.106163
},
{
  country: 'unitedKingdom',
  countryCode: 'UK',
  city: 'london',
  address: "Camley Street, London, N1C 4PW, United Kingdom",
  lat: 51.535343,
  lng: -0.128256
},
{
  country: 'unitedKingdom',
  countryCode: 'UK',
  city: 'london',
  address: "47 Kitchener Road, London, E7 9LU, United Kingdom",
  lat: 51.543378,
  lng: 0.028598
},
{
  country: 'unitedKingdom',
  countryCode: 'UK',
  city: 'london',
  address: "127-135 Rotherhithe Street, Canada Water, London, SE16 4LG, United Kingdom",
  lat: 51.502429,
  lng: -0.051923
}, 
{
  country: 'unitedKingdom',
  countryCode: 'UK',
  city: 'london',
  address: "2 West Grove, London, SE10 8QT, United Kingdom",
  lat: 51.472997,
  lng: -0.005762
},
{
  country: 'unitedKingdom',
  countryCode: 'UK',
  city: 'london',
  address: "Vittoria Primary School, 45, London, N1 0TJ, United Kingdom",
  lat: 51.535048,
  lng: -0.112112
},
{
  country: 'unitedKingdom',
  countryCode: 'UK',
  city: 'london',
  lat: 51.478397,
  lng: -0.110282,
  address: "Chryssell Road, London, SW9 6EQ, United Kingdom"
}
]
const gHomeLabels = ['Top of the world', 'Trending', 'Play', 'Tropical']

_createHomes()

async function query(filterBy = { txt: '', price: 0 }) {
  var homes = await storageService.query(STORAGE_KEY)
  const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

  if (txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    homes = homes.filter(
      (home) => regex.test(home.vendor) || regex.test(home.description)
    )
  }
  if (minSpeed) {
    homes = homes.filter((home) => home.speed <= minSpeed)
  }
  if (maxPrice) {
    homes = homes.filter((home) => home.price <= maxPrice)
  }
  if (sortField === 'vendor' || sortField === 'owner') {
    homes.sort(
      (home1, home2) =>
        home1[sortField].localeCompare(home2[sortField]) * +sortDir
    )
  }
  if (sortField === 'price' || sortField === 'speed') {
    homes.sort(
      (home1, home2) => (home1[sortField] - home2[sortField]) * +sortDir
    )
  }

  homes = homes.map(({ _id, vendor, price, speed, owner }) => ({
    _id,
    vendor,
    price,
    speed,
    owner,
  }))
  return homes
}

function getById(homeId) {
  return storageService.get(STORAGE_KEY, homeId)
}

async function remove(homeId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, homeId)
}

async function save(home) {
  var savedHome
  if (home._id) {
    const homeToSave = {
      _id: home._id,
      price: home.price,
      speed: home.speed,
    }
    savedHome = await storageService.put(STORAGE_KEY, homeToSave)
  } else {
    const homeToSave = {
      vendor: home.vendor,
      price: home.price,
      speed: home.speed,
      // Later, owner is set by the backend
      owner: userService.getLoggedinUser(),
      msgs: [],
    }
    savedHome = await storageService.post(STORAGE_KEY, homeToSave)
  }
  return savedHome
}

function getEmptyHome(name = '', labels = [], amenities = []) {
    return { name, 
             labels, 
             amenities
           }
}

async function addHomeMsg(homeId, txt) {
  // Later, this is all done by the backend
  const home = await getById(homeId)

  const msg = {
    id: makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  home.msgs.push(msg)
  await storageService.put(STORAGE_KEY, home)

  return msg
}

function getImageUrl() {
  return `https://picsum.photos/200?random=${Math.random()}`
}

function _createHome() {
  let city = gCities[getRandomIntInclusive(0, gCities.length - 1)]
  let name = makeLorem(15)
  const home = getEmptyHome(name, city)
  home._id = makeId()
  home.type = gHomeTypes[getRandomIntInclusive(0, gHomeTypes[length - 1])]
  home.imageUrls = [getImageUrl(), getImageUrl(), getImageUrl(), getImageUrl()]
  home.price = getRandomIntInclusive(500, 2000)
  home.summary = makeLorem(getRandomIntInclusive(25, 200))
  home.capacity = getRandomIntInclusive(1, 10)
  home.bedRoomsCount = Math.floor(home.capacity / 2)
  home.bedsCount = getRandomIntInclusive(home.bedRoomsCount, home.capacity)
  home.bathCount = getRandomIntInclusive(1, 2)
  home.amenities = [gAmenities[getRandomIntInclusive(0, gAmenities.length - 1)]], gAmenities[getRandomIntInclusive(0, gAmenities.length - 1)], gAmenities[getRandomIntInclusive(0, gAmenities.length - 1)], gAmenities[getRandomIntInclusive(0, gAmenities.length - 1)]
  home.labels = [gHomeLabels[getRandomIntInclusive(0, gHomeLabels.length - 1)], gHomeLabels[getRandomIntInclusive(0, gAmenities.length - 1)]]
  home.host = {
    _id: 'u101',
    fullname: 'Hosty Hosterson',
    imageURL: getImageUrl()
  }
  switch(city) {
    case 'barcelona':
      home.loc = gLocs[getRandomIntInclusive(0, 9)]
      break
    case 'telaviv': 
      home.loc = gLocs[getRandomIntInclusive(10, 19)]
      break
    case 'london': 
      home.loc = gLocs[getRandomIntInclusive(20, 29)]
      break
    default:
      break
  }
  const reviewsCount = getRandomIntInclusive(0, 10)
  home.reviews = []
  for (let i=0; i<reviewsCount; i++) {
    let id = makeId()
    let txt = makeLorem(getRandomIntInclusive(10, 30))
    let rate = getRandomIntInclusive(0,5)
    let by = {
      _id: 'u102',
      fullname: 'Sue Percritical',
      imageURL: getImageUrl()
    } 
    let review = {id, txt, rate, by}
    home.reviews.push(review)
  }
  const likesCount = getRandomIntInclusive(0, 50)
  home.likedByUsers = []
  for (let i=0; i<likesCount; i++){
    const user = makeLorem(getRandomIntInclusive(1, 3))
    home.likedByUsers.push(user)
  }  
  
  return home
}
function _createHomes() {

let homes = utilService.loadFromStorage(STORAGE_KEY)
  if (!homes || !homes.length) {
    homes = []
    for (let i = 0; i < 20; i++) {
       const home = _createHome()
       homes.push(home)
    }
    utilService.saveToStorage(STORAGE_KEY, homes)
  }
}

// const stay = {
//   _id: 's101',
//   name: 'Ribeira Charming Duplex',
//   type: 'House',
//   imgUrls: ['https://e26e9b.jpg', 'otherImg.jpg'],
//   price: 80.0,
//   summary: 'Fantastic duplex apartment...',
//   capacity: 8,
//   amenities: [
//     'TV',
//     'Wifi',
//     'Kitchen',
//     'Smoking allowed',
//     'Pets allowed',
//     'Cooking basics',
//   ],
//   labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
//   host: {
//     _id: 'u101',
//     fullname: 'Davit Pok',
//     imgUrl:
//       'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
//   },
//   loc: {
//     country: 'Portugal',
//     countryCode: 'PT',
//     city: 'Lisbon',
//     address: '17 Kombo st',
//     lat: -8.61308,
//     lng: 41.1413,
//   },
//   reviews: [
//     {
//       id: 'madeId',
//       txt: 'Very helpful hosts. Cooked traditional...',
//       rate: 4,
//       by: {
//         _id: 'u102',
//         fullname: 'user2',
//         imgUrl: '/img/img2.jpg',
//       },
//     },
//   ],
//   likedByUsers: ['mini-user'],
// }

    // 

    // function getRandomCoordinates(country) {
    //     const barcelonaBoundingbox = {
    //         minLat: 41.3170353,
    //         maxLat: 41.4679135,
    //         minLng: 2.0524977,
    //         maxLng: 2.2283555
    //     }
    //     const londonBoundingBox = {
    //         minLat: 51.2867601,
    //         maxLat: 51.6918741,
    //         minLng: -0.5103751,
    //         maxLng: 0.3340155
    //     }
    //     const telavivBoundingBox = {
    //         minLat: -3.0701192,
    //         maxLat: -3.0673890,
    //         minLng: -60.0528185,
    //         maxLng: -60.0525888
    //     }
    //     let lat
    //     let lng
    //     switch(country) {
    //       case "barcelona":
    //         lat = Math.random() * (barcelonaBoundingbox.maxLat - barcelonaBoundingbox.minLat) + barcelonaBoundingbox.minLat
    //         lng = Math.random() * (barcelonaBoundingboxmaxLng - barcelonaBoundingbox.minLng) + barcelonaBoundingbox.minLng
    //         return [lat, lng]
    //       case 'london': 
    //         lat = Math.random() * (londonBoundingbox.maxLat - londonBoundingbox.minLat) + londonBoundingbox.minLat
    //         lng = Math.random() * (londonBoundingboxmaxLng - londonBoundingbox.minLng) + londonBoundingbox.minLng
    //         return [lat, lng]
    //       case 'telaviv':
    //         lat = Math.random() * (telavivBoundingbox.maxLat - telavivBoundingbox.minLat) + telavivBoundingbox.minLat
    //         lng = Math.random() * (telavivBoundingboxmaxLng - telavivBoundingbox.minLng) + telavivBoundingbox.minLng
    //         return [lat, lng]
    //       default: 
    //         return
    //     }
        
    // }

    // async function getAddressFromCoords(latlng) {
    //   const url =`https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`
    //   const response = await fetch(url)
    //   const data = response.json()

    // }