import { useEffect, useRef, useState } from 'react'
import { ReactSVG } from 'react-svg'
import { useEffectUpdate } from '../customHooks/useEffectUpdate.js'


export function CapacityDropdown({ isOpen, onClose, capacityFilter, onUpdateFilterBy }){
    const dropdownRef = useRef()
    const [capacityFilterToEdit, setCapacityFilterToEdit] = useState({capacity: capacityFilter || ''})

    // const [searchTxt, setSearchTxt] = useState(filterBy.txt || '')
   // const onSetFilterByDebounce = useRef(dispatch(debounce(setFilterBy({ ...filterBy, txt: searchTxt }), 400))).current

    // useEffect(() => {
    //     onSetFilterByDebounce(searchTxt)
    // }, [searchTxt])
    useEffectUpdate(()=>{
        onUpdateFilterBy(capacityFilterToEdit)
    }, [capacityFilterToEdit])

  useEffect(() => {
    function handleClickOutside(ev) {
        setTimeout(()=>{
            const clickedOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(ev.target)
            if (clickedOutsideDropdown) {
          onClose?.()
    }}, 0)
      if (dropdownRef.current && !dropdownRef.current.contains(ev.target)) {
        onClose?.()
      }
    }
    document.addEventListener('mousedown', handleClickOutside), 0
    return () => document.removeEventListener('mousedown', handleClickOutside)}, [])

    function handleCapacityClick(ev, diff) {
        ev.preventDefault()
        ev.stopPropagation()
        console.log('capacity clicked')
        let currentCapacityFilter = Number(capacityFilterToEdit.capacity)
        currentCapacityFilter = currentCapacityFilter + diff
        setCapacityFilterToEdit({capacity: currentCapacityFilter})
    }
    

    // console.log('isopen??? ', isOpen)
    return (
      <div className="capacity-dropdown-wrapper" ref={dropdownRef}>
        {isOpen && (
          <div className="capacity-dropdown-panel">
            <div className="capacity-drowdown-categories-wrapper">
                <div className="capacity-drowdown-category-row adults">
                    <div className="category-row-description">
                        <div>Adults</div>
                        <div>Age 18+</div>
                    </div>
                    <div className="category-row-user-action">
                        <button onMouseDown={(ev) => handleCapacityClick(ev, -1)} disabled={capacityFilterToEdit.capacity <= 0}>
                            <ReactSVG src='/svgs/minus-icon.svg'/>
                        </button>
                        <span>{capacityFilterToEdit.capacity || ''}</span>
                        <button onMouseDown={(ev) => handleCapacityClick(ev, 1)}>
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
                        <button onMouseDown={(ev) => handleCapacityClick(ev, -1)} disabled={capacityFilterToEdit.capacity <= 0}>
                            <ReactSVG src='/svgs/minus-icon.svg'/>
                        </button>
                        <span>{capacityFilterToEdit.capacity || ''}</span>
                        <button onMouseDown={(ev) => handleCapacityClick(ev, 1)} >
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
                        <button onMouseDown={(ev) => handleCapacityClick(ev, -1)} disabled={capacityFilterToEdit.capacity <= 0}>
                            <ReactSVG src='/svgs/minus-icon.svg'/>
                        </button>
                        <span>{capacityFilterToEdit.capacity || ''}</span>
                        <button onMouseDown={(ev) => handleCapacityClick(ev, 1)}>
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
                        <button onMouseDown={(ev) => handleCapacityClick(ev, -1)} disabled={capacityFilterToEdit.capacity <= 0}>
                            <ReactSVG src='/svgs/minus-icon.svg'/>
                        </button>
                        <span>{capacityFilterToEdit.capacity || ''}</span>
                        <button onMouseDown={(ev) => handleCapacityClick(ev, 1)}>
                            <ReactSVG src='/svgs/plus-icon.svg'/>
                        </button>
                    </div>
                </div>
            </div>
          </div>
        )}
    </div>
    )
}