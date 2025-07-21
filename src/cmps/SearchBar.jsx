import { useState, useEffect } from 'react'
import { WhereDropdown } from './WhereDropdown'
import { ReactSVG } from 'react-svg'

export function SearchBar({ isScrolled }) {
  const [openedDropdown, setOpenedDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(isScrolled)
  const [isMobile, setIsMobile] = useState(false)

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
      if (openedDropdown && !event.target.closest('.search-bar-container')) {
        setOpenedDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openedDropdown])

  function handleWhereClick() {
    // Don't expand SearchBar on mobile
    if (scrolled && !isMobile) setScrolled(false)
    setOpenedDropdown(openedDropdown === 'where' ? null : 'where')
  }

  return (
    <div className={`search-bar-container ${scrolled ? 'scrolled' : ''}`}>
      <div>
        <div onClick={handleWhereClick} className='inner-section'>
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
        </div>
      </div>
    </div>
  )
}
