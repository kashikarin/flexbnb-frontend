import { useState } from 'react'
import { useNavigate } from 'react-router'
import { roundToDecimals } from '../services/util.service'

export function BuyingStepOneModal({
  potentialOrder,
  homePrice,
  homeType,
  homeCity,
  homeCountry,
  homeSummary,
  onConfirmOrder,
  closeConfirmationModal
}) {
  const [currentStep, setCurrentStep] = useState(1)
  const navigate = useNavigate()

  async function handleConfirm() {
    await onConfirmOrder()
    setCurrentStep(2)
  }
  const stayNightsNum = Math.floor((potentialOrder.endDate - potentialOrder.startDate) / 86400000)
  const guestsNum =
    Number(potentialOrder.guests.adults ?? 0) + Number(potentialOrder.guests.children ?? 0)
  const serviceFeeRate = 0.14

  return (
    <div className='buying-modal-step-one'>
      <div>
        <h3>{currentStep === 2 ? 'Booking Confirmed!' : 'One last step'}</h3>
        <p>
          {currentStep === 2 ? (
            'Thank you! Your reservation has been successfully confirmed.'
          ) : (
            <>
              Dear Guest,
              <br />
              In order to complete your reservation, please confirm your trip
              details.
            </>
          )}
        </p>

        <div className='reservation-details'>
          <div className='reservation-info'>
            <div className='reservation-date-guest'>
              <h3>
                {currentStep === 2
                  ? 'Reservation successfully'
                  : 'Reservation details'}
              </h3>
              <p>
                <span>Trip dates:</span>
                <span>{`${potentialOrder.startDate} - ${potentialOrder.endDate}`}</span>
              </p>
              <p>
                <span>Guests:</span>
                <span>{`${guestsNum} ${
                  guestsNum > 1 ? 'guests' : 'guest'
                }`}</span>
              </p>
            </div>

            <div className='reservation-price-details'>
              <h3>Price Details</h3>
              <div className='price-amount'>
                <p>
                  <span>{`${roundToDecimals(homePrice).toLocaleString()} x ${stayNightsNum} ${
                    stayNightsNum > 1 ? 'nights' : 'night'
                  }`}</span>
                  <span>${roundToDecimals(homePrice * stayNightsNum).toLocaleString()}</span>
                </p>
              </div>
              <div className='service-fee'>
                <p>
                  <span>Service fee</span>
                  <span>{roundToDecimals(homePrice * stayNightsNum * serviceFeeRate).toLocaleString()}</span>
                </p>
              </div>
              <div className='total'>
                <p>
                  <span>Total</span>
                  <span>
                    {roundToDecimals(homePrice * stayNightsNum * (1 + serviceFeeRate)).toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className='property-image'>
            <img src={potentialOrder.home.imgUrl} alt='Property' />
            <div className='property-info'>
              <h4>
                {homeType} in {homeCity}, {homeCountry}
              </h4>
              <p>{homeSummary.split(' ').slice(0, 10).join(' ')}...</p>
            </div>
          </div>
        </div>

        <div className='modal-actions'>
          <button
            className='back-btn'
            onClick={() => {
              if (currentStep === 2) navigate('/')
              else closeConfirmationModal()
            }}
          >
            {currentStep === 2 ? 'Close' : 'Back'}
          </button>
          {currentStep !== 2 && (
            <button className='confirm-btn' onClick={handleConfirm}>
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
