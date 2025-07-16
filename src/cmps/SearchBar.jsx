export function SearchBar({ isScrolled }) {
  return (
    <search className=''>
      <div className={`search-bar-container ${isScrolled ? 'scrolled' : ''}`}>
        <div>
          <div className='inner-section'>
            <div className='sTitle'>{isScrolled ? 'Anywhere' : 'Where'}</div>
            {!isScrolled && <input className='placeholder-content' type='search' placeholder='Search destination'></input>}
            </div>
            <div className="sep"></div>
            <div className='inner-section'>
            <div className='sTitle'>{isScrolled ? 'Anytime' : 'Check in'}</div>
            {!isScrolled && <input className='placeholder-content' type='search' placeholder='Add dates'></input>}
            </div>
            <div className="sep"></div>
            {!isScrolled && <div className='inner-section'>
            <div className='sTitle'>Check out</div>
            <input className='placeholder-content' type='search' placeholder='Add dates'></input>
            </div>}
            {!isScrolled && <div className="sep"></div>}
            <div className='inner-section'>
            <div className='sTitle'>{isScrolled ? 'Add guests' : 'Who'}</div>
            {!isScrolled && <input className='placeholder-content' type='search' placeholder='Add guests'></input>}
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
