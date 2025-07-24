import { useState, useEffect, useRef } from 'react'
import { ReactSVG } from 'react-svg'
import { CapacityDropdown } from './CapacityDropdown'
import { BuyingStepOneModal } from './BuyingStepOneModal'
import { useSelector } from 'react-redux'
import {getRandom3NightsStayDatesStr, strDateToTimestamp} from '../services/util.service'
import { orderService } from '../services/order/order.service.local'
import { addOrder } from '../store/order.actions'


export function ReservationModal({ home, userId }) {
  const filterBy = useSelector(state => state.homeModule.filterBy)
  const loggedInUser = useSelector(state => state.userModule.loggedInUser)
  console.log("🚀 ~ ReservationModal ~ filterBy:", filterBy)
  const [openedDropdown, setOpenedDropdown] = useState(null)
  const [dropdownWidth, setDropdownWidth] = useState(0)
  const dropdownWrapperRef = useRef(null)
  const selectionRef = useRef(null)
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const checkinRef = useRef()
  const checkoutRef = useRef()
  function openReservationModal() {
    setIsReservationModalOpen(true)
  }
  function closeReservationModal() {
    setIsReservationModalOpen(false)
  }

  async function handleSubmitReservation(ev){
    ev.preventDefault()
    const startDateStr = checkinRef.current.textContent
    const endDateStr = checkoutRef.current.textContent
    const startDate = strDateToTimestamp(startDateStr)
    const endDate = strDateToTimestamp(endDateStr)
    const order = {
      homeId: home._id,
      userId: userId,
      startDate,
      endDate,
      guests: filterBy.capacity,
      totalPrice: home.price * 3 * 0.14
    }
    try {
      await addOrder(order)
      openReservationModal()
    } catch(err) {
        console.error('Cannot complete reservation', err)
    }
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

  function getGuestsNumStrToDisplay(){
    const {capacity} = filterBy
    console.log("🚀 ~ getGuestsNumStrToDisplay ~ capacity:", capacity)
    
    if (!capacity) return 'Add guests'
    return `${capacity} ${capacity > 1 ? "guests" : "guest"}`
  }

  function getNightsCount(startStr, endStr) {
    const [startDay, startMonth, startYear] = startStr.split('/').map(Number)
    const [endDay, endMonth, endYear] = endStr.split('/').map(Number)

    const startDate = new Date(startYear, startMonth - 1, startDay) 
    const endDate = new Date(endYear, endMonth - 1, endDay)

    const millisecondsPerDay = 1000 * 60 * 60 * 24
    const diffInMs = endDate - startDate

    return Math.round(diffInMs / millisecondsPerDay)
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
                <div ref={checkinRef} >{getRandom3NightsStayDatesStr().startDate}</div> {/*filterBy.startDate || 'Add date'*/}
              </div> 
              <div className='reservation-selection-date-checkout'>
                <div>CHECK-OUT</div>
                <div ref={checkoutRef}>{getRandom3NightsStayDatesStr().endDate}</div>
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
                      <div style={{ fontSize: '14px' }}>{getGuestsNumStrToDisplay()}</div>
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
            <button onClick={handleSubmitReservation}>Reserve</button>
            <span>You won't be charged yet</span>
            <div className='reservation-summary-information-container'>
              <div className='cost-breakdown-container'>
                <div className='reservation-summary-row price'>
                  <span>${home.price} x 3 nights</span>
                  <span>${home.price * 3}</span>
                </div>
                <div className='reservation-summary-row service-fee'>
                  <span>Flexbnb service fee</span>
                  <span>${(home.price * 3) * 0.14}</span>
                </div>
                <div className='reservation-summary-row total'>
                  <span>Total</span>
                  <span>${(home.price * 3) * 0.14}</span>
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
