import { useState, useEffect, useRef } from 'react'
import { WhereDropdown } from './WhereDropdown'
import { ReactSVG } from 'react-svg'
import { useDispatch, useSelector } from 'react-redux'
import { CapacityDropdown } from './CapacityDropdown.jsx'
import { SET_FILTERBY } from '../store/home.reducer.js'
import { homeService } from '../services/home/home.service.local.js'

export function SearchBar({ isScrolled }) {
  const [openedDropdown, setOpenedDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(isScrolled)
  const [isMobile, setIsMobile] = useState(false)
  const [activeButton, setActiveButton] = useState(null)
  const filterBy = useSelector((state) => state.homeModule.filterBy)
  const dispatch = useDispatch()
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const searchBarRef = useRef()
  const dropdownRef = useRef()

  const [adultsNum, setAdultsNum] = useState(filterBy.adults ?? 0)
  const [childrenNum, setChildrenNum] = useState(filterBy.children ?? 0)
  const [infantsNum, setInfantsNum] = useState(filterBy.infants ?? 0)
  const [petsNum, setPetsNum] = useState(filterBy.pets ?? 0)

  const capacity = Number(adultsNum ?? 0) + 
                   Number(childrenNum ?? 0) + 
                   Number(infantsNum ?? 0)

  useEffect(()=>{
    setFilterByToEdit(prevFilterByToEdit => ({ ...prevFilterByToEdit, 
                                               adults: adultsNum, 
                                               children: childrenNum,
                                              infants: infantsNum,
                                              pets: petsNum}))
  }, [adultsNum, childrenNum, infantsNum, petsNum])

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
    // Close dropdown when clicking outside
    function handleClickOutside(event) {
      if (openedDropdown && 
          // !searchBarRef.current.contains(event.target) && 
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ){
        setOpenedDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openedDropdown])
  

  function onUpdateFilterBy(filter) {
    setFilterByToEdit((prevFilterByToEdit) => ({
      ...prevFilterByToEdit,
      ...filter,
    }))
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
    dispatch({ type: SET_FILTERBY, filterBy: filterByToEdit })
  }

  function getGuestsNumStrToDisplay() {
    const { adults, children, infants, pets } = filterByToEdit
    if (!adults && !children && !infants && !pets) return 'Add guests'
    const guestsNum = Number(adults ?? 0) + 
                      Number(children ?? 0) + 
                      Number(infants ?? 0) 
    return `${guestsNum} ${guestsNum > 1 ? 'guests' : 'guest'}`
  }

  function getWhoTitleTxt() {
    if (scrolled) {
        const {adults, children, infants} = filterByToEdit
        const guestsNum = Number(adults ?? 0) + 
                          Number(children ?? 0) + 
                          Number(infants ?? 0)  
        return capacity ? getGuestsNumStrToDisplay() : 'Add guests'
    } else {
        return 'Who'
    }
  }

  function getWhereTitleText() {
    let txt
    if (scrolled) {
        txt = filterByToEdit.city ? `Homes in ${filterBy.city}` : 'Anywhere'
    } else {
        txt = 'Where'
        // filterByToEdit.city ? `${filterByToEdit.city}, ${homeService.getCountry(filterByToEdit.city)}` : 'Where'
    }
    return txt
  }

  function getCheckinTitleText() {
    let txt 
    if (scrolled) {
      if (filterByToEdit.startDate) { //scroll + there is startdate
          const checkinDate = new Date(filterByToEdit.startDate)
          const checkoutDate = filterByToEdit.endDate ? new Date(filterByToEdit.endDate) : new Date(filterByToEdit.startDate + 86400000)
          const options = {month: 'short', day: 'numeric'}
          const shortCheckinDate = new Intl.DateTimeFormat('en-US', options).format(checkinDate)
          const shortCheckoutDate = (checkinDate.getMonth() === checkoutDate.getMonth()) ? checkoutDate.getDate() : new Intl.DateTimeFormat('en-US', options).format(checkoutDate)
          txt = shortCheckinDate + shortCheckoutDate      
      } else if (filterByToEdit.endDate) { //scroll + there is not startdate but there is end date
          const checkoutDate = new Date(filterByToEdit.startDate)
          const checkinDate = new Date(filterByToEdit.endDate - 86400000)
          const options = {month: 'short', day: 'numeric'}
          const shortCheckinDate = new Intl.DateTimeFormat('en-US', options).format(checkinDate)
          const shortCheckoutDate = (checkinDate.getMonth() === checkoutDate.getMonth()) ? checkoutDate.getDate() : new Intl.DateTimeFormat('en-US', options).format(checkoutDate)
          txt = shortCheckinDate + shortCheckoutDate      
      } else txt = 'Anytime' //scroll + no dates
    } else txt = 'Check in'      
    return txt   
  }
    
  function getCheckoutTitleText(){
    let txt
    if (!scrolled) {
      if (filterByToEdit.endDate) {
        const checkoutDate = new Date(filterByToEdit.startDate)
          const checkinDate = new Date(filterByToEdit.endDate - 86400000)
          const options = {month: 'short', day: 'numeric'}
          const shortCheckinDate = new Intl.DateTimeFormat('en-US', options).format(checkinDate)
          const shortCheckoutDate = (checkinDate.getMonth() === checkoutDate.getMonth()) ? checkoutDate.getDate() : new Intl.DateTimeFormat('en-US', options).format(checkoutDate)
          txt = shortCheckoutDate      
      }
    }
  }
  return (
    <search className=''>
      {/* <div className={`search-bar-container ${scrolled ? 'scrolled' : ''}`}> */}
      <div
        className={`search-bar-container ${scrolled ? 'scrolled' : ''} ${
          activeButton ? 'has-active' : ''
        }`}
        ref={searchBarRef}
      >
        <div>
          <div
            onClick={() => handleWhereClick('where')}
            className={`inner-section ${
              activeButton == 'where' ? 'active' : ''
            }`}
          >
            <div className='sTitle'>{getWhereTitleText()}</div>
            {!scrolled && (<input
                className={`placeholder-content ${scrolled ? 'scrolled' : ''}`}
                onChange={onInputChange}
                type='search'
                placeholder='Search destination'
                value={filterByToEdit.city? filterByToEdit.city + ', ' + homeService.getCountry(filterByToEdit.city)
                  :
                  undefined}
              />)}
            <WhereDropdown
              isOpen={openedDropdown === 'where'}
              onOpen={() => setOpenedDropdown('where')}
              onClose={() => setOpenedDropdown(null)}
              cityFilter={filterBy.city || ''}
              onUpdateFilterBy={onUpdateFilterBy}
            />
          </div>
          <div className='sep'></div>
          <div
            onClick={() => handleWhereClick('Check in')}
            className={`inner-section ${
              activeButton == 'Check in' ? 'active' : ''
            }`}
          >
            <div className='sTitle'>{getCheckinTitleText()}</div>
            {!scrolled && (
              <input
                className='placeholder-content'
                type='search'
                placeholder='Add dates'
                value={filterByToEdit.startDate}
              />
            )}
          </div>
          <div className='sep'></div>
          {!scrolled && (
            <div
              onClick={() => handleWhereClick('Check out')}
              className={`inner-section ${
                activeButton == 'Check out' ? 'active' : ''
              }`}
            >
              <div className='sTitle'>Check out</div>
              <input
                className='placeholder-content'
                type='search'
                placeholder='Add dates'
                value={filterByToEdit.endDate}
              ></input>
            </div>
          )}
          {!scrolled && <div className='sep'></div>}
          <div
            onClick={() => handleWhereClick('capacity')}
            className={`inner-section ${
              activeButton == 'capacity' ? 'active' : ''
            }`}
          >
            <div className='sTitle'>{getWhoTitleTxt()}</div>
            {!scrolled && (
              <input
                className='placeholder-content'
                type='search'
                placeholder='Add guests'
                value={`${capacity} ${capacity > 1 ? 'guests' : 'guest'}`}
              />
            )}
            <div ref={dropdownRef}>
              <CapacityDropdown
              isOpen={openedDropdown === 'capacity'}
              onClose={() => setOpenedDropdown(null)}
              father={'search-bar'}
              adultsFilter={Number(adultsNum ?? 0)}
              childrenFilter={Number(childrenNum ?? 0)}
              infantsFilter={Number(infantsNum ?? 0)}
              petsFilter={Number(petsNum ?? 0)}
              setAdultsNum={setAdultsNum}
              setChildrenNum={setChildrenNum}
              setInfantsNum={setInfantsNum}
              setPetsNum={setPetsNum}
              homeCapacity={undefined}
              petsAllowed={undefined}
            />
            </div>
            <div className='search-btn-section'>
              <button
                className='search-button'
                onMouseDown={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
                onClick={handleSubmit}
              >
                <ReactSVG src='/svgs/search-icon.svg' />
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
