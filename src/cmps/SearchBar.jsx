import { useState, useEffect, useRef } from 'react'
import { WhereDropdown } from './WhereDropdown'
import { ReactSVG } from 'react-svg'
import { useDispatch, useSelector } from 'react-redux'
import { CapacityDropdown } from './CapacityDropdown.jsx'
import { SET_FILTERBY } from '../store/home.reducer.js'

export function SearchBar({ isScrolled }) {
  const [openedDropdown, setOpenedDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(isScrolled)
  const [isMobile, setIsMobile] = useState(false)
  const [activeButton, setActiveButton] = useState(null)
  const filterBy = useSelector(state => state.homeModule.filterBy)
  const dispatch = useDispatch()
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth
      setIsMobile(width <= 820)
    }

    // Set initial state
    handleResize()

    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setScrolled(isScrolled)
  }, [isScrolled])

  useEffect(() => {
    if (scrolled) setOpenedDropdown(null)
  }, [scrolled])

  useEffect(() => {
    //Close dropdown when clicking outside
    function handleClickOutside(event) {
  
        const isInsideSearchBar = event.target.closest('.search-bar-container')
        const isInsideAnyDropdown = event.target.closest('.dropdown-wrapper') || event.target.closest('.capacity-dropdown-container')
        
      if (openedDropdown && !isInsideSearchBar && !isInsideAnyDropdown) {
        setTimeout(() => {
          setOpenedDropdown(null)
        }, 0)
}
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openedDropdown])
  
  function onUpdateFilterBy(filter) {
        setFilterByToEdit(prevFilterByToEdit => ({ ...prevFilterByToEdit, ...filter}))
  }
  
  function handleWhereClick(btName) {
    // Don't expand SearchBar on mobile
    if (scrolled && !isMobile) setScrolled(false)

    setOpenedDropdown((curr) => (curr === btName ? null : btName))
    setActiveButton((curr) => (curr === btName ? null : btName))    
  }
  
  function onInputChange(ev) {
    const val = ev.target.value
    debouncedSetTxt(val)
  }
  function handleSubmit(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    dispatch({type: SET_FILTERBY, filterBy: filterByToEdit})
  }
  console.log(filterBy)
  return (
    <search className=''>
      {/* <div className={`search-bar-container ${scrolled ? 'scrolled' : ''}`}> */}
       <div className={`search-bar-container ${scrolled ? 'scrolled' : ''} ${activeButton ? 'has-active' : ''}`}>
          <div>
            <div onClick={()=>handleWhereClick('where')} className={`inner-section ${activeButton == 'where' ? 'active' : ''}`}>
            <div className='sTitle' >{scrolled ? 'Anywhere' : 'Where'}</div>
            {!scrolled && <input className='placeholder-content' onChange={onInputChange} type='search' placeholder='Search destination' value={filterByToEdit.city}></input>}
            <WhereDropdown
              isOpen={openedDropdown === 'where'}
              onOpen={() => setOpenedDropdown('where')}
              onClose={() => setOpenedDropdown(null)}
              cityFilter={filterBy.city || ''}
              onUpdateFilterBy={onUpdateFilterBy}
            />
          </div>
          <div className="sep"></div>
          <div onClick={()=>handleWhereClick('Check in')} className={`inner-section ${activeButton == 'Check in' ? 'active' : ''}`}>
            <div className='sTitle'>{scrolled ? 'Anytime' : 'Check in'}</div>
            {!scrolled && <input className='placeholder-content' type='search' placeholder='Add dates'></input>}
          </div>
          <div className="sep"></div>
          {!scrolled && <div onClick={()=>handleWhereClick('Check out')} className={`inner-section ${activeButton == 'Check out' ? 'active' : ''}`}>
            <div className='sTitle'>Check out</div>
            <input className='placeholder-content' type='search' placeholder='Add dates'></input>
          </div>}
          {!scrolled && <div className="sep"></div>}
          <div onClick={()=>handleWhereClick('capacity')} className={`inner-section ${activeButton == 'capacity' ? 'active' : ''}`}>
            <div className='sTitle'>{scrolled ? 'Add guests' : 'Who'}</div>
            {!scrolled && <input className='placeholder-content' type='search' placeholder='Add guests' value={`${filterByToEdit.capacity} ${filterByToEdit.capacity > 1 ? "guests" : "guest"}`}/>}
            <CapacityDropdown 
              isOpen={openedDropdown === 'capacity'}
              onOpen={()=>{setOpenedDropdown('capacity')}}
              onClose={() => setOpenedDropdown(null)}
              capacityFilter={filterBy.capacity || ''}
              onUpdateFilterBy={onUpdateFilterBy}
            />
            <div className='search-btn-section'>
                <button className='search-button' onMouseDown={(e) => {
                                                    e.stopPropagation()
                                                    e.preventDefault()
                                                  }} 
                                                  onClick={handleSubmit}
                                                >
                  <ReactSVG src="/svgs/search-icon.svg" />
                </button>
            </div>
            
          </div>
            {/* <div onClick={handleWhereClick} className='inner-section'>
              <div className='sTitle'>{scrolled ? 'Anywhere' : 'Where'}</div>
              {!scrolled && (
                <input
                  className='placeholder-content'
                  type='search'
                  placeholder='Search destination'
                ></input>
              )}
              <WhereDropdown
                isOpen={openedDropdown === 'where'}
                onOpen={() => setOpenedDropdown('where')}
                onClose={() => setOpenedDropdown(null)}
              />
            </div>
            <div className='sep'></div>
            <div className='inner-section'>
              <div className='sTitle'>{scrolled ? 'Anytime' : 'Check in'}</div>
              {!scrolled && (
                <input
                  className='placeholder-content'
                  type='search'
                  placeholder='Add dates'
                ></input>
              )}
            </div>
            <div className='sep'></div>
            {!scrolled && (
              <div className='inner-section'>
                <div className='sTitle'>Check out</div>
                <input
                  className='placeholder-content'
                  type='search'
                  placeholder='Add dates'
                ></input>
              </div>
            )}
            {!scrolled && <div className='sep'></div>}
            <div className='inner-section'>
              <div className='sTitle'>{isScrolled ? 'Add guests' : 'Who'}</div>
              {!scrolled && (
                <input
                  className='placeholder-content'
                  type='search'
                  placeholder='Add guests'
                ></input>
              )}
              <div className='search-btn-section'>
                <button className='search-button'>
                  <ReactSVG src='/svgs/search-icon.svg' />
                </button>
              </div>
            </div> */}
          </div>
      </div>
    </search>
  )
}
