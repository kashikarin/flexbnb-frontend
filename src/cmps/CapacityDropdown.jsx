import { useEffect, useRef, useState } from 'react'
import { ReactSVG } from 'react-svg'
import { useEffectUpdate } from '../customHooks/useEffectUpdate.js'

export function CapacityDropdown({ isOpen, onOpen, onClose, capacityFilter, onUpdateFilterBy }){
    const dropdownRef = useRef()
    const [capacityFilterToEdit, setCapacityFilterToEdit] = useState(capacityFilter || '')
    const [adultsNum, setAdultsNum] = useState(0)
    const [childrenNum, setChildrenNum] = useState(0)
    const [infantsNum, setInfantsNum] = useState(0)
    const [petsNum, setPetsNum] = useState(0)
    
    useEffectUpdate(()=>{
        if (typeof onUpdateFilterBy === 'function') {
    onUpdateFilterBy({ capacityFilterToEdit })
  }
        // onUpdateFilterBy({capacityFilterToEdit})
    }, [capacityFilterToEdit.capacity])

    useEffect(()=>{
        setCapacityFilterToEdit({capacity: adultsNum + childrenNum + infantsNum + petsNum})
    }, [adultsNum, childrenNum, infantsNum, petsNum])

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
                            <span>{adultsNum}</span>
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
                            <span>{childrenNum}</span>
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
                            <span>{infantsNum}</span>
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
                            <span>{petsNum}</span>
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
                </div>
            </div>
        </div>
    </div>
    ) :
    null
}