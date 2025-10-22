import { useState, useEffect, useRef, useContext } from 'react'
import { WhereDropdown } from './WhereDropdown'
import { ReactSVG } from 'react-svg'
import { useDispatch, useSelector } from 'react-redux'
import { CapacityDropdown } from './CapacityDropdown.jsx'
import { SET_FILTERBY } from '../store/reducers/home.reducer.js'
import { SET_HOMEPAGE_SCROLLED } from '../store/reducers/scroll.reducer.js'
import { DatesDropdown } from './DatesDropdown.jsx'
import { setHomePageNotScrolled } from '../store/actions/scroll.actions'

export function SearchBar({
  shouldCollapse,
  forceExpand,
  setForceExpand,
  scrollContainerRef,
  setShouldCollapse,
}) {
  const [openedDropdown, setOpenedDropdown] = useState(null)
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
        setOpenedDropdown(null)
        setForceExpand(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openedDropdown])

  const scrolled = shouldCollapse

  const isExpanded = forceExpand

  useEffect(() => {
    if (!activeButton) {
      setIndicatorStyle({ display: 'none' })
      return
    }

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
    if (scrolled && !forceExpand) {
      setOpenedDropdown(null)
      setActiveButton(null)
    }
  }, [scrolled, forceExpand])

  function handleSearchClick(btName) {
    if (shouldCollapse && !isMobile) {
      dispatch({ type: SET_HOMEPAGE_SCROLLED, isScrolled: false })

      window.scrollTo({ top: 0, behavior: 'smooth' })

      setForceExpand(true)
      const bar = searchBarRef.current
      if (bar) {
        const onTransitionEnd = (ev) => {
          if (['grid-row', 'width', 'transform'].includes(ev.propertyName)) {
            setOpenedDropdown(
              btName === 'checkIn' || btName === 'checkOut' ? 'dates' : btName
            )
            setActiveButton(btName)
            bar.removeEventListener('transitionend', onTransitionEnd)
          }
        }
        bar.addEventListener('transitionend', onTransitionEnd)
      }
    } else {
      setOpenedDropdown(
        btName === 'checkIn' || btName === 'checkOut' ? 'dates' : btName
      )
      setActiveButton(btName)
    }
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    dispatch({ type: SET_FILTERBY, filterBy: filterByToEdit })

    setOpenedDropdown(null)
    setActiveButton(null)
    setForceExpand(false)

    dispatch({ type: SET_HOMEPAGE_SCROLLED, isScrolled: true })

    if (scrollContainerRef?.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
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
      return 'Add guests'
    } else {
      return 'Who'
    }
  }

  function getWhereTitleText() {
    let txt

    if (scrolled) {
      txt = `Anywhere`
    } else {
      txt = 'Where'
    }
    return txt
  }

  function getCheckinTitleText() {
    let txt
    if (scrolled) {
      txt = 'Anytime'
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
      month: 'short', 
      day: 'numeric', 
    }).format(new Date(date))
  }
  console.log('searchButtonWide: ', searchButtonWide)
  return (
    <search>
      <div
        className={`search-bar-container 
          ${scrolled ? 'scrolled' : ''} 
          ${isExpanded ? 'expanded' : ''} 
          ${activeButton ? 'has-active' : ''}`}
        ref={searchBarRef}
        onClick={() => {
          if (scrolled && !isMobile) {
            dispatch({ type: SET_HOMEPAGE_SCROLLED, isScrolled: false })
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setForceExpand(true)

            setActiveButton(null)
            setOpenedDropdown(null)
          }
          setSearchButtonWide(true)
        }}
      >
        <div>
          <div
            ref={whereRef}
            onClick={() => handleSearchClick('where')}
            className={`inner-section ${
              activeButton == 'where' ? 'active' : ''
            }`}
          >
            <div className="sTitle">
              {}
              {scrolled && (
                <img
                  src="/img/house-icon.png"
                  className="house-title-scrolled"
                />
              )}
              {getWhereTitleText()}
            </div>
            {!scrolled && (
              <input
                className={`placeholder-content ${scrolled ? 'scrolled' : ''}`}
                type="search"
                placeholder="Search destination"
                value={filterByToEdit.city}
                // readOnly
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
            onClick={() => handleSearchClick('checkIn')}
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
              onClick={() => handleSearchClick('checkOut')}
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
              }}
            />
          </div>

          <div
            ref={capacityRef}
            onClick={() => handleSearchClick('capacity')}
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
                onChange={() => {}}
              />
            )}

            <div className="capacity-dropdown-wrapper" ref={capacityRef}>
              <CapacityDropdown
                isOpen={openedDropdown === 'capacity'}
                onClose={() => setOpenedDropdown(null)}
                father={'search-bar'}
                dropdownRef={capacityRef}
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
                  <ReactSVG src="/svgs/search-icon-white.svg" />
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
