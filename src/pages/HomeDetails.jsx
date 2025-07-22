import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadHome, addHomeMsg, addUserLike, removeUserLike } from '../store/home.actions'
import { addLike, removeLike } from '../store/user.actions'
import { getAvgRating } from '../services/util.service'
import { getAmenityIcon } from '../services/home/home.service.local'
import { FaHeart, FaStar } from 'react-icons/fa'
import { CiCalendarDate, CiHeart } from 'react-icons/ci'
import { IoDiamond } from 'react-icons/io5'
import { FaBuildingCircleCheck } from 'react-icons/fa6'
import { LuBedDouble } from 'react-icons/lu'
import { PiDoorOpenThin } from 'react-icons/pi'
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
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'

const API_KEY = 'AIzaSyBJ2YmMNH_NuHcoX7N49NXljbkOCoFuAwg'

export function HomeDetails() {
  const { homeId } = useParams()
  const home = useSelector((storeState) => storeState.homeModule.home)
  console.log("🚀 ~ HomeDetails ~ home:", home)
  const loggedInUser = useSelector(state => state.userModule.loggedInUser)
  console.log("🚀 ~ HomeDetails ~ loggedInUser:", loggedInUser)
  const [isLiked, setIsLiked] = useState(null)
  const isLikedBeenSynced = useRef(false)
  // const isLikedUpdateCount = useRef(0)
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
      console.log('home:', home)
      loadHome(homeId)
      console.log('homeId:', homeId)
  }, [homeId])

  useEffectUpdate(()=>{
    if (!home || !loggedInUser || isLikedBeenSynced.current) return
    const liked = home.likedByUsers?.includes(loggedInUser._id)
    console.log('isHomeLikedByUser', liked)
    setIsLiked(liked)
    isLikedBeenSynced.current = true
  }, [loggedInUser, home])

  async function onAddHomeMsg(homeId) {
    try {
      await addHomeMsg(homeId, 'bla bla ' + parseInt(Math.random() * 10))
      showSuccessMsg(`Home msg added`)
    } catch (err) {
      showErrorMsg('Cannot add home msg')
    }
  }

  // useEffectUpdate(()=>{
  //   isLikedUpdateCount.current = isLikedUpdateCount.current + 1
  //   if (isLikedUpdateCount.current === 1) return
  //   console.log("🚀 ~ useEffectUpdate ~ isLiked:", isLiked)
  //   if (isLiked) onAddLike(homeId)
  //   else onRemoveLike(homeId)
  // }, [isLiked])

  // function isHomeLikedByUser(){
  //   return home?.likedByUsers?.includes(loggedInUser?._id)
  // }
  
  async function handleHomeSave(e){
    e.preventDefault()
    e.stopPropagation()
    if (!home || !loggedInUser || isLiked === null) return
    const nextLike = !isLiked
    setIsLiked(nextLike)
    try {
      if (nextLike) await onAddLike(homeId)
      else await onRemoveLike(homeId)
    } catch(err) {
        console.error('Cannot toggle like', err)
    }
  }

async function onAddLike(homeId){
    try {
        if (home.likedByUsers.includes(loggedInUser._id)) return
        await addLike(homeId, loggedInUser._id)
        await addUserLike(homeId, loggedInUser._id)
        await loadHome(homeId)
    } catch(err){
        console.error('Failed to add like', err)
    }  
  }

  async function onRemoveLike(homeId){
    try {
      if (!home.likedByUsers.includes(loggedInUser._id)) return
      await removeLike(homeId, loggedInUser._id)
      await removeUserLike(homeId)
      await loadHome(homeId)
    } catch(err){
        console.error('Failed to remove like', err)
    }
  }

  console.log('home:', home)
  return (
    <>
      {home && (
        <div className='home-details-container'>
          <div className='home-details-header'>
            <h1>
              {home.type} in {home.loc.city}, {home.loc.country}
            </h1>
            <div className='home-details-flex'>
              <div className='home-details'>
                <div className='home-details-rating'>
                  <FaStar className='home-details-star' />
                  <span> {getAvgRating(home)} </span>
                </div>
                <span>•</span>
                <div className='home-details-reviews'>
                  <span>{home.reviews.length} Reviews </span>
                </div>
                <span>•</span>
                <div className='home-details-location'>
                  <span>
                    {home.loc.city}, {home.loc.country}
                  </span>
                </div>
              </div>
              <div className='home-details-heart' onClick={handleHomeSave}>
                <FaHeart className={`home-details-heart-icon ${isLiked ? 'saved' : ''}`} />
                <span>{isLiked ? "Saved" : "Save"}</span>
              </div>
            </div>
          </div>
          <div className='home-details-img-container'>
            {home.imageUrls.map((imageUrl, idx) => {
              return (
                <img
                  key={idx}
                  className='home-details-img'
                  src={imageUrl}
                  alt={`Home image ${idx + 1}`}
                />
              )
            })}
          </div>
          <section className='mid-section'>
            <div className='home-details-mid'>
              <div className='home-details-amenities'>
                <h2>
                  {home.type} in {home.loc.city}, {home.loc.country}
                </h2>
                <div className='home-details-amenities-list'>
                  <p>{home.capacity} guests</p>
                  <span>•</span>
                  <p>{home.bedsCount} beds</p>
                  <span>•</span>
                  <p>{home.bathCount} bath</p>
                </div>
              </div>
              <section className='home-highlights'>
                <article>
                  <PiDoorOpenThin className='home-highlights-icon ' />
                  <h4>Self check-in</h4>
                  <p>Check yourself in with the lockbox.</p>
                </article>
                <article>
                  <LuBedDouble className='home-highlights-icon ' />
                  <h4>Room in a home</h4>
                  <p>Your own room in a home, plus access to shared spaces.</p>
                </article>
                <article>
                  <CiCalendarDate className='home-highlights-icon ' />
                  <h4>Free cancellation before Jul 27</h4>
                  <p>Get a full refund if you change your mind.</p>
                </article>
              </section>
              <section className='home-details-description'>
                <h3>About this place</h3>
                <p>{home.summary}</p>
              </section>
              <section className='home-details-facilities-list'>
                <h3>What this place offers</h3>
                <ul className='amenities-list'>
                  {home.amenities.map((amenity, idx) => {
                    const iconName = getAmenityIcon(amenity)
                    const IconComponent = iconComponents[iconName]
                    return (
                      <li key={idx} className='amenity-item'>
                        <IconComponent className='amenity-icon' />
                        <span>{amenity}</span>
                      </li>
                    )
                  })}
                </ul>
              </section>
            </div>

            <aside className='rare-modal'>
              <IoDiamond className='diamond-icon' />
              <p>Rare find! This place is usually booked</p>
            </aside>
            <section className='google-maps'>
              <h3>Where you'll be</h3>
              <APIProvider apiKey={API_KEY}>
                <Map
                  defaultZoom={13}
                  center={{
                    lat: home.loc.lat,
                    lng: home.loc.lng,
                  }}
                  gestureHandling={'greedy'}
                  disableDefaultUI={false}
                  style={{ height: '400px', width: '100%' }}
                />
                <Marker
                  position={{ lat: home.loc.lat, lng: home.loc.lng }}
                  clickable={true}
                  onClick={() => alert('marker was clicked!')}
                  title={'clickable google.maps.Marker'}
                />
              </APIProvider>
            </section>
          </section>
        </div>
      )}
    </>
    // <button
    //   onClick={() => {
    //     onAddHomeMsg(home._id)
    //   }}
    // >
    //   Add home msg
    // </button>
  )
}
