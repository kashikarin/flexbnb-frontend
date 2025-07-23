import { useState, useEffect, useRef } from 'react'
import { ReactSVG } from 'react-svg'
import { CapacityDropdown } from './CapacityDropdown'
import { BuyingStepOneModal } from './BuyingStepOneModal'

export function ReservationModal({ home }) {
  const [openedDropdown, setOpenedDropdown] = useState(null)
  const [dropdownWidth, setDropdownWidth] = useState(0)
  const dropdownWrapperRef = useRef(null)
  const selectionRef = useRef(null)
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  function openReservationModal() {
    setIsReservationModalOpen(true)
  }
  function closeReservationModal() {
    setIsReservationModalOpen(false)
  }
  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event) {
      if (
        openedDropdown &&
        dropdownWrapperRef.current &&
        !dropdownWrapperRef.current.contains(event.target)
      ) {
        setOpenedDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openedDropdown])

  useEffect(() => {
    if (selectionRef.current) {
      setDropdownWidth(selectionRef.current.offsetWidth)
    }
  }, [])

  function handleCapacityClick(e) {
    e.stopPropagation()
    setOpenedDropdown(openedDropdown === 'capacity' ? null : 'capacity')
  }

  return (
    <>
      <aside className='reservation-section'>
        <div className='reservation-container'>
          <div className='reservation-details'>
            <div className='reservation-header'>
              <div className='reservation-header-price-container'>
                <span>{`${home.price}$ `}</span>
                <span>night</span>
              </div>
            </div>
            <div className='reservation-selection' ref={selectionRef}>
              <div className='reservation-selection-date-checkin'>
                <div>CHECK-IN</div>
                <div>Add date</div>
              </div>
              <div className='reservation-selection-date-checkout'>
                <div>CHECK-OUT</div>
                <div>Add date</div>
              </div>
              <div
                className='reservation-selection-guest-dropdown-wrapper'
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  gridColumn: 'span 2',
                }}
              >
                <div
                  ref={dropdownWrapperRef}
                  className='reservation-selection-guest-container'
                  onClick={handleCapacityClick}
                >
                  <div className='reservation-selection-guest-container-guests'>
                    <div>GUESTS</div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ fontSize: '14px' }}>1 guest</div>
                      <ReactSVG src='/svgs/arrow-down.svg' />
                    </div>
                  </div>
                </div>
                <CapacityDropdown
                  isOpen={openedDropdown === 'capacity'}
                  onOpen={() => {
                    setOpenedDropdown('capacity')
                  }}
                  onClose={() => setOpenedDropdown(null)}
                />
              </div>
            </div>
            <button onClick={openReservationModal}>Reserve</button>
            <span>You won't be charged yet</span>
            <div className='reservation-summary-information-container'>
              <div className='cost-breakdown-container'>
                <div className='reservation-summary-row price'>
                  <span>$p x n nights</span>
                  <span>$price</span>
                </div>
                <div className='reservation-summary-row service-fee'>
                  <span>Flexbnb service fee</span>
                  <span>$fee</span>
                </div>
                <div className='reservation-summary-row taxes'>
                  <span>Taxes</span>
                  <span>$taxes</span>
                </div>
                <div className='reservation-summary-row total'>
                  <span>Total</span>
                  <span>$total</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      {isReservationModalOpen && (
        <BuyingStepOneModal onClose={closeReservationModal} home={home} />
      )}
    </>
  )
}
