import React, { useEffect, useState } from 'react'
import { LabelPreview } from './LabelPreview'

const labels = [
  {
    label: 'Windmills',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389305/categories/windmills_w3vhf0.png',
  },
  {
    label: 'Vineyards',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389305/categories/vineyards_sncj7b.png',
  },
  {
    label: 'Trulli',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389304/categories/trulli_zrbree.png',
  },
  {
    label: 'Tropical',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389306/categories/tropical_mm3pay.png',
  },
  {
    label: 'Trending',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389306/categories/trending_biwv7z.png',
  },
  {
    label: 'Treehouses',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389310/categories/treehouses_ibcbkj.png',
  },
  {
    label: 'Top of the world',
    imgUrl:
      'http://res.cloudinary.com/do0a92wpm/image/upload/v1699389310/categories/top-of-the-world_tkz2oj.png',
  },
  {
    label: 'Skiing',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389309/categories/skiing_dzzvek.png',
  },
  {
    label: 'Ryokans',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389309/categories/ryokans_u9ttti.png',
  },
  {
    label: 'Play',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389309/categories/play_ob15se.png',
  },
  {
    label: 'OMG!',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389309/categories/omg_k799gw.png',
  },
  {
    label: 'Off-the-grid',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389309/categories/off-the-grid_sp3rxf.png',
  },
  {
    label: 'National Park',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389308/categories/national-parks_v4840m.png',
  },
  {
    label: 'Manisons',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389308/categories/mansions_djibz4.png',
  },
  {
    label: 'Lakefront',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389308/categories/lakefront_ts7hqm.png',
  },
  {
    label: 'Islands',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389308/categories/islands_ie5rjh.png',
  },
  {
    label: 'Iconic cities',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389298/categories/iconic-cities_ntvyrx.png',
  },
  {
    label: 'Historical homes',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389298/categories/historical-homes_x4xpbj.png',
  },
  {
    label: 'Grand Piano',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389298/categories/grand-piano_qpamz1.png',
  },
  {
    label: 'Golfing',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389298/categories/golfing_nh8qsb.png',
  },
  {
    label: 'Farms',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389298/categories/farms_ks0esw.png',
  },
  {
    label: 'Towers',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389310/categories/towers_zcxnhk.png',
  },
  {
    label: 'Adopted',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389301/categories/adapted_wlqwsm.png',
  },
  {
    label: 'Amazing pools',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389301/categories/amazing-pools_za9hhr.png',
  },
  {
    label: 'Amazing views',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389301/categories/amazing-views_dncatp.png',
  },
  {
    label: 'Arctic',
    imgUrl:
      'https://res.cloudinary.com/do0a92wpm/image/upload/v1699389302/categories/arctics_obddis.png',
  },
]
export function Slider() {
  const getShowCountByScreen = () => {
    const width = window.innerWidth
    if (width < 480) return 3
    if (width < 640) return 4
    if (width < 768) return 5
    if (width < 1024) return 7
    if (width < 1280) return 9
    return 14
  }
  const stepSize = 2
  const [firstIdx, setFirstIdx] = useState(0)
  const [showCount, setShowCount] = useState(getShowCountByScreen())
  useEffect(() => {
    const handleResize = () => setShowCount(getShowCountByScreen())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const lastIdx = Math.min(firstIdx + showCount - 1, labels.length - 1)
  const labelsToShow = labels.slice(firstIdx, lastIdx + 1)

  function onPrevClick() {
    if (firstIdx === 0) return
    setFirstIdx((prev) => Math.max(0, prev - stepSize))
  }
  function onNextClick() {
    if (firstIdx + showCount >= labels.length) return
    setFirstIdx((prev) => Math.min(prev + stepSize, labels.length - showCount))
  }

  return (
    <section className='labels-container'>
      {labelsToShow.map((label, idx) => (
        <LabelPreview key={idx} label={label} />
      ))}
      <div className='label-buttons'>
        {firstIdx > 0 && (
          <button onClick={onPrevClick} className='label-btn left'>
            ←
          </button>
        )}
        {lastIdx < labels.length - 1 && (
          <button onClick={onNextClick} className='label-btn right'>
            →
          </button>
        )}
      </div>
    </section>
  )
}
