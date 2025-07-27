import { useEffect, useState, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ReactSVG } from 'react-svg'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import {
  loadHome,
  addHomeMsg,
  addUserLike,
  removeUserLike,
} from '../store/home.actions'
import { addLike, removeLike } from '../store/user.actions'
import { getAvgRating } from '../services/util.service'
import { getAmenityIcon } from '../services/home/home.service.local'
import { FaHeart, FaStar } from 'react-icons/fa'
import { CiCalendarDate, CiHeart, CiLocationOn } from 'react-icons/ci'
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
import { ReservationModal } from '../cmps/ReservationModal'
import { BuyingStepOneModal } from '../cmps/BuyingStepOneModal'
import { BedIcon, CalendarIcon, DoorIcon } from '../assets/svgs/icons'
import { GuestFav } from '../cmps/GuestFav'
import { orderService } from '../services/order/order.service.local'
import { addOrder } from '../store/order.actions'
import { ScrollContext } from '../context/ScrollContext'

const API_KEY = 'AIzaSyBJ2YmMNH_NuHcoX7N49NXljbkOCoFuAwg'

export function HomeDetails() {
  const { homeId } = useParams()
  const filterBy = useSelector((state) => state.homeModule.filterBy)
  const home = useSelector((storeState) => storeState.homeModule.home)
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
  const [isLiked, setIsLiked] = useState(
    () => loggedInUser?.likedHomes?.includes(homeId) ?? false
  )
  const [order, setOrder] = useState(orderService.getEmptyOrder())
  const breakPointRef = useRef()
  const { setIsScrolledPast } = useContext(ScrollContext)
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
    if (!homeId || !loggedInUser) return
    initHome()
  }, [homeId, loggedInUser])

  useEffect(()=>{
    if (!breakPointRef.current) return
    const observer = new IntersectionObserver((entries)=>{
      const entry = entries[0]
      console.log("🚀 ~ entry:", entry)
      setIsScrolledPast(!entry.isIntersecting)
      
    })
    observer.observe(breakPointRef.current)
    return () => observer.unobserve(breakPointRef.current)
  }, [setIsScrolledPast])

  useEffect(() => {
    setIsLiked(loggedInUser?.likedHomes?.includes(homeId) ?? false)
  }, [loggedInUser?.likedHomes, homeId])

  async function initHome() {
    try {
      await loadHome(homeId)
      const initialOrderDetails = await orderService.getInitialOrderDetails(
        homeId,
        loggedInUser._id,
        filterBy
      )
      setOrder((prevOrder) => ({ ...prevOrder, ...initialOrderDetails }))
    } catch (err) {
      console.error('Cannot load data', err)
    }
  }

  async function onAddHomeMsg(homeId) {
    try {
      await addHomeMsg(homeId, 'bla bla ' + parseInt(Math.random() * 10))
      showSuccessMsg(`Home msg added`)
    } catch (err) {
      showErrorMsg('Cannot add home msg')
    }
  }

  async function handleHomeSave(e) {
    e.preventDefault()
    e.stopPropagation()
    if (!home || !loggedInUser) return
    const nextLiked = !isLiked
    setIsLiked(nextLiked)
    try {
      if (nextLiked) {
        await addLike(homeId, loggedInUser._id)
        await addUserLike(homeId, loggedInUser._id)
      } else {
        await removeLike(homeId, loggedInUser._id)
        await removeUserLike(homeId, loggedInUser._id)
      }
      await loadHome(homeId)
    } catch (err) {
      console.error('Cannot toggle like', err)
    }
  }

  function getIsHomeLiked() {
    if (!loggedInUser) return
    return loggedInUser.likedHomes?.includes(homeId)
  }

  async function onConfirmOrder() {
    try {
      await addOrder(order)
    } catch (err) {
      console.error('Cannot complete order', err)
    }
  }
  console.log('home:', home)
  return (
    <>
      {home && loggedInUser && (
        <div className='home-details-container'>
          <div className='home-details-header'>
            <h1>
              {home.type} in {home.loc.city}, {home.loc.country}
            </h1>
            <div className='home-details-heart' onClick={handleHomeSave}>
              <FaHeart
                className={`home-details-heart-icon ${isLiked ? 'saved' : ''}`}
              />
              <span>{isLiked ? 'Saved' : 'Save'}</span>
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
          <section className='mid-section' ref={breakPointRef}>
            <div className='home-details-mid'>
              <div
                className='home-details-amenities'
                style={
                  getAvgRating(home) >= 4
                    ? {}
                    : { borderBottom: '1px solid #e0e0e0' }
                }
              >
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
                {getAvgRating(home) < 4 && (
                  <div className='home-details-reviews'>
                    <span>
                      <FaStar
                        style={{
                          width: '8px',
                          height: '8px',
                          marginInlineEnd: '2px',
                          verticalAlign: 'middle',
                        }}
                      />
                      <span style={{ fontWeight: 'bold' }}>
                        {(
                          home.reviews.reduce(
                            (acc, review) => acc + review.rate,
                            0
                          ) / home.reviews.length || 0
                        ).toFixed(2)}{' '}
                      </span>
                    </span>
                    <span>•</span>
                    <span>{home.reviews.length} Reviews </span>
                  </div>
                )}
              </div>

              {getAvgRating(home) >= 4 && <GuestFav home={home} />}
              <section className='home-highlights'>
                <article>
                  <DoorIcon className='home-highlights-icon ' />
                  <h4>Self check-in</h4>
                  <p>Check yourself in with the lockbox.</p>
                </article>
                <article>
                  <BedIcon className='home-highlights-icon ' />
                  <h4>Room in a home</h4>
                  <p>Your own room in a home, plus access to shared spaces.</p>
                </article>
                <article>
                  <CalendarIcon className='home-highlights-icon ' />
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
            {order && (
              <ReservationModal
                home={home}
                order={order}
                setOrder={setOrder}
                onConfirmOrder={onConfirmOrder}
              />
            )}
          </section>
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
