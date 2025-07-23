import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterBy } from '../store/home.actions.js'
import { debounce} from '../services/util.service.js'
import { useEffectUpdate } from '../customHooks/useEffectUpdate.js'

export function WhereDropdown({ isOpen, onOpen, onClose, cityFilter, onSetFilterBy }){
console.log("🚀 ~ WhereDropdown ~ isOpen:", isOpen)

    const dispatch = useDispatch()
    const dropdownRef = useRef()
    const [cityFilterToEdit, setCityFilterToEdit] = useState({city: cityFilter || ''})
   // const onSetFilterByDebounce = useRef(dispatch(debounce(setFilterBy({ ...filterBy, txt: searchTxt }), 400))).current

    // useEffect(() => {
    //     onSetFilterByDebounce(searchTxt)
    // }, [searchTxt])

  useEffectUpdate(()=>{
    onSetFilterBy(cityFilterToEdit)
  }, [cityFilterToEdit])

  useEffect(() => {
    function handleClickOutside(ev) {
      setTimeout(()=>{
        const clickedOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(ev.target)
        const clickedOutsideOpener  = openerRef?.current && openerRef.current.contains(ev.target)
        if (clickedOutsideDropdown && clickedOutsideOpener) {
          onClose?.()
      }}, 0)
      }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const locations = [
    'Tel Aviv-Yafo', 'London', 'Barcelona'
  ]

    const suggestedPlaces = [
        // { title: 'Nearby', subtitle: "Find what's around you" },
        // { title: 'Eilat, Israel', subtitle: 'For a trip abroad' },
        { city: 'Tel Aviv-Yafo', country: 'Israel', subtitle: 'Popular beach destination' },
        { city: 'London', country: 'United Kingdom', subtitle: 'bla bla bla'},
        { city: 'Barcelona', country: 'Spain', subtitle: 'bla bla bla'},
        // { title: 'Jerusalem, Israel', subtitle: 'For sights like Church of the Holy Sepulchre' },
    ]

    function handleClick(ev, city) {
      ev.preventDefault()
      ev.stopPropagation()
      console.log('clicked')
      setCityFilterToEdit(prev => ({...prev, city}))
      onClose?.()
    }
    
    console.log(cityFilterToEdit)
    return (
      <div className="where-dropdown-wrapper" ref={dropdownRef}>
        {isOpen && (
          <div className="where-dropdown-panel">
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