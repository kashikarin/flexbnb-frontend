import { useEffect, useRef, useState } from 'react'
import { useEffectUpdate } from '../customHooks/useEffectUpdate.js'

export function WhereDropdown({ isOpen, onOpen, onClose, cityFilter, onUpdateFilterBy, dropdownRef }){

    //const dropdownRef = useRef()
    const [cityFilterToEdit, setCityFilterToEdit] = useState({city: cityFilter || ''})
   // const onSetFilterByDebounce = useRef(dispatch(debounce(setFilterBy({ ...filterBy, txt: searchTxt }), 400))).current

    // useEffect(() => {
    //     onSetFilterByDebounce(searchTxt)
    // }, [searchTxt])

  useEffectUpdate(()=>{
        console.log("🚀 ~ cityFilterToEdit:", cityFilterToEdit)
    onUpdateFilterBy(cityFilterToEdit)
  }, [cityFilterToEdit])

    const suggestedPlaces = [
        // { title: 'Nearby', subtitle: "Find what's around you" },
        // { title: 'Eilat, Israel', subtitle: 'For a trip abroad' },
        { city: 'Tel Aviv-Yafo', country: 'Israel', subtitle: 'Popular beach destination' },
        { city: 'London', country: 'United Kingdom', subtitle: 'bla bla bla'},
        { city: 'Barcelona', country: 'Spain', subtitle: 'bla bla bla'},
        // { title: 'Jerusalem, Israel', subtitle: 'For sights like Church of the Holy Sepulchre' },
    ]

    function handleClick(ev, city) {
      console.log("🚀 ~ city:", city)
      ev.preventDefault()
      ev.stopPropagation()
      setCityFilterToEdit({city})
      onClose?.()
    }
    
    return (
      <div ref={dropdownRef}>
        {isOpen && (
          <div className="where-dropdown-panel dropdown-wrapper">
            <h4>Suggested destinations</h4>
            <ul>
              {suggestedPlaces.map((place, idx) => (
                <li key={idx} onPointerDown={(ev) => handleClick(ev, place.city)}>
                  <strong>{place.city}, {place.country}</strong>
                  <div className="subtitle">{place.subtitle}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
}