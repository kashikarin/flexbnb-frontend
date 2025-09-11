import { useState, useEffect, useRef, useContext } from 'react'
import { WhereDropdown } from './WhereDropdown'
import { ReactSVG } from 'react-svg'
import { useDispatch, useSelector } from 'react-redux'
import { CapacityDropdown } from './CapacityDropdown.jsx'
import { SET_FILTERBY } from '../store/reducers/home.reducer.js'
import { DatesDropdown } from './DatesDropdown.jsx'

export function SearchBar({ shouldCollapse, forceExpand, setForceExpand, scrollContainerRef }) {
  const [openedDropdown, setOpenedDropdown] = useState(null)
  //const [forceExpand, setForceExpand] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeButton, setActiveButton] = useState(null)
  const [searchButtonWide, setSearchButtonWide] = useState(false)
  const filterBy = useSelector((state) => state.homeModule.filterBy)
  const dispatch = useDispatch()
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const searchBarRef = useRef(null)
  const whereRef = useRef()
  const datesRef = useRef()
  const capacityRef = useRef()
  //..for animation active btn
  const checkInRef = useRef(null)
  const checkOutRef = useRef(null)

  const [indicatorStyle, setIndicatorStyle] = useState({})

  const [adultsNum, setAdultsNum] = useState(filterBy.adults ?? 0)
  const [childrenNum, setChildrenNum] = useState(filterBy.children ?? 0)
  const [infantsNum, setInfantsNum] = useState(filterBy.infants ?? 0)
  const [petsNum, setPetsNum] = useState(filterBy.pets ?? 0)

  const capacity =
    Number(adultsNum ?? 0) + Number(childrenNum ?? 0) + Number(infantsNum ?? 0)

  const [checkIn, setCheckIn] = useState(filterBy.checkIn ?? '')
  const [checkOut, setCheckOut] = useState(filterBy.checkOut ?? '')

  useEffect(() => {
    setFilterByToEdit((prevFilterByToEdit) => ({
      ...prevFilterByToEdit,
      adults: adultsNum,
      children: childrenNum,
      infants: infantsNum,
      pets: petsNum,
      checkIn,
      checkOut,
    }))
  }, [adultsNum, childrenNum, infantsNum, petsNum, checkIn, checkOut])

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
    if (!shouldCollapse) setForceExpand(false)
  }, [shouldCollapse])

  useEffect(() => {
    if (!openedDropdown) setForceExpand(false)
  }, [openedDropdown])

  useEffect(() => {
    function handleClickOutside(ev) {
      if (searchBarRef.current && !searchBarRef.current.contains(ev.target)) {
        setSearchButtonWide(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event) {
      if (
        openedDropdown &&
        ((openedDropdown === 'where' &&
          whereRef.current &&
          !whereRef.current.contains(event.target)) ||
          (openedDropdown === 'dates' &&
            datesRef.current &&
            !datesRef.current.contains(event.target)) ||
          (openedDropdown === 'capacity' &&
            capacityRef.current &&
            !capacityRef.current.contains(event.target)))
      ) {
        // {setOpenedDropdown(null)}
        setOpenedDropdown(null)
        setForceExpand(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openedDropdown])

  const scrolled = shouldCollapse && !forceExpand
  
  // useEffect(() => {
  //   let ref
  //   if (activeButton === 'where') ref = whereRef
  //   if (activeButton === 'checkIn') ref = checkInRef
  //   if (activeButton === 'checkOut') ref = checkOutRef
  //   if (activeButton === 'capacity') ref = capacityRef

  //   if (ref?.current) {
  //     const { offsetLeft, offsetWidth } = ref.current
  //     setIndicatorStyle({
  //       left: offsetLeft,
  //       width: offsetWidth,
  //     })
  //   }
  // }, [activeButton])

  useEffect(() => {
    let ref
    if (activeButton === 'where') ref = whereRef
    if (activeButton === 'checkIn') ref = checkInRef
    if (activeButton === 'checkOut') ref = checkOutRef
    if (activeButton === 'capacity') ref = capacityRef

    if (ref?.current) {
      const { offsetLeft, offsetWidth } = ref.current
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      })
    }
  }, [activeButton, scrolled, forceExpand])

  

  function onUpdateFilterBy(filter) {
    setFilterByToEdit((prevFilterByToEdit) => ({
      ...prevFilterByToEdit,
      ...filter,
    }))
  }

  

  useEffect(() => {
    if (scrolled) {
      setOpenedDropdown(null)
      setActiveButton(null)
    }
  }, [scrolled])

  function handleWhereClick(btName) {
    // Don't expand SearchBar on mobile
    // if (scrolled && !isMobile) setScrolled(false)
    if (shouldCollapse && !isMobile) 
    {
      setForceExpand(true)
    }
    //if (scrolled && !isMobile) setForceExpand(true)

    if (btName === 'checkIn' || btName === 'checkOut') {
      setOpenedDropdown('dates')

      if (activeButton === 'where' && btName === 'checkIn') {
        setActiveButton('checkIn')
      } else if (activeButton === 'checkIn' && btName === 'checkOut') {
        setActiveButton('checkOut')
      } else {
        setActiveButton(btName)
        setIndicatorStyle((prev) => ({ ...prev }))
      }
    } else {
      setOpenedDropdown(btName)
      setActiveButton(btName)
    }
  }

  // function onInputChange(ev) {
  //   const val = ev.target.value;
  //   debouncedSetTxt(val);
  // }

  function handleSubmit(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    dispatch({ type: SET_FILTERBY, filterBy: filterByToEdit })
  }

  function getGuestsNumStrToDisplay() {
    const { adults, children, infants, pets } = filterByToEdit
    if (!adults && !children && !infants && !pets) return 'Add guests'
    const guestsNum =
      Number(adults ?? 0) + Number(children ?? 0) + Number(infants ?? 0)
    return `${guestsNum} ${guestsNum > 1 ? 'guests' : 'guest'}`
  }

  function getWhoTitleTxt() {
    if (scrolled) {
      const { adults, children, infants } = filterByToEdit
      const guestsNum =
        Number(adults ?? 0) + Number(children ?? 0) + Number(infants ?? 0)
      return capacity ? getGuestsNumStrToDisplay() : 'Add guests'
    } else {
      return 'Who'
    }
  }

  function getWhereTitleText() {
    let txt
    // console.log(filterByToEdit.city);

    if (scrolled) {
      txt = filterByToEdit.city ? `${filterByToEdit.city}` : `Anywhere`
    } else {
      txt = 'Where'
      // filterByToEdit.city ? `${filterByToEdit.city}, ${homeService.getCountry(filterByToEdit.city)}` : 'Where'
    }
    return txt
  }

  function getCheckinTitleText() {
    let txt
    if (scrolled) {
      if (filterByToEdit.checkIn) {
        //scroll + there is startdate
        const checkinDate = new Date(filterByToEdit.checkIn)
        const checkoutDate = filterByToEdit.checkOut
          ? new Date(filterByToEdit.checkOut)
          : new Date(filterByToEdit.checkIn + 86400000)
        const options = { month: 'short', day: 'numeric' }
        const shortCheckinDate = new Intl.DateTimeFormat(
          'en-US',
          options
        ).format(checkinDate)
        const shortCheckoutDate =
          checkinDate.getMonth() === checkoutDate.getMonth()
            ? checkoutDate.getDate()
            : new Intl.DateTimeFormat('en-US', options).format(checkoutDate)
        txt = shortCheckinDate + ' - ' + shortCheckoutDate
      } else if (filterByToEdit.checkOut) {
        //scroll + there is not startdate but there is end date
        const checkoutDate = new Date(filterByToEdit.checkIn)
        const checkinDate = new Date(filterByToEdit.checkOut - 86400000)
        const options = { month: 'short', day: 'numeric' }
        const shortCheckinDate = new Intl.DateTimeFormat(
          'en-US',
          options
        ).format(checkinDate)
        const shortCheckoutDate =
          checkinDate.getMonth() === checkoutDate.getMonth()
            ? checkoutDate.getDate()
            : new Intl.DateTimeFormat('en-US', options).format(checkoutDate)
        txt = shortCheckinDate + ' - ' + shortCheckoutDate
      } else txt = 'Anytime' //scroll + no dates
    } else txt = 'Check in'
    return txt
  }

  function getCheckoutTitleText() {
    let txt
    if (!scrolled) {
      if (filterByToEdit.checkOut) {
        const checkoutDate = new Date(filterByToEdit.checkIn)
        const checkinDate = new Date(filterByToEdit.checkOut - 86400000)
        const options = { month: 'short', day: 'numeric' }
        const shortCheckinDate = new Intl.DateTimeFormat(
          'en-US',
          options
        ).format(checkinDate)
        const shortCheckoutDate =
          checkinDate.getMonth() === checkoutDate.getMonth()
            ? checkoutDate.getDate()
            : new Intl.DateTimeFormat('en-US', options).format(checkoutDate)
        txt = shortCheckoutDate
      }
    }
  }

  function handleSelectCity(city) {
    onUpdateFilterBy({ city })
    setOpenedDropdown('dates')
    setActiveButton('checkIn')
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', // Jul, Aug...
      day: 'numeric', // 29, 30...
    }).format(new Date(date))
  }
  // console.log('city filter:', filterByToEdit.city)
  return (
    <search>
      <div
        className={`search-bar-container ${scrolled ? 'scrolled' : ''} 
        ${activeButton ? 'has-active' : ''} ${forceExpand ? 'expanded' : ''}` }
        onClick={() => {
          setSearchButtonWide(true)
          scrolled && !isMobile && setForceExpand(true)
          if (scrollContainerRef?.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' }) // גלילה לראש
          }
          setTimeout(() => {
            setForceExpand(true)
          }, 50)
        }}
        
        ref={searchBarRef}
      >
        <div>
          <div
            ref={whereRef}
            onClick={() => handleWhereClick('where')}
            className={`inner-section ${
              activeButton == 'where' ? 'active' : ''
            }`}
          >
            <div className="sTitle">{getWhereTitleText()}</div>
            {!scrolled && (
              <input
                className={`placeholder-content ${scrolled ? 'scrolled' : ''}`}
                type="search"
                placeholder="Search destination"
                value={filterByToEdit.city}
                readOnly
              />
            )}

            <div className="where-dropdown-wrapper" ref={whereRef}>
              <WhereDropdown
                isOpen={openedDropdown === 'where'}
                onOpen={() => setOpenedDropdown('where')}
                dropdownRef={whereRef}
                onClose={() => setOpenedDropdown(null)}
                cityFilter={filterByToEdit.city || ''}
                onUpdateFilterBy={onUpdateFilterBy}
                onSelectCity={handleSelectCity}
              />
            </div>
          </div>

          <div
            ref={checkInRef}
            onClick={() => handleWhereClick('checkIn')}
            className={`inner-section ${
              activeButton == 'checkIn' ? 'active' : ''
            }`}
          >
            <div className="sTitle">{getCheckinTitleText()}</div>
            {!scrolled && (
              <input
                className="placeholder-content"
                type="search"
                placeholder="Add dates"
                readOnly
                value={
                  filterByToEdit.checkIn
                    ? `${formatDate(filterByToEdit.checkIn)}`
                    : ''
                }
              />
            )}
          </div>

          {!scrolled && (
            <div
              ref={checkOutRef}
              onClick={() => handleWhereClick('checkOut')}
              className={`inner-section ${
                activeButton == 'checkOut' ? 'active' : ''
              }`}
            >
              <div className="sTitle">Check out</div>
              <input
                className="placeholder-content"
                type="search"
                placeholder="Add dates"
                readOnly
                value={
                  filterByToEdit.checkOut
                    ? `${formatDate(filterByToEdit.checkOut)}`
                    : ''
                }
              />
            </div>
          )}

          <div className="dates-dropdown-wrapper" ref={datesRef}>
            <DatesDropdown
              isOpen={openedDropdown === 'dates'}
              onOpen={() => setOpenedDropdown('dates')}
              onClose={() => setOpenedDropdown(null)}
              dropdownRef={datesRef}
              checkIn={checkIn}
              checkOut={checkOut}
              onSetDates={({ checkIn, checkOut }) => {
                setCheckIn(checkIn)
                setCheckOut(checkOut)

                if (checkIn && !checkOut) {
                  setActiveButton('checkOut')
                }
                // Close dropdown after selecting both dates
                // if (checkIn && checkOut) {
                // setOpenedDropdown(null);
                // setActiveButton(null);
                // }
              }}
            />
          </div>

          <div
            ref={capacityRef}
            onClick={() => handleWhereClick('capacity')}
            className={`inner-section capacity ${
              activeButton == 'capacity' ? 'active' : ''
            }`}
          >
            <div className="sTitle">{getWhoTitleTxt()}</div>
            {!scrolled && (
              <input
                className="placeholder-content"
                type="search"
                placeholder="Add guests"
                readOnly
                value={
                  capacity > 0
                    ? `${capacity} ${capacity > 1 ? 'guests' : 'guest'}`
                    : ''
                }
              />
            )}

            <div className="capacity-dropdown-wrapper" ref={capacityRef}>
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

            <button
              className={`search-button ${
                searchButtonWide ? 'search-button-wide' : ''
              }`}
              onMouseDown={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
              onClick={handleSubmit}
            >
              <div className="search-elements">
                <div>
                  <ReactSVG src="/svgs/search-icon.svg" />
                </div>
                <div className="search-txt">Search</div>
              </div>
            </button>
          </div>
          {/* active btn effect */}
          <div className="active-indicator" style={indicatorStyle}></div>
        </div>
      </div>
    </search>
  )
}
