import { useState, useEffect, useRef } from "react"
import { ReactSVG } from "react-svg"
import { CapacityDropdown } from "./CapacityDropdown"


export function ReservationModal({home}){
  const [openedDropdown, setOpenedDropdown] = useState(null)  
  const [dropdownWidth, setDropdownWidth] = useState(0)
  const dropdownWrapperRef = useRef(null)
  const selectionRef = useRef(null)
  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event) {
      if (openedDropdown && dropdownWrapperRef.current && !dropdownWrapperRef.current.contains(event.target)) {
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

  return(
        <aside className="reservation-section">
              <div className="reservation-container">
                <div className="reservation-details">
                  <div className="reservation-header">
                    <div className='reservation-header-price-container'>
                      <span>{`${home.price}$ `}</span><span>night</span>
                    </div>
                  </div>
                  <div className="reservation-selection" ref={selectionRef}>
                    <div className="reservation-selection-date-checkin">
                      <div>CHECK-IN</div> 
                      <div>Add date</div>
                    </div>
                    <div className="reservation-selection-date-checkout">
                      <div>CHECK-OUT</div> 
                      <div>Add date</div>
                    </div>
                    <div ref={dropdownWrapperRef} className="reservation-selection-guest-container" onClick={handleCapacityClick}>
                      <div className="reservation-selection-guest-container-guests">
                        <div>GUESTS</div>
                        <div>1 guest</div>
                      </div>
                      <ReactSVG src='/svgs/arrow-down.svg'/>
                    </div>
                    <CapacityDropdown 
                        isOpen={openedDropdown === 'capacity'}
                        onOpen={()=>{setOpenedDropdown('capacity')}}
                        onClose={() => setOpenedDropdown(null)}
                    />
                  </div>
                  <button>Reserve</button>
                  <span>You won't be charged yet</span>
                  <div className="reservation-summary-information-container">
                    <div className="cost-breakdown-container">
                      <div className="reservation-summary-row price">
                        <span>$p x n nights</span>
                        <span>$price</span>
                      </div>
                      <div className="reservation-summary-row service-fee">
                        <span>Flexbnb service fee</span>
                        <span>$fee</span>
                      </div>
                      <div className="reservation-summary-row taxes">
                        <span>Taxes</span>
                        <span>$taxes</span>
                      </div>
                      <div className="reservation-summary-row total">
                        <span>Total</span>
                        <span>$total</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
    )
}
