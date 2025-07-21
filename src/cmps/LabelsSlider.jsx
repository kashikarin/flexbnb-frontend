import React, { useEffect, useState, useRef } from 'react'
import { LabelPreview } from './LabelPreview'
import { FilterDropdown } from './FilterDropdown'
import { setFilterBy } from '../store/home.actions'
import { useSelector } from 'react-redux'
import { useFilterSearchParams } from '../customHooks/useFilterSearchParams.js'

// import {ReactComponent as RightArrowIcon} from '../assets/svgs/arrow-right.svg?react'

const labels = [
  {
    name: 'Windmills',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389305/categories/windmills_w3vhf0.png',
  },
  {
    name: 'Vineyards',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389305/categories/vineyards_sncj7b.png',
  },
  {
    name: 'Trulli',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389304/categories/trulli_zrbree.png',
  },
  {
    name: 'Tropical',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389306/categories/tropical_mm3pay.png',
  },
  {
    name: 'Trending',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389306/categories/trending_biwv7z.png',
  },
  {
    name: 'Treehouses',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389310/categories/treehouses_ibcbkj.png',
  },
  {
    name: 'Top of the world',
    imgUrl:
      'http://res.cloudinary.com/do0a92wpm/image/upload/v1699389310/categories/top-of-the-world_tkz2oj.png',
  },
  {
    name: 'Skiing',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389309/categories/skiing_dzzvek.png',
  },
  {
    name: 'Ryokans',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389309/categories/ryokans_u9ttti.png',
  },
  {
    name: 'Play',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389309/categories/play_ob15se.png',
  },
  {
    name: 'OMG!',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389309/categories/omg_k799gw.png',
  },
  {
    name: 'Off-the-grid',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389309/categories/off-the-grid_sp3rxf.png',
  },
  {
    name: 'National Park',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389308/categories/national-parks_v4840m.png',
  },
  {
    name: 'Manisons',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389308/categories/mansions_djibz4.png',
  },
  {
    name: 'Lakefront',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389308/categories/lakefront_ts7hqm.png',
  },
  {
    name: 'Islands',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389308/categories/islands_ie5rjh.png',
  },
  {
    name: 'Iconic cities',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389298/categories/iconic-cities_ntvyrx.png',
  },
  {
    name: 'Historical homes',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389298/categories/historical-homes_x4xpbj.png',
  },
  {
    name: 'Grand Piano',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389298/categories/grand-piano_qpamz1.png',
  },
  {
    name: 'Golfing',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389298/categories/golfing_nh8qsb.png',
  },
  {
    name: 'Farms',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389298/categories/farms_ks0esw.png',
  },
  {
    name: 'Towers',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389310/categories/towers_zcxnhk.png',
  },
  {
    name: 'Adopted',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389301/categories/adapted_wlqwsm.png',
  },
  {
    name: 'Amazing pools',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389301/categories/amazing-pools_za9hhr.png',
  },
  {
    name: 'Amazing views',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389301/categories/amazing-views_dncatp.png',
  },
  {
    name: 'Arctic',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389302/categories/arctics_obddis.png',
  },
]
export function LabelsSlider() {
  const filterBy = useSelector((state) => state.homeModule.filterBy)

  const getShowCountByScreen = () => {
    const width = window.innerWidth
    if (width < 480) return 3
    if (width < 640) return 4
    if (width < 768) return 5
    if (width < 1024) return 7
    if (width < 1280) return 13
    return 13
  }

  const stepSize = 4
  const [itemWidth, setItemWidth] = useState(96)
  const [firstIdx, setFirstIdx] = useState(0)
  const [showCount, setShowCount] = useState(getShowCountByScreen())
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const itemRef = useRef(null)

  useEffect(() => {
    const handleResize = () => setShowCount(getShowCountByScreen())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (itemRef.current) {
      const width = itemRef.current.getBoundingClientRect().width
      setItemWidth(width + 16)
    }
  }, [showCount])

  const lastIdx = Math.min(firstIdx + showCount - 1, labels.length - 1)

  function onPrevClick() {
    if (firstIdx === 0) return
    setFirstIdx((prev) => Math.max(0, prev - stepSize))
  }
  function onNextClick() {
    if (firstIdx + showCount >= labels.length) return
    setFirstIdx((prev) => Math.min(prev + stepSize, labels.length - showCount))
  }

  function handleLabelClick(labelName) {
    let updatedFilter = structuredClone(filterBy)
    setFilterBy({ ...filterBy, labels: [labelName] })
  }

  console.log(filterBy)
  return (
    <section className='labels-slider-container full'>
      <div className='labels-slider-grid-area'>
        <div className='labels-slider-wrapper'>
          <div
            className='labels-slider-track'
            style={{
              '--translate-x-labels': `${-firstIdx * (itemWidth || 96)}px`,
            }}
          >
            {labels.map((label, idx) => (
              <div
                className='labels-slider-item'
                ref={firstIdx === 0 && idx === 0 ? itemRef : null}
                key={idx}
              >
                <LabelPreview
                  label={label}
                  handleLabelClick={handleLabelClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='labels-slider-buttons-container'>
        <div className='labels-slider-btn-left'>
          {firstIdx > 0 && (
            <button onClick={onPrevClick} className='labels-slider-btn left'>
              <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218785/left-arrow_ap8jfr.svg' />
            </button>
          )}
        </div>
        <div className='labels-slider-btn-right'>
          {lastIdx < labels.length - 1 && (
            <button onClick={onNextClick} className='labels-slider-btn right'>
              <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218790/right-arrow_pxdlnj.svg' />
            </button>
          )}
        </div>
      </div>
      <div
        className='labels-slider-filter-container'
        style={{ position: 'relative' }}
      >
        {/* <button
          className='labels-slider-filter-btn'
          onClick={() => setIsFilterOpen(true)}
        >
          <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699388798/filterSvg_pvzh1i.svg' />
          <span>Filters</span>
        </button>

        <FilterDropdown
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        /> */}
      </div>
    </section>
  )
}
