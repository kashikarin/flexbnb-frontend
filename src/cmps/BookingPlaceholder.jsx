import React from 'react'
import { useIsMobile } from '../Providers/MobileProvider'
import { Link } from 'react-router-dom'
export const BookingPlaceholder = () => {
  const btnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px 24px',
    borderRadius: '8px',
    color: '#fff',
    border: '1px solid #E61E4D',
    fontSize: '16px',
    fontWeight: 600,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
    position: 'relative',
    minHeight: '48px',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    background:
      'linear-gradient(135deg, #E61E4D 0%, #E31C5F 50%, #D70466 100%)',
  }
  const isMobile = useIsMobile()
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
        {isMobile && (
          <section>
            <Link to="/hosting/reservations">
              <button className="placeholder-button">Create New Listing</button>
            </Link>
            <Link to="/hosting/reservations">
              <button className="placeholder-button">Reservations</button>
            </Link>
          </section>
        )}
      </div>
    </div>
  )
}
