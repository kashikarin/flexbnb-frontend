import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterBy } from '../store/home.actions.js'
import { debounce} from '../services/util.service.js'

export function CapacityDropdown({ isOpen, onClose }){
    const dispatch = useDispatch()
    const dropdownRef = useRef()
    const filterBy = useSelector(store => store.homeModule.filterBy)
    // const [searchTxt, setSearchTxt] = useState(filterBy.txt || '')
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

    const timerId = setTimeout(()=>{
        document.addEventListener('mousedown  ', handleClickOutside)
    }, 0)
    return () => {
        clearTimeout(timerId)
        document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

    

    console.log('isopen??? ', isOpen)
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
                        <button disabled>-</button>
                        <span>0</span>
                        <button>+</button>
                    </div>
                </div>
                <div className="capacity-drowdown-category-row children">
                    <div className="category-row-description">
                        <div>Children</div>
                        <div>Ages 2-17</div>
                    </div>
                    <div className="category-row-user-action">
                        <button disabled>-</button>
                        <span>0</span>
                        <button>+</button>
                    </div>
                </div>
                <div className="capacity-drowdown-category-row infants">
                    <div className="category-row-description">
                        <div>Infants</div>
                        <div>Under 2</div>
                    </div>
                    <div className="category-row-user-action">
                        <button disabled>-</button>
                        <span>0</span>
                        <button>+</button>
                    </div>
                </div>
                <div className="capacity-drowdown-category-row pets">
                    <div className="category-row-description">
                        <div>Pets</div>
                        <div>Bringing a service animal?</div>
                    </div>
                    <div className="category-row-user-action">
                        <button disabled>-</button>
                        <span>0</span>
                        <button>+</button>
                    </div>
                </div>
            </div>
          </div>
        )}
    </div>
    )
}