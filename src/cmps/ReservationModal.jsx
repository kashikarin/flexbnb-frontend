import { useState, useEffect, useRef } from 'react'
import { ReactSVG } from 'react-svg'
import { CapacityDropdown } from './CapacityDropdown'
import { BuyingStepOneModal } from './BuyingStepOneModal'
import { useSelector } from 'react-redux'
import {
  getRandom3NightsStayDatesStr,
  getNightsCount,
  strDateToTimestamp,
} from '../services/util.service'
import { orderService } from '../services/order/order.service.local'
import { addOrder } from '../store/order.actions'

export function ReservationModal({ home, order, setOrder, onConfirmOrder }) {
  const filterBy = useSelector((state) => state.homeModule.filterBy)
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)

  const [openedDropdown, setOpenedDropdown] = useState(null)
  const [dropdownWidth, setDropdownWidth] = useState(0)

  const dropdownWrapperRef = useRef(null)
  const selectionRef = useRef(null)
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)

  const [adultsNum, setAdultsNum] = useState(order.guests.adults ?? 0)
  const [childrenNum, setChildrenNum] = useState(order.guests.children ?? 0)
  const [infantsNum, setInfantsNum] = useState(order.guests.infants ?? 0)
  const [petsNum, setPetsNum] = useState(order.guests.pets ?? 0)

  useEffect(() => {
    setAdultsNum(order.guests.adults ?? 0)
    setChildrenNum(order.guests.children ?? 0)
    setInfantsNum(order.guests.infants ?? 0)
    setPetsNum(order.guests.pets ?? 0)
  }, [filterBy, order.guests])

  useEffect(() => {
    onUpdateGuestsDetails({
      adults: adultsNum,
      children: childrenNum,
      infants: infantsNum,
      pets: petsNum,
    })
  }, [adultsNum, childrenNum, infantsNum, petsNum])

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

  function handleChange(ev) {
    // let { name: field, value } = target
    // console.log(ev)
  }
  function getGuestsNumStrToDisplay() {
    if (!adultsNum && !childrenNum) return 'Add guests'
    const guestsNum = Number(adultsNum ?? 0) + Number(childrenNum ?? 0)
    return `${guestsNum} ${guestsNum > 1 ? 'guests' : 'guest'}`
  }

  // function onUpdateDatesDetails() {
  //   setOrder(prevOrder => ({ ...prevOrder, ...updatedOrderDetails}))
  // }

  function onUpdateGuestsDetails(updatedGuests) {
    setOrder((prevOrder) => ({ ...prevOrder, guests: updatedGuests }))
  }

  // console.log(order)
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
                <div>{getRandom3NightsStayDatesStr().startDate}</div>{' '}
                {/*filterBy.startDate || 'Add date'*/}
              </div>
              <div className='reservation-selection-date-checkout'>
                <div>CHECK-OUT</div>
                <div name='endDate' onChange={handleChange}>
                  {getRandom3NightsStayDatesStr().endDate}
                </div>
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
                      <div style={{ fontSize: '14px' }} onChange={handleChange}>
                        {getGuestsNumStrToDisplay()}
                      </div>
                      <ReactSVG src='/svgs/arrow-down.svg' />
                    </div>
                  </div>
                </div>
                <div
                  ref={dropdownWrapperRef}
                  className='reservation-modal-capacity-dropdown-wrapper'
                >
                  <CapacityDropdown
                    isOpen={openedDropdown === 'capacity'}
                    onClose={() => setOpenedDropdown(null)}
                    father={'reservation-modal'}
                    adultsFilter={Number(adultsNum ?? 0)}
                    childrenFilter={Number(childrenNum ?? 0)}
                    infantsFilter={Number(infantsNum ?? 0)}
                    petsFilter={Number(petsNum ?? 0)}
                    setAdultsNum={setAdultsNum}
                    setChildrenNum={setChildrenNum}
                    setInfantsNum={setInfantsNum}
                    setPetsNum={setPetsNum}
                    homeCapacity={home.capacity}
                    petsAllowed={home.petsAllowed}
                  />
                </div>
              </div>
            </div>
            <button onClick={openReservationModal}>Reserve</button>
            <span>You won't be charged yet</span>
            <div className='reservation-summary-information-container'>
              <div className='cost-breakdown-container'>
                <div className='reservation-summary-row price'>
                  <span>${home.price} x 3 nights</span>
                  <span>${home.price * 3}</span>
                </div>
                <div className='reservation-summary-row service-fee'>
                  <span>Flexbnb service fee</span>
                  <span>${home.price * 3 * 0.14}</span>
                </div>
                <div className='reservation-summary-row total'>
                  <span>Total</span>
                  <span>${home.price * 3 * 0.14}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      {isReservationModalOpen && (
        <BuyingStepOneModal
          onClose={closeReservationModal}
          order={order}
          homePrice={home.price}
          homeType={home.type}
          homeCity={home.loc.city}
          homeCountry={home.loc.country}
          homeSummary={home.summary}
          onConfirmOrder={onConfirmOrder}
        />
      )}
    </>
  )
}
