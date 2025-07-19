import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadHome, addHomeMsg } from '../store/home.actions'
import { getAvgRating } from '../services/util.service'
import { FaHeart, FaStar } from 'react-icons/fa'
import { CiHeart } from 'react-icons/ci'
import { IoDiamond } from 'react-icons/io5'
import { FaBuildingCircleCheck } from 'react-icons/fa6'

export function HomeDetails() {
  const { homeId } = useParams()
  const home = useSelector((storeState) => storeState.homeModule.home)

  useEffect(() => {
    loadHome(homeId)
    console.log('homeId:', homeId)
  }, [homeId])

  async function onAddHomeMsg(homeId) {
    try {
      await addHomeMsg(homeId, 'bla bla ' + parseInt(Math.random() * 10))
      showSuccessMsg(`Home msg added`)
    } catch (err) {
      showErrorMsg('Cannot add home msg')
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
              <div className='home-details-heart'>
                <FaHeart className='home-details-heart-icon' />
                <span>Save</span>
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
                  <FaBuildingCircleCheck className='home-highlights-icon ' />
                  <h4>Self check-in</h4>
                  <p>Check yourself in with the lockbox.</p>
                </article>
              </section>
            </div>
            <aside className='rare-modal'>
              <IoDiamond className='diamond-icon' />
              <p>Rare find! This place is usually booked</p>
            </aside>
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
