import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import {
  loadHome,
  addHomeMsg,
  addUserLike,
  removeUserLike,
} from '../store/actions/home.actions'
import { addLike, removeLike } from '../store/actions/user.actions'
import { getAvgRating, loadFromStorage } from '../services/util.service'
import { FaCcVisa, FaHeart, FaStar } from 'react-icons/fa'
import {
  CiCalendarDate,
  CiHeart,
  CiLight,
  CiLocationOn,
  CiVault,
} from 'react-icons/ci'
import { IoDiamond } from 'react-icons/io5'
import { FaBuildingCircleCheck } from 'react-icons/fa6'
import { LuBedDouble } from 'react-icons/lu'
import { PiDoorOpenThin, PiVideoCameraLight } from 'react-icons/pi'
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
import { ReservationModal } from '../cmps/ReservationModal'
import { BedIcon, CalendarIcon, DoorIcon } from '../assets/svgs/icons'
import { GuestFav } from '../cmps/GuestFav'
import { ReviewCard } from '../cmps/ReviewCard'
import { homeService } from '../services/home'
import {
  setHomeDetailsImgNotScrolled,
  setHomeDetailsImgScrolled,
  setHomeDetailsStickyCardNotScrolled,
  setHomeDetailsStickyCardScrolled,
} from '../store/actions/scroll.actions'
import {
  addDraftOrder,
  closeOrderConfirmationModal,
  openOrderConfirmationModal,
  updateDraftOrder,
} from '../store/actions/draft-order.actions'
import { addOrder } from '../store/actions/order.actions'

const API_KEY = 'AIzaSyBJ2YmMNH_NuHcoX7N49NXljbkOCoFuAwg'

export function HomeDetails() {
  const { homeId } = useParams()
  const filterBy = useSelector((state) => state.homeModule.filterBy)
  const home = useSelector((storeState) => storeState.homeModule.home)
  const isOrderConfirmationModalOpen = useSelector(
    (state) => state.draftOrderModule.isOrderConfirmationModalOpen
  )
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
  const loggedInUserId = loggedInUser ? loggedInUser._id : null
  const [isLiked, setIsLiked] = useState(
    () => loggedInUser?.likedHomes?.includes(homeId) ?? false
  )
  const draftOrder = useSelector((state) => state.draftOrderModule.draftOrder)
  const imgBreakPointRef = useRef()
  // const stickyBreakPointRef = useRef()

  console.log(home)

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
    if (!homeId) return
    initHomeAndDraftOrder()
  }, [homeId, loggedInUser])

  useEffect(()=>{
    let purchaser = null
    if (!loggedInUser) updateDraftOrder({ ...draftOrder, purchaser: null })
    else {
      purchaser = {
        userId: loggedInUserId,
        fullname: loggedInUser.fullname
      }
      updateDraftOrder({ ...draftOrder, purchaser })
    }
    console.log(draftOrder)
  }, [loggedInUser])

  useEffect(() => {
    setIsLiked(loggedInUser?.likedHomes?.includes(homeId) ?? false)
  }, [loggedInUser?.likedHomes, homeId])

  async function initHomeAndDraftOrder() {
    try {
      await loadHome(homeId)
      await addDraftOrder(homeId, loggedInUserId, filterBy)
    } catch (err) {
      console.error('Cannot load home', err)
    }
  }

  // async function initdraftOrder(){
  //   try {
  //     await addDraftOrder(homeId, '68c0615a899984d302f063f5', filterBy)
  //   } catch (err) {
  //     console.error('Cannot load draft order', err)
  //   }

  // }
  useEffect(() => {
    try {
      const elAfterImg = imgBreakPointRef.current
      const stickySentinel = document.querySelector("#sticky-sentinel")
      const header = document.querySelector(".home-details-header")
      const headerHeight = header?.offsetHeight ?? 0

      if (!header || !elAfterImg || !stickySentinel) return


      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target === elAfterImg) {
              if (entry.isIntersecting) setHomeDetailsImgNotScrolled()
              else setHomeDetailsImgScrolled()
            }

            if (entry.target === stickySentinel) {
              if (entry.isIntersecting) setHomeDetailsStickyCardNotScrolled()
              else setHomeDetailsStickyCardScrolled()
            }
          })
        },
        { root: null,
          threshold: 0,
          rootMargin: "-80px 0px 0px 0px"
          
        }
      )

          if (elAfterImg) observer.observe(elAfterImg)
          if (stickySentinel) observer.observe(stickySentinel)
          
            return () => {
            if (elAfterImg) observer.unobserve(elAfterImg)
            if (stickySentinel) observer.unobserve(stickySentinel)
            observer.disconnect()
          }
        } catch (err) {
          console.error('💥 IntersectionObserver failed:', err)
        }
      }, [home])
      
      // useEffect(() => {
      //   const header = document.querySelector(".home-details-header")
      //   const headerHeight = header?.offsetHeight
      //   const sentinel = document.querySelector("#sticky-sentinel")
      //   if (!sentinel || !header) return

      //   const observer = new IntersectionObserver(
      //     (entries) => {
      //       const entry = entries[0]
      //       if (entry.isIntersecting) {
      //         // Sentinel is visible -> sticky still in view
      //         setHomeDetailsStickyCardNotScrolled()
      //       } else {
      //         // Sentinel went out -> sticky scrolled past header
      //         setHomeDetailsStickyCardScrolled()
      //       }
      //     },
      //     {
      //       root: null,
      //       threshold: 0,
      //       rootMargin: `-${headerHeight}px 0px 0px 0px`, // account for header
      //     }
      //   )

      //   observer.observe(sentinel)

      //   return () => observer.disconnect()
      // }, [])
      
      // useEffect(() => {
      //   const reservationEl = document.querySelector("#reservation-sentinel")
      //   const header = document.querySelector(".home-details-header")
      //   if (!reservationEl) return

      //   const headerHeight = header.offsetHeight

      //   function onScroll() {
      //     const rect = reservationEl.getBoundingClientRect()
      //     // rect.bottom tells you where the sticky card ends relative to viewport
      //     console.log("sentinel rect.top:", rect.bottom, "headerHeight:", headerHeight)
      //     if (rect.bottom <= headerHeight) {
      //       // card is fully above header -> show button
      //       setHomeDetailsStickyCardScrolled()
      //     } else {
      //       setHomeDetailsStickyCardNotScrolled()
      //     }
      //   }

      //   window.addEventListener("scroll", onScroll, { passive: true })
      //   onScroll() // run once initially
      //   return () => window.removeEventListener("scroll", onScroll)
      // }, [])

  // async function onAddHomeMsg(homeId) {
  //   try {
  //     await addHomeMsg(homeId, 'bla bla ' + parseInt(Math.random() * 10))
  //     showSuccessMsg(`Home msg added`)
  //   } catch (err) {
  //     showErrorMsg('Cannot add home msg')
  //   }
  // }

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

  // function getIsHomeLiked() {
  //   if (!loggedInUser) return
  //   return loggedInUser.likedHomes?.includes(homeId)
  // }

  return (
    <>
      {home && (
        <div className="home-details-container narrow-layout">
          <div className="home-details-header">
            <h1>
              {home.type} in {home.loc.city}, {home.loc.country}
            </h1>
            <div className="home-details-heart" onClick={handleHomeSave}>
              <FaHeart
                className={`home-details-heart-icon ${isLiked ? 'saved' : ''}`}
              />
              <span>{isLiked ? 'Saved' : 'Save'}</span>
            </div>
          </div>
          <div className="home-details-img-container" id='hd-images-container' ref={imgBreakPointRef}>
            {home.imageUrls.map((imageUrl, idx) => {
              return (
                <img
                  key={idx}
                  className="home-details-img"
                  src={imageUrl}
                  alt={`Home image ${idx + 1}`}
                />
              )
            })}
          </div>
          {/* <div /> */}
          <section className="home-details-mid-section">
            <div className="home-details-mid-left-part-wrapper">
              <div
                id='home-details-amenities-container'
                className="home-details-amenities"
                style={
                  getAvgRating(home) >= 4
                    ? {}
                    : { borderBottom: '1px solid #e0e0e0' }
                }
              >
                <h2>
                  {home.type} in {home.loc.city}, {home.loc.country}
                </h2>

                <div className="home-details-amenities-list">
                  <p>{home.capacity} guests</p>
                  <span>•</span>
                  <p>{home.bedsCount} beds</p>
                  <span>•</span>
                  <p>{home.bathCount} bath</p>
                </div>
                {getAvgRating(home) < 4 && (
                  <div className="home-details-reviews-headline">
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
                        {getAvgRating(home).toFixed(2)}{' '}
                      </span>
                    </span>
                    <span>•</span>
                    <span>{home.reviews.length} Reviews </span>
                  </div>
                )}
              </div>

              {getAvgRating(home) >= 4 && <GuestFav home={home} />}
              <section className="home-details-home-highlights">
                <article>
                  <DoorIcon className="home-highlights-icon " />
                  <h4>Self check-in</h4>
                  <p>Check yourself in with the lockbox.</p>
                </article>
                <article>
                  <BedIcon className="home-highlights-icon " />
                  <h4>Room in a home</h4>
                  <p>Your own room in a home, plus access to shared spaces.</p>
                </article>
                <article>
                  <CalendarIcon className="home-highlights-icon " />
                  <h4>Free cancellation before Jul 27</h4>
                  <p>Get a full refund if you change your mind.</p>
                </article>
              </section>
              <section className="home-details-description">
                <h3>About this place</h3>
                <p>{home.summary}</p>
              </section>
              <section className="home-details-facilities-list">
                <h3>What this place offers</h3>
                <ul className="amenities-list">
                  {home.amenities.map((amenity, idx) => {
                    const iconName = homeService.getAmenityIcon(amenity)
                    const IconComponent = iconComponents[iconName]
                    return (
                      <li key={idx} className="amenity-item">
                        <IconComponent className="amenity-icon" />
                        <span>{amenity}</span>
                      </li>
                    )
                  })}
                </ul>

              </section>
            </div>
            <div className="home-details-mid-right-part-wrapper">
              <section className="home-details-sticky-sidebars">
                <aside className="rare-modal">
                  <IoDiamond className="diamond-icon" />
                  <p>Rare find! This place is usually booked</p>
                </aside>
                {draftOrder && home && (<ReservationModal
                  home={home}
                  draftOrder={draftOrder}
                  updateDraftOrder={updateDraftOrder}
                  addOrder={addOrder}
                  isOrderConfirmationModalOpen={isOrderConfirmationModalOpen}
                  openOrderConfirmationModal={openOrderConfirmationModal}
                  closeOrderConfirmationModal={closeOrderConfirmationModal}
                />)}
              </section> 
              <div id="sticky-sentinel" style={{ height: "250px"}} /> 
            </div>
          </section>
          {/* <div id="reservation-sentinel" style={{ height: "1px" }} /> */}

          {/* <div /> */}
          <section className='home-details-reviews-section' >
            <ReviewCard reviews={home.reviews} />
          </section>
          <section className="home-details-google-maps-section" id='hd-location-container'>
            <h3>Where you'll be</h3>
            <APIProvider apiKey={import.meta.env.VITE_API_GOOGLE_KEY}>
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
