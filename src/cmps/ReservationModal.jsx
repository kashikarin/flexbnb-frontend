import { useState, useEffect, useRef } from 'react'
import { ReactSVG } from 'react-svg'
import { CapacityDropdown } from './CapacityDropdown'
import { BuyingStepOneModal } from './BuyingStepOneModal'
import { roundToDecimals } from '../services/util.service'
import { DatesDropdown } from './DatesDropdown'
import { draftOrderService } from '../services/draft-order/draft-order.service.local'
import { useSelector } from 'react-redux'
export function ReservationModal({
  home,
  draftOrder,
  updateDraftOrder,
  addOrder,
  isOrderConfirmationModalOpen,
  openOrderConfirmationModal,
  closeOrderConfirmationModal,
}) {
  const [openedDropdown, setOpenedDropdown] = useState(null)
  // const [dropdownWidth, setDropdownWidth] = useState(0)
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
  console.log(Boolean(loggedInUser))

  const rmSelectionRef = useRef(null)
  const rmDatesRef = useRef()
  const rmCapacityDropdownRef = useRef()

  const [adultsNum, setAdultsNum] = useState(draftOrder.guests?.adults ?? 0)
  const [childrenNum, setChildrenNum] = useState(
    draftOrder.guests?.children ?? 0
  )
  const [infantsNum, setInfantsNum] = useState(draftOrder.guests?.infants ?? 0)
  const [petsNum, setPetsNum] = useState(draftOrder.guests?.pets ?? 0)

  const { getNumberOfNights } = draftOrderService
  const nightsNum = getNumberOfNights(draftOrder.checkIn, draftOrder.checkOut)

  useEffect(() => {
    if (!draftOrder?.guests) return
    setAdultsNum(draftOrder.guests.adults ?? 0)
    setChildrenNum(draftOrder.guests.children ?? 0)
    setInfantsNum(draftOrder.guests.infants ?? 0)
    setPetsNum(draftOrder.guests.pets ?? 0)
  }, [draftOrder?.guests])
  // check if filterby is needed as a dependency

  useEffect(() => {
    onUpdateDatesDetails(home.price * nightsNum * 1.14)
    console.log(
      '🚀 ~ home.price * nightsNum * 1.14:',
      home.price * nightsNum * 1.14
    )
  }, [nightsNum])

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
      if (openedDropdown === 'checkIn' || openedDropdown === 'checkOut') {
        if (rmDatesRef.current && !rmDatesRef.current.contains(event.target)) {
          onCloseDropdown()
        }
      }

      if (openedDropdown === 'capacity') {
        if (
          rmCapacityDropdownRef.current &&
          !rmCapacityDropdownRef.current.contains(event.target)
        ) {
          onCloseDropdown()
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openedDropdown])

  // useEffect(() => {
  //   if (rmSelectionRef.current) {
  //     setDropdownWidth(rmSelectionRef.current.offsetWidth)
  //   }
  // }, [])

  function handleWhereClick(e, btName) {
    e.stopPropagation()
    setOpenedDropdown((curr) => (curr === btName ? null : btName))
  }

  function onCloseDropdown() {
    setOpenedDropdown(null)
  }

  function handleChange(ev) {
    // let { name: field, value } = target
  }
  function getGuestsNumStrToDisplay() {
    if (!adultsNum && !childrenNum) return 'Add guests'
    const guestsNum = Number(adultsNum ?? 0) + Number(childrenNum ?? 0)
    return `${guestsNum} ${guestsNum > 1 ? 'guests' : 'guest'}`
  }

  function onUpdateDatesDetails(updatedTotalPrice) {
    updateDraftOrder({ ...draftOrder, totalPrice: updatedTotalPrice })
  }

  function onUpdateGuestsDetails(updatedGuests) {
    updateDraftOrder({ ...draftOrder, guests: updatedGuests })
  }

  console.log('🚀 ~ draftOrder:', draftOrder)
  if (!draftOrder) return null
  return (
    <aside className="home-details-reservation-modal-section">
      <div className="reservation-header">
        <div className="reservation-header-price-container">
          <span>{`${roundToDecimals(home.price).toLocaleString()}$ `}</span>
          <span>night</span>
        </div>
      </div>
      <div className="reservation-selection" ref={rmSelectionRef}>
        <div
          className={`reservation-selection-date-checkin ${
            openedDropdown === 'checkIn' ? 'active' : ''
          }`}
          onClick={(e) => {
            e.stopPropagation()
            handleWhereClick(e, 'checkIn')
          }}
        >
          <div className="rmTitle">CHECK-IN</div>
          <input
            className="placeholder-content"
            type="search"
            placeholder="Add Dates"
            value={
              draftOrder?.checkIn ? draftOrder.checkIn.toLocaleDateString() : ''
            }
            readOnly
          />
        </div>
        <div
          className={`reservation-selection-date-checkout ${
            openedDropdown === 'checkOut' ? 'active' : ''
          }`}
          onClick={(e) => {
            e.stopPropagation()
            handleWhereClick(e, 'checkOut')
          }}
        >
          <div className="rmTitle">CHECK-OUT</div>
          <input
            className="rm-placeholder-content"
            type="search"
            placeholder="Add Dates"
            value={
              draftOrder?.checkOut
                ? draftOrder.checkOut.toLocaleDateString()
                : ''
            }
            readOnly
          />
        </div>

        {openedDropdown === 'checkIn' || openedDropdown === 'checkOut' ? (
          <div className="dates-dropdown-wrapper" ref={rmDatesRef}>
            <DatesDropdown
              isOpen={true}
              checkIn={draftOrder.checkIn}
              checkOut={draftOrder.checkOut}
              onSetDates={({ checkIn, checkOut }) => {
                updateDraftOrder({ ...draftOrder, checkIn, checkOut })
                if (checkIn && checkOut) onCloseDropdown()
              }}
            />
          </div>
        ) : null}
        {/* <div className="dates-dropdown-wrapper" ref={rmDatesRef}>
          <DatesDropdown
            isOpen={
              openedDropdown === 'checkIn' || openedDropdown === 'checkOut'
            }
            // onClose={() => setOpenedDropdown(null)}
            // rmDatesRef={rmDatesRef}
            checkIn={draftOrder.checkIn}
            checkOut={draftOrder.checkOut}
            onSetDates={({ checkIn, checkOut }) => {
              updateDraftOrder({ ...draftOrder, checkIn, checkOut })
              if (checkIn && checkOut) onCloseDropdown()
            }}
          />
        </div> */}

        <div
          // className='reservation-selection-guest-dropdown-wrapper'
          style={{
            position: 'relative',
            display: 'inline-block',
            gridColumn: 'span 2',
          }}
        >
          <div
            className={`reservation-selection-guest-container ${
              openedDropdown === 'capacity' ? 'active' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation()
              handleWhereClick(e, 'capacity')
            }}
          >
            <div className="reservation-selection-guests-input">
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
                <ReactSVG src="/svgs/arrow-down.svg" />
              </div>
            </div>
          </div>
          <div
            ref={rmCapacityDropdownRef}
            className="reservation-selection-guest-dropdown-wrapper"
          >
            <CapacityDropdown
              isOpen={openedDropdown === 'capacity'}
              onClose={onCloseDropdown}
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
      <button
        onClick={openOrderConfirmationModal}
        disabled={!loggedInUser}
        style={{
          cursor: !loggedInUser ? 'not-allowed' : 'pointer',
          background: !loggedInUser && 'gray',
        }}
      >
        Reserve
      </button>
      {loggedInUser && <span>You won't be charged yet</span>}

      {!loggedInUser && (
        <span>Please log in to be able to make a reservation</span>
      )}
      <div className="reservation-summary-information-container">
        <div className="cost-breakdown-container">
          <div className="reservation-summary-row price">
            <span>
              {roundToDecimals(home.price || 550).toLocaleString()} x{' '}
              {nightsNum} {nightsNum > 1 ? 'nights' : 'night'}
            </span>
            <span>
              {roundToDecimals(
                (home.price || 550) * nightsNum
              ).toLocaleString()}
            </span>
          </div>
          <div className="reservation-summary-row service-fee">
            <span>Flexbnb service fee</span>
            <span>
              $
              {roundToDecimals(
                (home.price || 550) * nightsNum * 0.14
              ).toLocaleString()}
            </span>
          </div>
          <div className="reservation-summary-row total">
            <span>Total</span>
            <span>
              $
              {roundToDecimals(
                (home.price || 550) * nightsNum * 1.14
              ).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      {isOrderConfirmationModalOpen && (
        <BuyingStepOneModal
          draftOrder={draftOrder}
          homePrice={home.price}
          nightsNum={nightsNum}
          homeType={home.type}
          homeCity={home.loc.city}
          homeCountry={home.loc.country}
          homeSummary={home.summary}
          addOrder={addOrder}
          closeOrderConfirmationModal={closeOrderConfirmationModal}
        />
      )}
    </aside>
  )
}
