import React from 'react'

export const BookingPlaceholder = () => {
  return (
    <div className="reservations-placeholder-container">
      <div className="reservations-content">
        <img
          src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-reservations/original/6d5ef5a0-93bc-4dbe-89f3-9673e852d0be.png"
          alt="Manage reservations"
          className="reservations-illustration"
        />
        <h2>Manage your reservations and lists</h2>
        <p>
          When you're ready to book or host, we'll show your reservations and
          listings here.
        </p>
      </div>
    </div>
  )
}
