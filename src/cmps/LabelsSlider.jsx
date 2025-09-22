import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { setFilterBy } from '../store/actions/home.actions'
import { LabelPreview } from './LabelPreview'
import { useSearchParams } from 'react-router-dom'

const labels = [
  {
    name: 'Windmills',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389305/categories/windmills_w3vhf0.png',
  },
  {
    name: 'Vineyards',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389305/categories/vineyards_sncj7b.png',
  },
  {
    name: 'Trulli',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389304/categories/trulli_zrbree.png',
  },
  {
    name: 'Tropical',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389306/categories/tropical_mm3pay.png',
  },
  {
    name: 'Trending',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389306/categories/trending_biwv7z.png',
  },
  {
    name: 'Treehouses',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389310/categories/treehouses_ibcbkj.png',
  },
  {
    name: 'Top of the world',
    imageUrl:
      'http://res.cloudinary.com/do0a92wpm/image/upload/v1699389310/categories/top-of-the-world_tkz2oj.png',
  },
  {
    name: 'Skiing',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389309/categories/skiing_dzzvek.png',
  },
  {
    name: 'Ryokans',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389309/categories/ryokans_u9ttti.png',
  },
  {
    name: 'Play',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389309/categories/play_ob15se.png',
  },
  {
    name: 'OMG!',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389309/categories/omg_k799gw.png',
  },
  {
    name: 'Off-the-grid',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389309/categories/off-the-grid_sp3rxf.png',
  },
  {
    name: 'National Park',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389308/categories/national-parks_v4840m.png',
  },
  {
    name: 'Manisons',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389308/categories/mansions_djibz4.png',
  },
  {
    name: 'Lakefront',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389308/categories/lakefront_ts7hqm.png',
  },
  {
    name: 'Islands',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389308/categories/islands_ie5rjh.png',
  },
  {
    name: 'Iconic cities',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389298/categories/iconic-cities_ntvyrx.png',
  },
  {
    name: 'Historical homes',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389298/categories/historical-homes_x4xpbj.png',
  },
  {
    name: 'Grand Piano',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389298/categories/grand-piano_qpamz1.png',
  },
  {
    name: 'Golfing',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389298/categories/golfing_nh8qsb.png',
  },
  {
    name: 'Farms',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389298/categories/farms_ks0esw.png',
  },
  {
    name: 'Towers',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389310/categories/towers_zcxnhk.png',
  },
  {
    name: 'Adopted',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389301/categories/adapted_wlqwsm.png',
  },
  {
    name: 'Amazing pools',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389301/categories/amazing-pools_za9hhr.png',
  },
  {
    name: 'Amazing views',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389301/categories/amazing-views_dncatp.png',
  },
  {
    name: 'Arctic',
    imageUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389302/categories/arctics_obddis.png',
  },
]
export function LabelsSlider() {
  const filterBy = useSelector((state) => state.homeModule.filterBy)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const sliderRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams()
  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScrollPosition()
    const slider = sliderRef.current
    if (slider) {
      slider.addEventListener('scroll', checkScrollPosition)
      return () => slider.removeEventListener('scroll', checkScrollPosition)
    }
  }, [])

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 600
      const targetScroll =
        direction === 'left'
          ? sliderRef.current.scrollLeft - scrollAmount
          : sliderRef.current.scrollLeft + scrollAmount

      sliderRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      })
    }
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
    sliderRef.current.style.cursor = 'grabbing'
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 2
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 2
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab'
    }
  }

  function handleLabelClick(labelName) {
    // let updatedFilter = structuredClone(filterBy)
    // setFilterBy({ ...filterBy, labels: [labelName] })
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('labels', labelName)
    setSearchParams(newSearchParams)
  }

  return (
    <section className={`labels-slider-container full`}>
      <div className="separator"></div>
      <div className="labels-slider-grid-area">
        <div className="labels-slider-wrapper">
          <div
            ref={sliderRef}
            className="labels-slider-track"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleDragEnd}
          >
            {labels.map((label, idx) => (
              <div className="labels-slider-item" key={idx}>
                <LabelPreview
                  label={label}
                  handleLabelClick={handleLabelClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="labels-slider-buttons-container">
        <div
          className={`labels-slider-btn-left ${canScrollLeft ? 'visible' : ''}`}
        >
          <button
            onClick={() => scrollSlider('left')}
            className={`labels-slider-btn left ${
              canScrollLeft ? 'visible' : ''
            }`}
            aria-label="Scroll left"
          >
            <img
              src="https://res.cloudinary.com/do0a92wpm/image/upload/v1699218785/left-arrow_ap8jfr.svg"
              alt="Previous"
            />
          </button>
        </div>
        <div className="labels-slider-btn-right">
          <button
            onClick={() => scrollSlider('right')}
            className={`labels-slider-btn right ${
              canScrollRight ? 'visible' : ''
            }`}
            aria-label="Scroll right"
          >
            <img
              src="https://res.cloudinary.com/do0a92wpm/image/upload/v1699218790/right-arrow_pxdlnj.svg"
              alt="Next"
            />
          </button>
        </div>
      </div>
      {/* <div
        className='labels-slider-filter-container'
        style={{ position: 'relative' }}
      >

      </div> */}
    </section>
  )
}
