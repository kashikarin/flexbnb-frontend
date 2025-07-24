import { useEffect, useRef, useState } from 'react'
import { ReactSVG } from 'react-svg'
import { useEffectUpdate } from '../customHooks/useEffectUpdate.js'

export function CapacityDropdown({ isOpen, onClose, filterByCapacity,  homeCapacity, petsAllowed, onUpdateOrderDetails }){
    console.log("🚀 ~ CapacityDropdown ~ filterByCapacity:", filterByCapacity)
    const dropdownRef = useRef()
    const [adultsNum, setAdultsNum] = useState(0)
    const [childrenNum, setChildrenNum] = useState(0)
    const [infantsNum, setInfantsNum] = useState(0)
    const [petsNum, setPetsNum] = useState(0)

    useEffectUpdate(()=>{
        if (typeof onUpdateOrderDetails !== 'function') return
        onUpdateOrderDetails({adults: adultsNum, children: childrenNum, infants: infantsNum})
    }, [adultsNum, childrenNum, infantsNum])

    // useEffect(()=>{
    //     setCapacityFilterToEdit({capacity: adultsNum + childrenNum + infantsNum + petsNum})
    // }, [adultsNum, childrenNum, infantsNum, petsNum])

    // console.log('isopen??? ', isOpen)
    return isOpen ? (
      <div className="capacity-dropdown-wrapper dropdown-wrapper" ref={dropdownRef}>
        <div className="capacity-dropdown-container">
            <div className="capacity-dropdown-panel">
                <div className="capacity-drowdown-categories-wrapper">
                    <div className="capacity-drowdown-category-row adults">
                        <div className="category-row-description">
                            <div>Adults</div>
                            <div>Age 18+</div>
                        </div>
                        <div className="category-row-user-action">
                            <button onMouseDown={(ev)=>{
                                
                                ev.preventDefault()
                                ev.stopPropagation()
                                }} 
                                onClick={() => setAdultsNum(prev => prev - 1)} 
                                disabled={adultsNum <= 0}
                            >
                                <ReactSVG src='/svgs/minus-icon.svg'/>
                            </button>
                            <span>{adultsNum}</span> {/*reservation modal -> filterByCapacity.adults || 0 */}
                            <button onMouseDown={(ev)=>{
                                ev.preventDefault()
                                ev.stopPropagation()
                                }} 
                                onClick={() => setAdultsNum(prev => prev + 1)}
                            >
                                <ReactSVG src='/svgs/plus-icon.svg'/>
                            </button>
                        </div>
                    </div>
                    <div className="capacity-drowdown-category-row children">
                        <div className="category-row-description">
                            <div>Children</div>
                            <div>Ages 2-17</div>
                        </div>
                        <div className="category-row-user-action">
                            <button onMouseDown={(ev)=>{
                                ev.preventDefault()
                                ev.stopPropagation()
                                }} 
                                onClick={() => setChildrenNum(prev => prev - 1)} 
                                disabled={childrenNum <= 0}
                            >
                                <ReactSVG src='/svgs/minus-icon.svg'/>
                            </button>
                            <span>{childrenNum}</span> {/*reservation modal -> filterByCapacity.children || 0 */}
                            <button onMouseDown={(ev)=>{
                                ev.preventDefault()
                                ev.stopPropagation()
                                }} 
                                onClick={() => setChildrenNum(prev => prev + 1)} 
                            >
                                <ReactSVG src='/svgs/plus-icon.svg'/>
                            </button>
                        </div>
                    </div>
                    <div className="capacity-drowdown-category-row infants">
                        <div className="category-row-description">
                            <div>Infants</div>
                            <div>Under 2</div>
                        </div>
                        <div className="category-row-user-action">
                            <button onMouseDown={(ev)=>{
                                ev.preventDefault()
                                ev.stopPropagation()
                                }} 
                                onClick={() => setInfantsNum(prev => prev - 1)} 
                                disabled={infantsNum <= 0}
                            >
                                <ReactSVG src='/svgs/minus-icon.svg'/>
                            </button>
                            <span>{infantsNum}</span> {/*reservation modal -> filterByCapacity.infants || 0 */}
                            <button onMouseDown={(ev)=>{
                                ev.preventDefault()
                                ev.stopPropagation()
                                }} 
                                onClick={() => setInfantsNum(prev => prev + 1)}
                            >
                                <ReactSVG src='/svgs/plus-icon.svg'/>
                            </button>
                        </div>
                    </div>
                    <div className="capacity-drowdown-category-row pets">
                        <div className="category-row-description">
                            <div>Pets</div>
                            <div>Bringing a service animal?</div>
                        </div>
                        <div className="category-row-user-action">
                            <button onMouseDown={(ev)=>{
                                ev.preventDefault()
                                ev.stopPropagation()
                                }} 
                                onClick={() => setPetsNum(prev => prev - 1)} 
                                disabled={petsNum <= 0}
                            >
                                <ReactSVG src='/svgs/minus-icon.svg'/>
                            </button>
                            <span>{petsNum}</span> {/*reservation modal -> filterByCapacity.pets || 0 */}
                            <button onMouseDown={(ev)=>{
                                ev.preventDefault()
                                ev.stopPropagation()
                                }} 
                                onClick={() => setPetsNum(prev => prev + 1)}
                            >
                                <ReactSVG src='/svgs/plus-icon.svg'/>
                            </button>
                        </div>
                    </div>
                    <div className="capacity-dropdown-capacity-description">
                        <span>This place has a maximum of {homeCapacity} {homeCapacity > 1 ? "guests" : 'guest'}, not including infants. Pets {petsAllowed ? 'are' : "aren't"} allowed</span>
                    </div>
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    </div>
    ) :
    null
}