import { useState } from 'react'

export function BuyingStepOneModal({ onClose, home, status }) {
  const [currentStep, setCurrentStep] = useState(1)
  function handleConfirm() {
    setCurrentStep(2)
  }

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
                {status === 'confirmed'
                  ? 'Reservation successfully'
                  : 'Reservation details'}
              </h3>
              <p>
                <span>Trip dates:</span>
                <span>09/11/22 - 17/11/22</span>
              </p>
              <p>
                <span>Guests:</span>
                <span>1 adult</span>
              </p>
            </div>

            <div className='reservation-price-details'>
              <h3>Price Details</h3>
              <div className='price-amount'>
                <p>
                  <span>${home.price} x 8 nights</span>
                  <span>${home.price * 8}</span>
                </p>
              </div>
              <div className='service-fee'>
                <p>
                  <span>Service fee</span>
                  <span>${home.price * 8 * 0.1}</span>
                </p>
              </div>
              <div className='total'>
                <p>
                  <span>Total</span>
                  <span>${home.price * 8}</span>
                </p>
              </div>
            </div>
          </div>

          <div className='property-image'>
            <img src={home.imageUrls[0]} alt='Property' />
            <div className='property-info'>
              <h4>
                {home.type} in {home.loc.city}, {home.loc.country}
              </h4>
              <p>{home.summary.split(' ').slice(0, 10).join(' ')}...</p>
            </div>
          </div>
        </div>

        <div className='modal-actions'>
          <button className='back-btn' onClick={onClose}>
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
