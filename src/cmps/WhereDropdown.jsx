import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterBy } from '../store/home.actions.js'
import { debounce} from '../services/util.service.js'

export function WhereDropdown({ isOpen, onOpen, onClose }){

    const dispatch = useDispatch()
    const dropdownRef = useRef()
    const filterBy = useSelector(store => store.homeModule.filterBy)
    const [searchTxt, setSearchTxt] = useState(filterBy.txt || '')
   // const onSetFilterByDebounce = useRef(dispatch(debounce(setFilterBy({ ...filterBy, txt: searchTxt }), 400))).current

    // useEffect(() => {
    //     onSetFilterByDebounce(searchTxt)
    // }, [searchTxt])

  useEffect(() => {
    function handleClickOutside(ev) {
      if (dropdownRef.current && !dropdownRef.current.contains(ev.target)) {
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const locations = [
    'Tel Aviv', 'Eilat', 'Jerusalem'
  ]

    const suggestedPlaces = [
        { title: 'Nearby', subtitle: "Find what's around you" },
        { title: 'Eilat, Israel', subtitle: 'For a trip abroad' },
        { title: 'Tel Aviv-Yafo, Israel', subtitle: 'Popular beach destination' },
        { title: 'Jerusalem, Israel', subtitle: 'For sights like Church of the Holy Sepulchre' },
    ]

    return (
      <div className="where-dropdown-wrapper" ref={dropdownRef}>
        {isOpen && (
          <div className="dropdown-panel">
            <h4>Suggested destinations</h4>
            <ul>
              {suggestedPlaces.map((place, idx) => (
                <li key={idx} onClick={() => setSearchTxt(place.title)}>
                  <strong>{place.title}</strong>
                  <div className="subtitle">{place.subtitle}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
}