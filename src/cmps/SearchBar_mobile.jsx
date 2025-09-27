import { useState, useEffect, useRef } from 'react'
import { WhereDropdown } from './WhereDropdown.jsx'
import { DatesDropdownMobile } from './DatesDropdownMobile.jsx'
import { CapacityDropdown } from './CapacityDropdown.jsx'
import { ReactSVG } from 'react-svg'
import { useDispatch, useSelector } from 'react-redux'
import { SET_FILTERBY } from '../store/reducers/home.reducer.js'

export function SearchBar_mobile({ setIsSearchExpanded }) {
  //const [openedDropdown, setOpenedDropdown] = useState(null)
  const [activeButton, setActiveButton] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)

  

  const filterBy = useSelector((state) => state.homeModule.filterBy)
  const dispatch = useDispatch()
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  const [adultsNum, setAdultsNum] = useState(filterBy.adults ?? 0)
  const [childrenNum, setChildrenNum] = useState(filterBy.children ?? 0)
  const [infantsNum, setInfantsNum] = useState(filterBy.infants ?? 0)
  const [petsNum, setPetsNum] = useState(filterBy.pets ?? 0)

  //const capacity = (adultsNum ?? 0) + (childrenNum ?? 0) + (infantsNum ?? 0)

  const whereRef = useRef()
  const datesRef = useRef()
  const capacityRef = useRef()

  function onUpdateFilterBy(filter) {
    setFilterByToEdit((prev) => ({
      ...prev,
      ...filter,
    }))
  }
  
  useEffect(() => {
    onUpdateFilterBy({
      adults: adultsNum,
      children: childrenNum,
      infants: infantsNum,
      pets: petsNum,
    })
  }, [adultsNum, childrenNum, infantsNum, petsNum])

  function handleSelectCity(city) {
    onUpdateFilterBy({ city })
    //setOpenedDropdown('dates')
    setActiveButton('dates')
  }

  function handleSetDates({ checkIn, checkOut }) {
    onUpdateFilterBy({ checkIn, checkOut })
    //setOpenedDropdown(null)
    //setActiveButton(null)
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    dispatch({ type: SET_FILTERBY, filterBy: filterByToEdit })
    setActiveButton(null)
    setIsExpanded(false)
    setIsSearchExpanded(false)
  }

  function handleNextBtn(){
    // if (activeButton === 'dates') {
    //   setActiveButton('who')
    // }
    setActiveButton('who')

  }

  function getGuestsNumStr() {
    const { adults = 0, children = 0, infants = 0, pets = 0 } = filterByToEdit
    const guests = adults + children + infants
    if (guests === 0 && pets === 0) return 'Add guests'
    return `${guests}${guests > 1 ? ' guests' : ' guest'}${pets > 0 ? `, ${pets} pets` : ''}`
  }

  function formatDate(date) {
    if (!date) return ''
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(new Date(date))
  }

  function getEmptyFilter() {
    return {
      city: '',
      checkIn: null,
      checkOut: null,
      adults: 0,
      children: 0,
      infants: 0,
      pets: 0,
    }
  }

  function handleCloseClearBtn(sAction){
      if (sAction === "close"){
        setIsExpanded(false)
        setActiveButton(null)
        setIsSearchExpanded(false)
      }
      else{
        setIsExpanded(true)
        setActiveButton('where')
        setIsSearchExpanded(true)
      }
      
      setAdultsNum(0)
      setChildrenNum(0)
      setInfantsNum(0)
      setPetsNum(0)

      setFilterByToEdit(getEmptyFilter())
  }

  console.log("who: ", getGuestsNumStr())

  return (
    <div className="search-bar-mobile">
      {!isExpanded && (
        <div
          className="search-elements"
          onClick={() =>{ 
            setIsExpanded(true)
            //setOpenedDropdown('where') 
            setIsSearchExpanded(true)
            setActiveButton('where')}

          }
        >
          <ReactSVG src="/svgs/search-icon-black.svg" />
          <div className="search-txt_mobile">Start your search</div>
        </div>
      )}

      {isExpanded && (
        <div className="search-expanded">
          <div className="search-expanded-header">
            <button
              className="close-btn_mobile"
              onClick={() => handleCloseClearBtn("close")}
            >
              ✕
            </button>
          </div>

          <div
            ref={whereRef}
            className={`where-section ${activeButton === 'where' ? 'active' : filterByToEdit.city ? 'closed' : ''}`}
            onClick={() => setActiveButton('where')}
          >
            <div className="sTitle">Where?</div>
            
             {activeButton === 'where' ? (
                <>
                  <input
                    className="where-input where-input_mobile"
                    type="search"
                    placeholder="Search destinations"
                    value={filterByToEdit.city || ''}
                    onChange={() => {}}
                  />
                  <div className="where-dropdown-wrapper_mobile">
                    <WhereDropdown
                      isOpen={activeButton === 'where'}
                      dropdownRef={whereRef}
                      onClose={() => setActiveButton(null)}
                      cityFilter={filterByToEdit.city || ''}
                      onUpdateFilterBy={onUpdateFilterBy}
                      onSelectCity={handleSelectCity}
                    />
                  </div>
                </>
              ) : filterByToEdit.city ? (
                <div className="summary">
                  {filterByToEdit.city ? filterByToEdit.city : "I'm flexible"}
                </div>
              ) : null}
   
          </div>
          <div
            ref={datesRef}
            className={`dates-section ${activeButton === 'dates' ? 'active' : 'closed'}`}
            onClick={() => setActiveButton('dates')}
          >
            <div className="sTitle">When?</div>
            {activeButton === 'dates' ? (
              <DatesDropdownMobile
                isOpen={activeButton === 'dates'}
                onSetDates={handleSetDates}
              />
            ) : (
              <div className="summary">
                {filterByToEdit.checkIn ? formatDate(filterByToEdit.checkIn) + "-" + formatDate(filterByToEdit.checkOut) : "Add dates"}
              </div>
            )}
          </div>
         
        {(activeButton === 'who' || activeButton !== 'dates') && (
            <div
              className={`who-section ${activeButton === 'who' ? 'active' : 'closed'}`}
              onClick={() => setActiveButton('who')}
              ref={capacityRef}
            >
              <div className="sTitle">Who?</div>

              {activeButton === 'who' ? (
                <div className="capacity-dropdown-wrapper_mobile">
                  <CapacityDropdown
                    isOpen={activeButton === 'who'}
                    onClose={() => setActiveButton(null)}
                    dropdownRef={capacityRef}
                    adultsFilter={Number(adultsNum ?? 0)}
                    childrenFilter={Number(childrenNum ?? 0)}
                    infantsFilter={Number(infantsNum ?? 0)}
                    petsFilter={Number(petsNum ?? 0)}
                    setAdultsNum={setAdultsNum}
                    setChildrenNum={setChildrenNum}
                    setInfantsNum={setInfantsNum}
                    setPetsNum={setPetsNum}
                  />
                </div>
              ) : (
                <div className="summary">
                   {getGuestsNumStr()}
                </div>
              )}
            </div>
          )}

          <div className='btnsRow'>
              <button className='clearBtn' onClick={() => handleCloseClearBtn("clear")}>
                  <span>Clear all</span>
              </button>

              {activeButton === 'dates' && (
                <button className="next-btn" onClick={handleNextBtn}>
                  <span>Next</span>
                </button>
              )}

              {((activeButton === 'where' || activeButton === "who") && (activeButton !== "dates")) && (
                <button className="search-submit-btn" onClick={handleSubmit}>
                  <ReactSVG src="/svgs/search-icon-black.svg" />
                  <span>Search</span>
                </button>
              )}
          </div>
        </div>
      )}
    </div>
  )
}
