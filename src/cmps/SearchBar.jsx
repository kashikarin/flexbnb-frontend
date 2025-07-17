import { useState } from 'react'
import { WhereDropdown } from './WhereDropdown'
import { useState, useEffect } from 'react'
import { WhereDropdown } from "./WhereDropdown";

export function SearchBar({ isScrolled }) {
  const [openedDropdown, setOpenedDropdown] = useState(null)

  console.log(openedDropdown)
  const [scrolled, setScrolled] = useState(isScrolled)

  useEffect(() => {
    setScrolled(isScrolled)
  }, [isScrolled])

  useEffect(() => {
    if (scrolled) setOpenedDropdown(null)
  }, [scrolled])

  function handleWhereClick() {
    if (scrolled) setScrolled(false)
    setOpenedDropdown('where')
  }

  return (
    <search className=''>
      <div className={`search-bar-container ${scrolled ? 'scrolled' : ''}`}>
        <div>
          <div className='inner-section'>
            <div className='sTitle'>{isScrolled ? 'Anywhere' : 'Where'}</div>
            {!isScrolled && (
              <input
                className='placeholder-content'
                type='search'
                placeholder='Search destination'
              ></input>
            )}
          <div onClick={handleWhereClick} className='inner-section'>
            <div className='sTitle' >{scrolled ? 'Anywhere' : 'Where'}</div>
            {!scrolled && <input className='placeholder-content' type='search' placeholder='Search destination'></input>}
            <WhereDropdown
              isOpen={openedDropdown === 'where'}
              onOpen={() => setOpenedDropdown('where')}
              onClose={() => setOpenedDropdown(null)}
            />
          </div>
          <div className='sep'></div>
          <div className='inner-section'>
            <div className='sTitle'>{isScrolled ? 'Anytime' : 'Check in'}</div>
            {!isScrolled && (
              <input
                className='placeholder-content'
                type='search'
                placeholder='Add dates'
              ></input>
            )}
            <div className='sTitle'>{scrolled ? 'Anytime' : 'Check in'}</div>
            {!scrolled && <input className='placeholder-content' type='search' placeholder='Add dates'></input>}
          </div>
          <div className='sep'></div>
          {!isScrolled && (
            <div className='inner-section'>
              <div className='sTitle'>Check out</div>
              <input
                className='placeholder-content'
                type='search'
                placeholder='Add dates'
              ></input>
            </div>
          )}
          {!isScrolled && <div className='sep'></div>}
          <div className="sep"></div>
          {!scrolled && <div className='inner-section'>
            <div className='sTitle'>Check out</div>
            <input className='placeholder-content' type='search' placeholder='Add dates'></input>
          </div>}
          {!scrolled && <div className="sep"></div>}
          <div className='inner-section'>
            <div className='sTitle'>{isScrolled ? 'Add guests' : 'Who'}</div>
            {!isScrolled && (
              <input
                className='placeholder-content'
                type='search'
                placeholder='Add guests'
              ></input>
            )}
            {!scrolled && <input className='placeholder-content' type='search' placeholder='Add guests'></input>}
            <div className='search-btn-section'>
              <button className='search-button'>
                <div className='search-icon'></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </search>
  )
}
