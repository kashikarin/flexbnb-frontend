import { useState, useEffect, useRef } from 'react'
import { ReactSVG } from 'react-svg'
import { CapacityDropdown } from './CapacityDropdown'
import { BuyingStepOneModal } from './BuyingStepOneModal'
import { useSelector } from 'react-redux'
import {
  getRandom3NightsStayDatesStr,
  getNightsCount,
  roundToDecimals,
  strDateToTimestamp,
} from '../services/util.service'
import { orderService } from '../services/order'
import { addOrder } from '../store/actions/order.actions'

export function ReservationModal({ home, 
                                   potentialOrder, 
                                   setPotentialOrder, 
                                   onConfirmOrder, 
                                   isConfirmationModalOpen, 
                                   openConfirmationModal,
                                   closeConfirmationModal
                                  }) {
  const filterBy = useSelector((state) => state.homeModule.filterBy)
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)

  const [openedDropdown, setOpenedDropdown] = useState(null)
  const [dropdownWidth, setDropdownWidth] = useState(0)

  const dropdownWrapperRef = useRef(null)
  const selectionRef = useRef(null)

  const [adultsNum, setAdultsNum] = useState(potentialOrder.guests.adults ?? 0)
  const [childrenNum, setChildrenNum] = useState(potentialOrder.guests.children ?? 0)
  const [infantsNum, setInfantsNum] = useState(potentialOrder.guests.infants ?? 0)
  const [petsNum, setPetsNum] = useState(potentialOrder.guests.pets ?? 0)

  useEffect(() => {
    setAdultsNum(potentialOrder.guests.adults ?? 0)
    setChildrenNum(potentialOrder.guests.children ?? 0)
    setInfantsNum(potentialOrder.guests.infants ?? 0)
    setPetsNum(potentialOrder.guests.pets ?? 0)
  }, [filterBy, potentialOrder.guests])

  useEffect(() => {
    onUpdateGuestsDetails({
      adults: adultsNum,
      children: childrenNum,
      infants: infantsNum,
      pets: petsNum,
    })
  }, [adultsNum, childrenNum, infantsNum, petsNum])

  
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
    setPotentialOrder((prevPotentialOrder) => ({ ...prevPotentialOrder, guests: updatedGuests }))
  }

  // console.log(order)
  return (
    <>
      <aside className='reservation-section'>
        <div className='reservation-container'>
          <div className='reservation-details'>
            <div className='reservation-header'>
              <div className='reservation-header-price-container'>
                <span>{`${roundToDecimals(home.price).toLocaleString()}$ `}</span>
                <span>night</span>
              </div>
            </div>
            <div className='reservation-selection' ref={selectionRef}>
              <div className='reservation-selection-date-checkin'>
                <div>CHECK-IN</div>
                <div>{getRandom3NightsStayDatesStr().checkIn}</div>{' '}
              </div>
              <div className='reservation-selection-date-checkout'>
                <div>CHECK-OUT</div>
                <div name='endDate' onChange={handleChange}>
                  {getRandom3NightsStayDatesStr().checkOut}
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
            <button onClick={openConfirmationModal}>Reserve</button>
            <span>You won't be charged yet</span>
            <div className='reservation-summary-information-container'>
              <div className='cost-breakdown-container'>
                <div className='reservation-summary-row price'>
                  <span>${roundToDecimals(home.price).toLocaleString()} x 3 nights</span>
                  <span>${roundToDecimals(home.price * 3).toLocaleString()}</span>
                </div>
                <div className='reservation-summary-row service-fee'>
                  <span>Flexbnb service fee</span>
                  <span>${roundToDecimals(home.price * 3 * 0.14).toLocaleString()}</span>
                </div>
                <div className='reservation-summary-row total'>
                  <span>Total</span>
                  <span>${roundToDecimals(home.price * 3 * 0.14).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      {isConfirmationModalOpen && (
        <BuyingStepOneModal
          potentialOrder={potentialOrder}
          homePrice={home.price}
          homeType={home.type}
          homeCity={home.loc.city}
          homeCountry={home.loc.country}
          homeSummary={home.summary}
          onConfirmOrder={onConfirmOrder}
          closeConfirmationModal={closeConfirmationModal}
        />
      )}
    </>
  )
}
