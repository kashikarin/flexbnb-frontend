import { useState, useEffect, useRef } from 'react'
import { WhereDropdown } from './WhereDropdown'
import { ReactSVG } from 'react-svg'
import { useDispatch } from 'react-redux'
import { debounce} from '../services/util.service.js'

export function SearchBar({ isScrolled }) {
  const [openedDropdown, setOpenedDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(isScrolled)
  const [isMobile, setIsMobile] = useState(false)
  const [activeButton, setActiveButton] = useState(null)
  const wrapperRef = useRef()

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
      if (openedDropdown && !event.target.closest('.search-bar-container')) {
        setOpenedDropdown(null)
        //setActiveButton(null)
      }
    }
    //
    // function handleClickOutside(ev) {
    //     if (wrapperRef.current && !wrapperRef.current.contains(ev.target)) {
    //       setActiveButton(null)
    //     }
    //   }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openedDropdown])

  function handleWhereClick(btName) {
    // Don't expand SearchBar on mobile
    if (scrolled && !isMobile) setScrolled(false)

    //setOpenedDropdown(openedDropdown === 'where' ? null : 'where')
    setOpenedDropdown(btName)
    if (activeButton === btName) return
    setActiveButton(btName)
  }

   const dispatch = useDispatch()

    const debouncedSetTxt = useRef(
        debounce((val) => dispatch(setSearchTxt(val)), 300)
      ).current

    function onInputChange(ev) {
        const val = ev.target.value
        debouncedSetTxt(val)
      }

  return (
    <search className=''>
      {/* <div className={`search-bar-container ${scrolled ? 'scrolled' : ''}`}> */}
       <div className={`search-bar-container ${scrolled ? 'scrolled' : ''} ${activeButton ? 'has-active' : ''}`}>
          <div>
            <div onClick={()=>handleWhereClick('where')} className={`inner-section ${activeButton == 'where' ? 'active' : ''}`}>
            <div className='sTitle' >{scrolled ? 'Anywhere' : 'Where'}</div>
            {!scrolled && <input className='placeholder-content' onChange={onInputChange} type='search' placeholder='Search destination'></input>}
            <WhereDropdown
              isOpen={openedDropdown === 'where'}
              onOpen={() => setOpenedDropdown('where')}
              onClose={() => setOpenedDropdown(null)}
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
          <div onClick={()=>handleWhereClick('Who')} className={`inner-section ${activeButton == 'Who' ? 'active' : ''}`}>
            <div className='sTitle'>{scrolled ? 'Add guests' : 'Who'}</div>
            {!scrolled && <input className='placeholder-content' type='search' placeholder='Add guests'></input>}
            <div className='search-btn-section'>
                <button className='search-button'>
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
