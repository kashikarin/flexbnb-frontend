import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadHomes, setFilterBy } from '../store/home.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { homeService } from '../services/home/'
import { HomeList } from '../cmps/HomeList'
import { HomeFilter } from '../cmps/HomeFilter'
import { LabelsSlider } from '../cmps/LabelsSlider.jsx'
import { useFilterSearchParams } from '../customHooks/useFilterSearchParams.js'

// const homes = [
//   {
//     amenities: ['Free parking on premises'],
//     bathCount: 1,
//     bedRoomsCount: 3,
//     bedsCount: 7,
//     capacity: 7,
//     host: {
//       _id: 'u101',
//       fullname: 'Hosty Hosterson',
//       imageURL: 'https://picsum.photos/200?random=0.45186430261555843',
//     },
//     imageUrls: [
//       'https://picsum.photos/200?random=0.6993343729750893',
//       'https://picsum.photos/200?random=0.6993343729750893',
//       'https://picsum.photos/200?random=0.6993343729750893',
//       'https://picsum.photos/200?random=0.6993343729750893',
//     ],
//     labels: ['Top of the world'],
//     likedByUsers: [
//       'was above this happened',
//       'tuned',
//       'The sky',
//       'The sky',
//       'as generally',
//       'a different story in such cases this happened',
//       'The sky',
//       'more or less a pleasure the port',
//       '. a dead channel a different story ',
//       'All the port .',
//     ],
//     loc: {
//       address:
//         '127-135 Rotherhithe Street, Canada Water, London, SE16 4LG, United Kingdom',
//       city: 'london',
//       country: 'unitedKingdom',
//       countryCode: 'UK',
//       lat: 51.502429,
//       lng: -0.051923,
//     },
//     name: 'happens to a pleasure The sky was from various people a dead channel more or less to happens the story had',
//     price: 505,
//     reviews: [
//       {
//         by: {
//           _id: 'u102',
//           fullname: 'Sue Percritical',
//           imageUrl: 'https://picsum.photos/200?random=0.15923008700155328',
//         },
//         id: 'FkWY8W',
//         rate: 2,
//         txt: 'as generally it happens I from various people and bit by bit each time . the port . it it',
//       },
//     ],
//     summary:
//       'as generally it happens I from various people and bit by bit each time . the port . it it',
//     type: 'apartment',
//     _id: 'as generally it happens I from various people and bit by bit each time . the port . it it',
//   },
//   {
//     amenities: ['Free parking on premises'],
//     bathCount: 1,
//     bedRoomsCount: 3,
//     bedsCount: 7,
//     capacity: 7,
//     host: {
//       _id: 'u101',
//       fullname: 'Hosty Hosterson',
//       imageURL: 'https://picsum.photos/200?random=0.45186430261555843',
//     },
//     imageUrls: [
//       'https://picsum.photos/200?random=0.6993343729750893',
//       'https://picsum.photos/200?random=0.6993343729750893',
//       'https://picsum.photos/200?random=0.6993343729750893',
//       'https://picsum.photos/200?random=0.6993343729750893',
//     ],
//     labels: ['Top of the world'],
//     likedByUsers: [
//       'was above this happened',
//       'tuned',
//       'The sky',
//       'The sky',
//       'as generally',
//       'a different story in such cases this happened',
//       'The sky',
//       'more or less a pleasure the port',
//       '. a dead channel a different story ',
//       'All the port .',
//     ],
//     loc: {
//       address:
//         '127-135 Rotherhithe Street, Canada Water, London, SE16 4LG, United Kingdom',
//       city: 'london',
//       country: 'unitedKingdom',
//       countryCode: 'UK',
//       lat: 51.502429,
//       lng: -0.051923,
//     },
//     name: 'happens to a pleasure The sky was from various people a dead channel more or less to happens the story had',
//     price: 505,
//     reviews: [
//       {
//         by: {
//           _id: 'u102',
//           fullname: 'Sue Percritical',
//           imageUrl: 'https://picsum.photos/200?random=0.15923008700155328',
//         },
//         id: 'FkWY8W',
//         rate: 2,
//         txt: 'as generally it happens I from various people and bit by bit each time . the port . it it',
//       },
//     ],
//     summary:
//       'as generally it happens I from various people and bit by bit each time . the port . it it',
//     type: 'apartment',
//     _id: 'as generally it happens I from various people and bit by bit each time . the port . it it',
//   },
//   {
//     amenities: ['Free parking on premises'],
//     bathCount: 1,
//     bedRoomsCount: 3,
//     bedsCount: 7,
//     capacity: 7,
//     host: {
//       _id: 'u101',
//       fullname: 'Hosty Hosterson',
//       imageURL: 'https://picsum.photos/200?random=0.45186430261555843',
//     },
//     imageUrls: [
//       'https://picsum.photos/200?random=0.6993343729750893',
//       'https://picsum.photos/200?random=0.6993343729750893',
//       'https://picsum.photos/200?random=0.6993343729750893',
//       'https://picsum.photos/200?random=0.6993343729750893',
//     ],
//     labels: ['Top of the world'],
//     likedByUsers: [
//       'was above this happened',
//       'tuned',
//       'The sky',
//       'The sky',
//       'as generally',
//       'a different story in such cases this happened',
//       'The sky',
//       'more or less a pleasure the port',
//       '. a dead channel a different story ',
//       'All the port .',
//     ],
//     loc: {
//       address:
//         '127-135 Rotherhithe Street, Canada Water, London, SE16 4LG, United Kingdom',
//       city: 'london',
//       country: 'unitedKingdom',
//       countryCode: 'UK',
//       lat: 51.502429,
//       lng: -0.051923,
//     },
//     name: 'happens to a pleasure The sky was from various people a dead channel more or less to happens the story had',
//     price: 505,
//     reviews: [
//       {
//         by: {
//           _id: 'u102',
//           fullname: 'Sue Percritical',
//           imageUrl: 'https://picsum.photos/200?random=0.15923008700155328',
//         },
//         id: 'FkWY8W',
//         rate: 2,
//         txt: 'as generally it happens I from various people and bit by bit each time . the port . it it',
//       },
//     ],
//     summary:
//       'as generally it happens I from various people and bit by bit each time . the port . it it',
//     type: 'apartment',
//     _id: 'as generally it happens I from various people and bit by bit each time . the port . it it',
//   },
//   {
//     amenities: ['Free parking on premises'],
//     bathCount: 1,
//     bedRoomsCount: 3,
//     bedsCount: 7,
//     capacity: 7,
//     host: {
//       _id: 'u101',
//       fullname: 'Hosty Hosterson',
//       imageURL: 'https://picsum.photos/200?random=0.45186430261555843',
//     },
//     imageUrls: [
//       'https://picsum.photos/200?random=0.6993343729750893',
//       'https://picsum.photos/200?random=0.6993343729750893',
//       'https://picsum.photos/200?random=0.6993343729750893',
//       'https://picsum.photos/200?random=0.6993343729750893',
//     ],
//     labels: ['Top of the world'],
//     likedByUsers: [
//       'was above this happened',
//       'tuned',
//       'The sky',
//       'The sky',
//       'as generally',
//       'a different story in such cases this happened',
//       'The sky',
//       'more or less a pleasure the port',
//       '. a dead channel a different story ',
//       'All the port .',
//     ],
//     loc: {
//       address:
//         '127-135 Rotherhithe Street, Canada Water, London, SE16 4LG, United Kingdom',
//       city: 'london',
//       country: 'unitedKingdom',
//       countryCode: 'UK',
//       lat: 51.502429,
//       lng: -0.051923,
//     },
//     name: 'happens to a pleasure The sky was from various people a dead channel more or less to happens the story had',
//     price: 505,
//     reviews: [
//       {
//         by: {
//           _id: 'u102',
//           fullname: 'Sue Percritical',
//           imageUrl: 'https://picsum.photos/200?random=0.15923008700155328',
//         },
//         id: 'FkWY8W',
//         rate: 2,
//         txt: 'as generally it happens I from various people and bit by bit each time . the port . it it',
//       },
//     ],
//     summary:
//       'as generally it happens I from various people and bit by bit each time . the port . it it',
//     type: 'apartment',
//     _id: 'as generally it happens I from various people and bit by bit each time . the port . it it',
//   },
//   {
//     amenities: ['Free parking on premises'],
//     bathCount: 1,
//     bedRoomsCount: 3,
//     bedsCount: 7,
//     capacity: 7,
//     host: {
//       _id: 'u101',
//       fullname: 'Hosty Hosterson',
//       imageURL: 'https://picsum.photos/200?random=0.45186430261555843',
//     },
//     imageUrls: [
//       'https://picsum.photos/200?random=0.6993343729750893',
//       'https://picsum.photos/200?random=0.6993343729750893',
//       'https://picsum.photos/200?random=0.6993343729750893',
//       'https://picsum.photos/200?random=0.6993343729750893',
//     ],
//     labels: ['Top of the world'],
//     likedByUsers: [
//       'was above this happened',
//       'tuned',
//       'The sky',
//       'The sky',
//       'as generally',
//       'a different story in such cases this happened',
//       'The sky',
//       'more or less a pleasure the port',
//       '. a dead channel a different story ',
//       'All the port .',
//     ],
//     loc: {
//       address:
//         '127-135 Rotherhithe Street, Canada Water, London, SE16 4LG, United Kingdom',
//       city: 'london',
//       country: 'unitedKingdom',
//       countryCode: 'UK',
//       lat: 51.502429,
//       lng: -0.051923,
//     },
//     name: 'happens to a pleasure The sky was from various people a dead channel more or less to happens the story had',
//     price: 505,
//     reviews: [
//       {
//         by: {
//           _id: 'u102',
//           fullname: 'Sue Percritical',
//           imageUrl: 'https://picsum.photos/200?random=0.15923008700155328',
//         },
//         id: 'FkWY8W',
//         rate: 2,
//         txt: 'as generally it happens I from various people and bit by bit each time . the port . it it',
//       },
//     ],
//     summary:
//       'as generally it happens I from various people and bit by bit each time . the port . it it',
//     type: 'apartment',
//     _id: 'as generally it happens I from various people and bit by bit each time . the port . it it',
//   },
//   {
//     amenities: ['Free parking on premises'],
//     bathCount: 1,
//     bedRoomsCount: 3,
//     bedsCount: 7,
//     capacity: 7,
//     host: {
//       _id: 'u101',
//       fullname: 'Hosty Hosterson',
//       imageURL: 'https://picsum.photos/200?random=0.45186430261555843',
//     },
//     imageUrls: [
//       'https://picsum.photos/200?random=0.6993343729750893',
//       'https://picsum.photos/200?random=0.6993343729750893',
//       'https://picsum.photos/200?random=0.6993343729750893',
//       'https://picsum.photos/200?random=0.6993343729750893',
//     ],
//     labels: ['Top of the world'],
//     likedByUsers: [
//       'was above this happened',
//       'tuned',
//       'The sky',
//       'The sky',
//       'as generally',
//       'a different story in such cases this happened',
//       'The sky',
//       'more or less a pleasure the port',
//       '. a dead channel a different story ',
//       'All the port .',
//     ],
//     loc: {
//       address:
//         '127-135 Rotherhithe Street, Canada Water, London, SE16 4LG, United Kingdom',
//       city: 'london',
//       country: 'unitedKingdom',
//       countryCode: 'UK',
//       lat: 51.502429,
//       lng: -0.051923,
//     },
//     name: 'happens to a pleasure The sky was from various people a dead channel more or less to happens the story had',
//     price: 505,
//     reviews: [
//       {
//         by: {
//           _id: 'u102',
//           fullname: 'Sue Percritical',
//           imageUrl: 'https://picsum.photos/200?random=0.15923008700155328',
//         },
//         id: 'FkWY8W',
//         rate: 2,
//         txt: 'as generally it happens I from various people and bit by bit each time . the port . it it',
//       },
//     ],
//     summary:
//       'as generally it happens I from various people and bit by bit each time . the port . it it',
//     type: 'apartment',
//     _id: 'as generally it happens I from various people and bit by bit each time . the port . it it',
//   },
// ]

export function HomeIndex() {
  const filterBy = useSelector((state) => state.homeModule.filterBy)
  const homes = useSelector((state) => state.homeModule.homes)

  const setExistSearchParams = useFilterSearchParams()

  useEffect(() => {
    loadHomes(filterBy)
    setExistSearchParams(filterBy)
  }, [filterBy])

  // function onSetFilterBy(filterBy) {
  //   setFilterBy(filterBy)
  // }

  // async function onRemoveHome(homeId) {
  //   try {
  //     await removeHome(homeId)
  //     showSuccessMsg('Home removed')
  //   } catch (err) {
  //     showErrorMsg('Cannot remove home')
  //   }
  // }

  // async function onAddHome() {
  //   const home = homeService.getEmptyHome()
  //   home.vendor = prompt('Vendor?')
  //   try {
  //     const savedHome = await addHome(home)
  //     showSuccessMsg(`Home added (id: ${savedHome._id})`)
  //   } catch (err) {
  //     showErrorMsg('Cannot add home')
  //   }
  // }

  // async function onUpdateHome(home) {
  //   const speed = +prompt('New speed?', home.speed)
  //   if (!speed) return
  //   const homeToSave = { ...home, speed }
  //   try {
  //     const savedHome = await updateHome(homeToSave)
  //     showSuccessMsg(`Home updated, new speed: ${savedHome.speed}`)
  //   } catch (err) {
  //     showErrorMsg('Cannot update home')
  //   }
  // }

  return (
    <section className='home-index-container'>
      <LabelsSlider />
      {/* <MultiCarousel /> */}
      {/*<header>
         <h2>Homes</h2>
        {userService.getLoggedinUser() && (
          <button onClick={onAddHome}>Add a Home</button>
        )}
      </header> */}
      {/* <HomeFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} /> */}
      {/* <HomeList
        homes={homes}
        onRemoveHome={onRemoveHome}
        onUpdateHome={onUpdateHome}
      /> */}
      <HomeList homes={homes} />
    </section>
  )
}
