import { storageService } from '../async-storage.service'
import { utilService } from '../util.service'

const STORAGE_KEY = 'home'

export const homeService = {
  query,
  getById,
  save,
  remove,
  addHomeMsg,
}
window.cs = homeService
const gHomeType = ['House', 'Apartment', 'Condo', 'Villa']
const gAmenities = [
  'TV',
  'Kiten',
  'Wifi',
  'Smoking allowed',
  'Pets allowed',
  'Cooking basics',
  'Free parking on premises',
]

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
function createHome() {
  return {
    _id: makeId(),
    name: makeLorem(4),
    type: gHomeType[Math.round(Math.random() * type.length)],
    imgUrl: `https://picsum.photos/200?random=${Math.random()}`,
    price: getRandomIntInclusive(50, 500),
    summary: makeLorem(10),
    capacity: getRandomIntInclusive(1, 10),
    // make a logical way to get 3 / 4 random amenities
    amenities: ['TV', 'Wifi', 'Kitchen', 'Smoking allowed', 'Pets allowed'],
    labels: [],
  }
}
// function _createHomes() {
//   const imgUrls = [
//     'https://i.postimg.cc/VSjnSgLN/22981-7-toy-story-alien-file.png',
//     'https://i.postimg.cc/gXshs0hF/68781-jessie-story-toy-file-sheriff-characters-buzz.png',
//     'https://i.postimg.cc/vxmVNd71/batman.png',
//     'https://i.postimg.cc/grc8Jv9Y/captain.png',
//     'https://i.postimg.cc/mhdMFtR7/deadpool.png',
//     'https://i.postimg.cc/47xyJQYq/ironman.png',
//     'https://i.postimg.cc/v1Lx8m3g/Png-Item-464551.png',
//     'https://i.postimg.cc/LY9YJMby/Png-Item-465253.png',
//     'https://i.postimg.cc/QVn9dwkb/Png-Item-494826.png',
//     'https://i.postimg.cc/V5N01mMv/Png-Item-5369982.png',
//     'https://i.postimg.cc/SJJ9LkN3/Png-Item-6498.png',
//     'https://i.postimg.cc/PCD8cyDM/Png-Item-7093.png',
//     'https://i.postimg.cc/2VMZ2M16/Png-Item-7737.png',
//     'https://i.postimg.cc/cKN8N3MG/Png-Item-8473.png',
//     'https://i.postimg.cc/r0fdWP6q/xmen.png',
//   ]
//   let toys = utilService.loadFromStorage(STORAGE_KEY)
//   if (!toys || !toys.length) {
//     toys = []
//     for (let i = 0; i < 10; i++) {
//       const toy = createToy({
//         name: utilService.getRandomToyName(),
//         price: Math.floor(Math.random() * 81) + 20,
//         labels: utilService.getRandomLabels(labels),
//         inStock: Math.random() > 0.5,
//         imgUrl: imgUrls[i % imgUrls.length],
//       })
//       toys.push(toy)
//     }
//     utilService.saveToStorage(STORAGE_KEY, toys)
//   }
// }

const stay = {
  _id: 's101',
  name: 'Ribeira Charming Duplex',
  type: 'House',
  imgUrls: ['https://e26e9b.jpg', 'otherImg.jpg'],
  price: 80.0,
  summary: 'Fantastic duplex apartment...',
  capacity: 8,
  amenities: [
    'TV',
    'Wifi',
    'Kitchen',
    'Smoking allowed',
    'Pets allowed',
    'Cooking basics',
  ],
  labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
  host: {
    _id: 'u101',
    fullname: 'Davit Pok',
    imgUrl:
      'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
  },
  loc: {
    country: 'Portugal',
    countryCode: 'PT',
    city: 'Lisbon',
    address: '17 Kombo st',
    lat: -8.61308,
    lng: 41.1413,
  },
  reviews: [
    {
      id: 'madeId',
      txt: 'Very helpful hosts. Cooked traditional...',
      rate: 4,
      by: {
        _id: 'u102',
        fullname: 'user2',
        imgUrl: '/img/img2.jpg',
      },
    },
  ],
  likedByUsers: ['mini-user'],
}
