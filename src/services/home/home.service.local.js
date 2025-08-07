import { storageService } from '../async-storage.service'
import {
  getRandomIntInclusive,
  makeId,
  makeLorem,
  utilService,
} from '../util.service'

const STORAGE_KEY = 'home'

export const gHomeTypes = ['House', 'Apartment', 'Guesthouse', 'Hotel']
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

export const getAmenityIcon = (amenity) => amenityIcons[amenity] || 'MdHome'

export const homeService = {
  query,
  getById,
  save,
  remove,
  getDefaultFilter,
  getCountry,
  getRandomHomeId,
  addHomeMsg,
  getFilterFromSearchParams,
  getMaxHomePrice,
  getAmenityIcon,
}

window.cs = homeService
const images = [
  {
    id: 1,
    label: 'Image 1',
    imgUrl:
      'https://res.cloudinary.com/dmtlr2viw/image/upload/v1663436912/xle8ueqxjeazbs4bp09p.jpg',
  },
  {
    id: 2,
    label: 'Image 2',
    imgUrl:
      'https://res.cloudinary.com/dmtlr2viw/image/upload/v1663436460/qi3vkpts37b4k0dedosc.jpg',
  },
  {
    id: 3,
    label: 'Image 3',
    imgUrl:
      'https://res.cloudinary.com/dmtlr2viw/image/upload/v1663436481/tqwkxtbalipudzhivoag.jpg',
  },
  {
    id: 4,
    label: 'Image 4',
    imgUrl:
      'https://res.cloudinary.com/dmtlr2viw/image/upload/v1663437250/o8uutj3t2bvfafvxkr9j.jpg',
  },
  {
    id: 5,
    label: 'Image 5',
    imgUrl:
      'https://res.cloudinary.com/dmtlr2viw/image/upload/v1663436855/khyvb5q3yzcqaoscuppz.jpg',
  },
  {
    id: 6,
    label: 'Image 6',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436917/mqkfjmfpmyqpqmzmqgau.jpg',
  },
  {
    id: 7,
    label: 'Image 7',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436204/wzbrvr4mcsuub6gvwbry.jpg',
  },
  {
    id: 8,
    label: 'Image 8',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436523/ptcgbydjsamgf67a0npw.jpg',
  },
  {
    id: 9,
    label: 'Image 9',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436597/l90ukcpzpv6yvv6vhsnd.jpg',
  },
  {
    id: 10,
    label: 'Image 10',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436368/noebywqae4x0u42srsv3.jpg',
  },
  {
    id: 11,
    label: 'Image 11',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436823/af6elioxovkhvp6cg1un.jpg',
  },
  {
    id: 12,
    label: 'Image 12',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437327/epcnh2tzpafwmvi3srcp.jpg',
  },
  {
    id: 13,
    label: 'Image 13',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437310/tus71yfpnvgulenrli6a.jpg',
  },
  {
    id: 14,
    label: 'Image 14',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436453/ndl8odasqgnyquvsbalp.jpg',
  },
  {
    id: 15,
    label: 'Image 15',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436821/b4ejulqdhsvyseyfnfr0.jpg',
  },
  {
    id: 16,
    label: 'Image 16',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436321/g2cs1w7tkxsx58penq9j.jpg',
  },
  {
    id: 17,
    label: 'Image 17',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436542/e96nrbkjz8mecvsbzukk.jpg',
  },
  {
    id: 18,
    label: 'Image 18',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437250/o8uutj3t2bvfafvxkr9j.jpg',
  }, // כפולה של 4
  {
    id: 19,
    label: 'Image 19',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436957/ehhcyscwtvxw55mptkok.jpg',
  },
  {
    id: 20,
    label: 'Image 20',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg',
  },
  {
    id: 21,
    label: 'Image 21',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436406/id1oo8krwgxvdf9s02qp.jpg',
  },
  {
    id: 22,
    label: 'Image 22',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436961/rj6eo6v6npy65bckaxvr.jpg',
  },
  {
    id: 23,
    label: 'Image 23',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437040/oarfkdxx7gyyvcynvwko.jpg',
  },
  {
    id: 24,
    label: 'Image 24',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436933/ysvap4wzv8ziwtpbznf8.jpg',
  },
  {
    id: 25,
    label: 'Image 25',
    imgUrl:
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437272/e2id7kpaglrrdug3i6if.jpg',
  },
]
const gCities = ['Barcelona', 'Tel Aviv-Yafo', 'London']
const gLocs = [
  {
    country: 'Spain',
    countryCode: 'ES',
    city: 'Barcelona',
    lat: 41.335777,
    lng: 2.180649,
    address: "08039 Dic de l'Est, España",
  },
  {
    country: 'Spain',
    countryCode: 'ES',
    city: 'Barcelona',
    lat: 41.343353,
    lng: 2.182212,
    address: '08039 Barcelona, España',
  },
  {
    country: 'Spain',
    countryCode: 'ES',
    city: 'Barcelona',
    lat: 41.407354,
    lng: 2.179874,
    address: 'Calle Cartagena, 234, 08013 Barcelona, Spain',
  },
  {
    country: 'Spain',
    countryCode: 'ES',
    city: 'Barcelona',
    lat: 41.325503,
    lng: 2.219794,
    address: 'España',
  },
  {
    country: 'Spain',
    countryCode: 'ES',
    city: 'Barcelona',
    lat: 41.407279,
    lng: 2.228101,
    address: 'El Parc dels Auditoris, 08019 Barcelona, España',
  },
  {
    country: 'Spain',
    countryCode: 'ES',
    city: 'Barcelona',
    lat: 41.403244,
    lng: 2.151345,
    address: 'Carrer de les Carolines, 11I, 08006 Barcelona, España',
  },
  {
    country: 'Spain',
    countryCode: 'ES',
    city: 'Barcelona',
    lat: 41.45603,
    lng: 2.210712,
    address: 'Calle Nord, 24, 08921 Santa Coloma De Gramenet, Spain',
  },
  {
    country: 'Spain',
    countryCode: 'ES',
    city: 'Barcelona',
    lat: 41.454552,
    lng: 2.194432,
    address: 'C-58, 08033 Barcelona, España',
  },
  {
    country: 'Spain',
    countryCode: 'ES',
    city: 'Barcelona',
    lat: 41.437182,
    lng: 2.178361,
    address: 'Carrer dels Garrofers, 47X, 08016 Barcelona, España',
  },
  {
    country: 'Spain',
    countryCode: 'ES',
    city: 'Barcelona',
    lat: 41.352509,
    lng: 2.200391,
    address: '08002, España',
  },
  {
    country: 'Israel',
    countryCode: 'IL',
    city: 'Tel Aviv-Yafo',
    lat: 32.12765,
    lng: 34.800638,
    address: 'Meir Feinstein 53, St. Tel Aviv, israel 4704356',
  },
  {
    country: 'Israel',
    countryCode: 'IL',
    city: 'Tel Aviv-Yafo',
    lat: 32.061736,
    lng: 34.774502,
    address: '5 Levontin St, Tel Aviv-Yafo, 6578103, Israel',
  },
  {
    country: 'Israel',
    countryCode: 'IL',
    city: 'Tel Aviv-Yafo',
    lat: 32.092983923188854,
    lng: 34.80936063667095,
    address: 'HaMarganit St, Ramat Gan 5253527, Israel',
  },
  {
    country: 'Israel',
    countryCode: 'IL',
    city: 'Tel Aviv-Yafo',
    lat: 32.03976354351422,
    lng: 34.7483905544995,
    address: '11 Toulouse St, Tel Aviv–Yafo 6806546, Israel',
  },
  {
    country: 'Israel',
    countryCode: 'IL',
    city: 'Tel Aviv-Yafo',
    lat: 32.11131,
    lng: 34.790462,
    address: 'Yehuda Burla St, Tel Aviv-Yafo, 6946032, Israel',
  },
  {
    country: 'Israel',
    countryCode: 'IL',
    city: 'Tel Aviv-Yafo',
    lat: 32.116403,
    lng: 34.779574,
    address: 'Yitzhak Artsi St, Tel Aviv-Yafo, 6946032, Israel',
  },
  {
    country: 'Israel',
    countryCode: 'IL',
    city: 'Tel Aviv-Yafo',
    lat: 32.121798123471685,
    lng: 34.82136409770465,
    address: '17A KKL Boulevard, Tel Aviv–Yafo 6946032, Israel',
  },
  {
    country: 'Israel',
    countryCode: 'IL',
    city: 'Tel Aviv-Yafo',
    lat: 32.1110305739916,
    lng: 34.76577,
    address: '17 Kehilat Lviv St, Tel Aviv–Yafo 5259408, Israel',
  },
  {
    country: 'Israel',
    countryCode: 'IL',
    city: 'Tel Aviv-Yafo',
    lat: 32.05044172410385,
    lng: 34.780419816592065,
    address: '77 Chakmei Yisrael St, Tel Aviv–Yafo 6775393, Israel',
  },
  {
    country: 'Israel',
    countryCode: 'IL',
    city: 'Tel Aviv-Yafo',
    lat: 32.111274,
    lng: 34.8192,
    address: 'Kehilat Resistencia St, Tel Aviv-Yafo, 4704356, Israel',
  },
  {
    country: 'United Kingdom',
    countryCode: 'UK',
    city: 'London',
    address: 'Lightermans Road, Millwall, London, E14 9DQ, United Kingdom',
    lat: 51.49872,
    lng: -0.020831,
  },
  {
    country: 'United Kingdom',
    countryCode: 'UK',
    city: 'London',
    address: 'Booth Road, London, E16 2FW, United Kingdom',
    lat: 51.499395,
    lng: 0.037443,
  },
  {
    country: 'United Kingdom',
    countryCode: 'UK',
    city: 'London',
    address:
      'Killick Street Health Centre, 75 Killick Street, London, N1 9RH, United Kingdom',
    lat: 51.534291,
    lng: -0.118712,
  },
  {
    country: 'United Kingdom',
    countryCode: 'UK',
    city: 'London',
    address:
      'Penryn House, Kennington Park Road, London, SE11 4RR, United Kingdom',
    lat: 51.488481,
    lng: -0.106163,
  },
  {
    country: 'United Kingdom',
    countryCode: 'UK',
    city: 'London',
    address: 'Camley Street, London, N1C 4PW, United Kingdom',
    lat: 51.535343,
    lng: -0.128256,
  },
  {
    country: 'United Kingdom',
    countryCode: 'UK',
    city: 'London',
    address: '47 Kitchener Road, London, E7 9LU, United Kingdom',
    lat: 51.543378,
    lng: 0.028598,
  },
  {
    country: 'United Kingdom',
    countryCode: 'UK',
    city: 'London',
    address:
      '127-135 Rotherhithe Street, Canada Water, London, SE16 4LG, United Kingdom',
    lat: 51.502429,
    lng: -0.051923,
  },
  {
    country: 'United Kingdom',
    countryCode: 'UK',
    city: 'London',
    address: '2 West Grove, London, SE10 8QT, United Kingdom',
    lat: 51.472997,
    lng: -0.005762,
  },
  {
    country: 'United Kingdom',
    countryCode: 'UK',
    city: 'London',
    address: 'Vittoria Primary School, 45, London, N1 0TJ, United Kingdom',
    lat: 51.535048,
    lng: -0.112112,
  },
  {
    country: 'United Kingdom',
    countryCode: 'UK',
    city: 'London',
    lat: 51.478397,
    lng: -0.110282,
    address: 'Chryssell Road, London, SW9 6EQ, United Kingdom',
  },
]
const gHomeLabels = ['Top of the world', 'Trending', 'Play', 'Tropical']

_createHomes()

async function query(filterBy = getDefaultFilter()) {
  try {
    var homes = await storageService.query(STORAGE_KEY)
    // const maxHomePrice = await getMaxHomePrice(filter)
    const {
      city,
      capacity,
      type,
      minPrice,
      maxPrice,
      amenities,
      bedRoomsCount,
      bedsCount,
      bathCount,
      labels,
    } = filterBy

    if (city) {
      homes = homes.filter((home) =>
        home.loc.city.toLowerCase().includes(city.toLowerCase())
      )
    }
    if (capacity) {
      homes = homes.filter((home) => home.capacity >= capacity)
    }
    if (type) {
      homes = homes.filter((home) =>
        home.type.toLowerCase().includes(type.toLowerCase())
      )
    }
    if (minPrice) {
      homes = homes.filter((home) => home.price >= minPrice)
    }
    if (maxPrice !== '') {
      homes = homes.filter((home) => home.price <= maxPrice)
    }
    if (amenities?.length) {
      homes = homes.filter((home) =>
        amenities.every((amenity) => home.amenities.includes(amenity))
      )
    }
    if (labels?.length) {
      homes = homes.filter((home) =>
        labels.every((label) => home.labels.includes(label))
      )
    }
    if (bedRoomsCount) {
      homes = homes.filter((home) => home.bedRoomsCount >= bedRoomsCount)
    }
    if (bedsCount) {
      homes = homes.filter((home) => home.bedRoomsCount >= bedsCount)
    }
    if (bathCount) {
      homes = homes.filter((home) => home.bathCount >= bathCount)
    }
    return homes
  } catch (err) {
    console.error('Oops', err)
    throw err
  }
}

function getById(homeId) {
  return storageService.get(STORAGE_KEY, homeId)
}

async function remove(homeId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, homeId)
}

async function save(homeToSave) {
  try {
    if (homeToSave._id) {
      return await storageService.put(STORAGE_KEY, homeToSave)
    } else {
      return await storageService.post(STORAGE_KEY, homeToSave)
    }
  } catch (err) {
    console.error('Cannot save home', err)
    throw err
  }
}

function getEmptyHome(name = '', labels = [], amenities = []) {
  return { name, labels, amenities }
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
  }
}

function getFilterFromSearchParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || ''
  }
  return filterBy
}

async function getMaxHomePrice(filterBy) {
  const homes = await query(filterBy)
  let maxPrice = 0
  for (let i = 0; i < homes.length; i++) {
    maxPrice = Math.max(homes[i].price, maxPrice)
  }
  return maxPrice
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

async function getRandomHomeId() {
  try {
    const homes = await query()
    if (!homes || !homes?.length) return null
    const randomIdx = Math.floor(Math.random() * homes?.length)
    return homes[randomIdx]._id
  } catch (err) {
    console.error('Oops', err)
    throw err
  }
}

function _getImageUrl() {
  const selectedImages = []
  for (let i = 0; i < 5; i++) {
    const randomIndex = getRandomIntInclusive(0, images.length - 1)
    selectedImages.push(images[randomIndex].imgUrl)
  }
  return selectedImages
}

function getCountry(city) {
  switch (city) {
    case 'Tel Aviv-Yafo':
      return 'Israel'
    case 'Barcelona':
      return 'Spain'
    case 'London':
      return 'United Kingdom'
    default:
      return
  }
}

function _getSingleImageUrl() {
  const randomIndex = getRandomIntInclusive(0, images.length - 1)
  return images[randomIndex].imgUrl
}

function _createHome() {
  let city = gCities[getRandomIntInclusive(0, gCities.length - 1)]
  let name = makeLorem(3)
  const home = getEmptyHome(name, city)
  home._id = makeId()
  home.type = gHomeTypes[getRandomIntInclusive(0, gHomeTypes.length - 1)]
  home.imageUrls = _getImageUrl()
  home.petsAllowed = Math.random() > 0.5 ? true : false
  home.price = getRandomIntInclusive(500, 2000)
  home.summary = makeLorem(getRandomIntInclusive(25, 200))
  home.capacity = getRandomIntInclusive(1, 10)
  home.bedRoomsCount = Math.floor(home.capacity / 2)
  home.bedsCount = getRandomIntInclusive(home.bedRoomsCount, home.capacity)
  home.bathCount = getRandomIntInclusive(1, 2)

  const shuffledAmenities = [...gAmenities].sort(() => Math.random() - 0.5)
  home.amenities = shuffledAmenities.slice(0, 10)

  home.labels = [
    gHomeLabels[getRandomIntInclusive(0, gHomeLabels.length - 1)],
    gHomeLabels[getRandomIntInclusive(0, gAmenities.length - 1)],
  ]
  home.host = {
    _id: 'u101',
    fullname: 'Justin Time',
    imageURL: '/img/user/justin-img.jpg',
  }
  switch (city) {
    case 'Barcelona':
      home.loc = gLocs[getRandomIntInclusive(0, 9)]
      break
    case 'Tel Aviv-Yafo':
      home.loc = gLocs[getRandomIntInclusive(10, 19)]
      break
    case 'London':
      home.loc = gLocs[getRandomIntInclusive(20, 29)]
      break
    default:
      break
  }
  const reviewsCount = getRandomIntInclusive(0, 10)
  home.reviews = []
  for (let i = 0; i < reviewsCount; i++) {
    let id = makeId()
    let txt = makeLorem(getRandomIntInclusive(10, 30))
    let rate = getRandomIntInclusive(3, 5)
    let by = {
      _id: 'u101',
      fullname: 'Justin Time',
      imageURL: 'img/user/justin-img.jpg',
    }
    let review = { id, txt, rate, by }
    home.reviews.push(review)
  }
  const likesCount = getRandomIntInclusive(0, 50)
  home.likedByUsers = []
  return home
}

function _createHomes() {
  let homes = utilService.loadFromStorage(STORAGE_KEY)
  if (homes || homes?.length) return homes
  if (!homes || !homes.length) {
    homes = []
    for (let i = 0; i < 40; i++) {
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
