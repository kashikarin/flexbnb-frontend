import { useState, useEffect, useRef } from 'react'
import { WhereDropdown } from './WhereDropdown.jsx'
import { ReactSVG } from 'react-svg'
import { useDispatch, useSelector } from 'react-redux'
import { SET_FILTERBY } from '../store/reducers/home.reducer.js'

export function SearchBar_mobile() {
  const [openedDropdown, setOpenedDropdown] = useState(null)
  const [activeButton, setActiveButton] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const filterBy = useSelector((state) => state.homeModule.filterBy)
  const dispatch = useDispatch()
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  const whereRef = useRef()

  function onUpdateFilterBy(filter) {
    setFilterByToEdit((prev) => ({
      ...prev,
      ...filter,
    }))
  }

  function handleSelectCity(city) {
    onUpdateFilterBy({ city })
    setOpenedDropdown('dates')
    setActiveButton('checkIn')
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    dispatch({ type: SET_FILTERBY, filterBy: filterByToEdit })
    setOpenedDropdown(null)
    setActiveButton(null)
    setIsExpanded(false)
  }

  return (
    <div className="search-bar-mobile">
      {!isExpanded && (
        <div
          className="search-elements"
          onClick={() => setIsExpanded(true)}
        >
          <ReactSVG src="/svgs/search-icon-black.svg" />
          <div className="search-txt">Start your search</div>
        </div>
      )}

      {isExpanded && (
        <div className="search-expanded">
          <div className="search-expanded-header">
            <button
              className="close-btn"
              onClick={() => setIsExpanded(false)}
            >
              ✕
            </button>
          </div>

          <div
            ref={whereRef}
            className={`where-section ${activeButton === 'where' ? 'active' : ''}`}
        
          >
            <div className="sTitle">Where?</div>
            
            <input
              className="where-input"
              type="search"
              placeholder="Search destinations"
              value={filterByToEdit.city}
              onChange={() => {}} // מונע בעיות של input "נעול"
              onFocus={() => {
                console.log('✅ פתחתי where')
                setOpenedDropdown('where')
                setActiveButton('where')
              }}
            />

            <div className="where-dropdown-wrapper">
              <WhereDropdown
                //isOpen={openedDropdown === 'where'}
                isOpen={true} 
                onOpen={() => setOpenedDropdown('where')}
                dropdownRef={whereRef}
                onClose={() => setOpenedDropdown(null)}
                cityFilter={filterByToEdit.city || ''}
                onUpdateFilterBy={onUpdateFilterBy}
                onSelectCity={handleSelectCity}
              />
            </div>
          </div>

          {/* <button className="search-submit-btn" onClick={handleSubmit}>
            <ReactSVG src="/svgs/search-icon-black.svg" />
            <span>Search</span>
          </button> */}
        </div>
      )}
    </div>
  )
}



// import { useState, useEffect, useRef, useContext } from 'react'
// import { WhereDropdown } from './WhereDropdown.jsx'
// import { ReactSVG } from 'react-svg'
// import { useDispatch, useSelector } from 'react-redux'
// import { CapacityDropdown } from './CapacityDropdown.jsx'
// import { SET_FILTERBY } from '../store/reducers/home.reducer.js'
// import { SET_HOMEPAGE_SCROLLED } from '../store/reducers/scroll.reducer.js'
// import { DatesDropdown } from './DatesDropdown.jsx'

// export function SearchBar_mobile() {
//   const [openedDropdown, setOpenedDropdown] = useState(null)
//   const [isMobile, setIsMobile] = useState(false)
//   const [activeButton, setActiveButton] = useState(null)
//   const [searchButtonWide, setSearchButtonWide] = useState(false)
//   const filterBy = useSelector((state) => state.homeModule.filterBy)
//   const dispatch = useDispatch()
//   const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
//   const searchBarRef = useRef(null)
//   const whereRef = useRef()
//   const datesRef = useRef()
//   const capacityRef = useRef()
//   //..for animation active btn
//   const checkInRef = useRef(null)
//   const checkOutRef = useRef(null)

//   const [indicatorStyle, setIndicatorStyle] = useState({})

//   const [adultsNum, setAdultsNum] = useState(filterBy.adults ?? 0)
//   const [childrenNum, setChildrenNum] = useState(filterBy.children ?? 0)
//   const [infantsNum, setInfantsNum] = useState(filterBy.infants ?? 0)
//   const [petsNum, setPetsNum] = useState(filterBy.pets ?? 0)

//   const capacity =
//     Number(adultsNum ?? 0) + Number(childrenNum ?? 0) + Number(infantsNum ?? 0)

//   const [checkIn, setCheckIn] = useState(filterBy.checkIn ?? '')
//   const [checkOut, setCheckOut] = useState(filterBy.checkOut ?? '')

//   const [isExpanded, setIsExpanded] = useState(false)

//   useEffect(() => {
//     setFilterByToEdit((prevFilterByToEdit) => ({
//       ...prevFilterByToEdit,
//       adults: adultsNum,
//       children: childrenNum,
//       infants: infantsNum,
//       pets: petsNum,
//       checkIn,
//       checkOut,
//     }))
//   }, [adultsNum, childrenNum, infantsNum, petsNum, checkIn, checkOut])


// //   useEffect(() => {
// //     function handleClickOutside(ev) {
// //       if (searchBarRef.current && !searchBarRef.current.contains(ev.target)) {
// //         setSearchButtonWide(false)
// //       }
// //     }

// //     document.addEventListener('mousedown', handleClickOutside)
// //     return () => document.removeEventListener('mousedown', handleClickOutside)
// //   }, [])

// useEffect(() => {
//     // if (!activeButton) {
//     //   setIndicatorStyle({ display: 'none' })
//     //   return
//     // }

//     let ref
//     if (activeButton === 'where') ref = whereRef
//     if (activeButton === 'checkIn') ref = checkInRef
//     if (activeButton === 'checkOut') ref = checkOutRef
//     if (activeButton === 'capacity') ref = capacityRef

//     // if (ref?.current) {
//     //   const { offsetLeft, offsetWidth } = ref.current
//     //   setIndicatorStyle({
//     //     left: offsetLeft,
//     //     width: offsetWidth,
//     //   })
//     // }
//   }, [activeButton])


//   function onUpdateFilterBy(filter) {
//     setFilterByToEdit((prevFilterByToEdit) => ({
//       ...prevFilterByToEdit,
//       ...filter,
//     }))
//   }

//   //  function handleSearchClick(btName) {
//   //   // if (shouldCollapse && !isMobile) {
//   //   //   setForceExpand(true)
//   //   // }

//   //   if (btName === 'checkIn' || btName === 'checkOut') {
//   //     setOpenedDropdown('dates')

//   //     if (activeButton === 'where' && btName === 'checkIn') {
//   //       setActiveButton('checkIn')
//   //     } else if (activeButton === 'checkIn' && btName === 'checkOut') {
//   //       setActiveButton('checkOut')
//   //     } else {
//   //       setActiveButton(btName)
//   //     }
//   //   } else {

//   //     setOpenedDropdown(btName)
//   //     setActiveButton(btName)
//   //   }
//   // }

//   function handleSearchClick(btName) {
//     if (btName === 'where')
//     {
//       setOpenedDropdown(btName)
//       setActiveButton(btName)
//     }
//   }

//   function handleSubmit(ev) {
//     ev.preventDefault()
//     ev.stopPropagation()
//     dispatch({ type: SET_FILTERBY, filterBy: filterByToEdit })

//     setOpenedDropdown(null)
//     setActiveButton(null)
//     //setForceExpand(false)

//     //dispatch({ type: SET_HOMEPAGE_SCROLLED, isScrolled: true })

//     // if (scrollContainerRef?.current) {
//     //   scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
//     // }
//   }

//   function getGuestsNumStrToDisplay() {
//     const { adults, children, infants, pets } = filterByToEdit
//     if (!adults && !children && !infants && !pets) return 'Add guests'
//     const guestsNum =
//       Number(adults ?? 0) + Number(children ?? 0) + Number(infants ?? 0)
//     return `${guestsNum} ${guestsNum > 1 ? 'guests' : 'guest'}`
//   }

// //   function getWhoTitleTxt() {
// //     if (scrolled) {
// //       const { adults, children, infants } = filterByToEdit
// //       const guestsNum =
// //         Number(adults ?? 0) + Number(children ?? 0) + Number(infants ?? 0)
// //       //return capacity ? getGuestsNumStrToDisplay() : 'Add guests'
// //       return 'Add guests'
// //     } else {
// //       return 'Who'
// //     }
// //   }

// //   function getWhereTitleText() {
// //     let txt
// //     // console.log(filterByToEdit.city);

// //     if (scrolled) {
// //       //txt = filterByToEdit.city ? `${filterByToEdit.city}` : `Anywhere`
// //       txt = `Anywhere`
// //     } else {
// //       txt = 'Where'
// //       // filterByToEdit.city ? `${filterByToEdit.city}, ${homeService.getCountry(filterByToEdit.city)}` : 'Where'
// //     }
// //     return txt
// //   }

// //   function getCheckinTitleText() {
// //     let txt
// //     if (scrolled) {
// //       txt = 'Anytime'
// //       // if (filterByToEdit.checkIn) {
// //       //   //scroll + there is startdate
// //       //   const checkinDate = new Date(filterByToEdit.checkIn)
// //       //   const checkoutDate = filterByToEdit.checkOut
// //       //     ? new Date(filterByToEdit.checkOut)
// //       //     : new Date(filterByToEdit.checkIn + 86400000)
// //       //   const options = { month: 'short', day: 'numeric' }
// //       //   const shortCheckinDate = new Intl.DateTimeFormat(
// //       //     'en-US',
// //       //     options
// //       //   ).format(checkinDate)
// //       //   const shortCheckoutDate =
// //       //     checkinDate.getMonth() === checkoutDate.getMonth()
// //       //       ? checkoutDate.getDate()
// //       //       : new Intl.DateTimeFormat('en-US', options).format(checkoutDate)
// //       //   txt = shortCheckinDate + ' - ' + shortCheckoutDate
// //       // } else if (filterByToEdit.checkOut) {
// //       //   //scroll + there is not startdate but there is end date
// //       //   const checkoutDate = new Date(filterByToEdit.checkIn)
// //       //   const checkinDate = new Date(filterByToEdit.checkOut - 86400000)
// //       //   const options = { month: 'short', day: 'numeric' }
// //       //   const shortCheckinDate = new Intl.DateTimeFormat(
// //       //     'en-US',
// //       //     options
// //       //   ).format(checkinDate)
// //       //   const shortCheckoutDate =
// //       //     checkinDate.getMonth() === checkoutDate.getMonth()
// //       //       ? checkoutDate.getDate()
// //       //       : new Intl.DateTimeFormat('en-US', options).format(checkoutDate)
// //       //   txt = shortCheckinDate + ' - ' + shortCheckoutDate
// //       // } else txt = 'Anytime' //scroll + no dates
// //     } else txt = 'Check in'
// //     return txt
// //   }

// //   function getCheckoutTitleText() {
// //     let txt
// //     if (!scrolled) {
// //       if (filterByToEdit.checkOut) {
// //         const checkoutDate = new Date(filterByToEdit.checkIn)
// //         const checkinDate = new Date(filterByToEdit.checkOut - 86400000)
// //         const options = { month: 'short', day: 'numeric' }
// //         const shortCheckinDate = new Intl.DateTimeFormat(
// //           'en-US',
// //           options
// //         ).format(checkinDate)
// //         const shortCheckoutDate =
// //           checkinDate.getMonth() === checkoutDate.getMonth()
// //             ? checkoutDate.getDate()
// //             : new Intl.DateTimeFormat('en-US', options).format(checkoutDate)
// //         txt = shortCheckoutDate
// //       }
// //     }
// //   }

//   function handleSelectCity(city) {
//     onUpdateFilterBy({ city })
//     setOpenedDropdown('dates')
//     setActiveButton('checkIn')
//   }

//   function formatDate(date) {
//     return new Intl.DateTimeFormat('en-US', {
//       month: 'short', // Jul, Aug...
//       day: 'numeric', // 29, 30...
//     }).format(new Date(date))
//   }

//    return (
//     <div className="search-bar-mobile" onClick={() => setIsExpanded(true)}>
//       {!isExpanded && (
//         <div
//           className="search-elements"
          
//         >
//           <ReactSVG src="/svgs/search-icon-black.svg" />
//           <div className="search-txt">Start your search</div>
//         </div>
//       )}

//       {isExpanded && (
//         <div className="search-expanded">
//           <button
//             className="close-btn"
//             onClick={() => setIsExpanded(false)}
//           >
//             ✕
//           </button>

//           <div
//             ref={whereRef}
//             onClick={() => setActiveButton('where')}
//             className={`inner-section ${activeButton === 'where' ? 'active' : ''}`}
//           >
//             <div className="sTitle">Where?</div>
//             <input
//               className="placeholder-content"
//               type="search"
//               placeholder="Search destination"
//               value={filterByToEdit.city}
//               readOnly
//             />

//             <div className="where-dropdown-wrapper" ref={whereRef}>
//               <WhereDropdown
//                 isOpen={openedDropdown === 'where'}
//                 onOpen={() => setOpenedDropdown('where')}
//                 dropdownRef={whereRef}
//                 onClose={() => setOpenedDropdown(null)}
//                 cityFilter={filterByToEdit.city || ''}
//                 onUpdateFilterBy={onUpdateFilterBy}
//                 onSelectCity={handleSelectCity}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }