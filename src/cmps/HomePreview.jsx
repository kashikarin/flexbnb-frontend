import { FaHeart, FaRegHeart } from 'react-icons/fa'

import { Link } from 'react-router-dom'
import { homeService } from '../services/home'
import {
  capitalizeStr,
  getAvgRating,
  utilService,
} from '../services/util.service'
import { useRef, useState, useEffect } from 'react'

export function HomePreview({ home }) {
  const [firstIdx, setFirstIdx] = useState(0)
  const [imgWidth, setImgWidth] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const imgRef = useRef(null)
  const containerRef = useRef(null)

  function onPrevClick(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    if (firstIdx === 0) return
    setFirstIdx((prev) => Math.max(0, prev - 1))
  }

  function onNextClick(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    if (firstIdx + 1 >= home.imageUrls.length) return
    setFirstIdx((prev) => Math.min(prev + 1, home.imageUrls.length - 1))
  }

  const getWidthByScreen = () => {
    if (imgRef.current) {
      return imgRef.current.getBoundingClientRect().width
    }
    if (containerRef.current) {
      return containerRef.current.getBoundingClientRect().width
    }
    return window.innerWidth
  }

  useEffect(() => {
    const updateImageWidth = () => {
      const width = getWidthByScreen()
      setImgWidth(width)
    }

    // Initial calculation
    updateImageWidth()

    const handleResize = () => {
      updateImageWidth()
    }

    let resizeObserver
    if (containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateImageWidth()
      })
      resizeObserver.observe(containerRef.current)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [imgRef.current, containerRef.current])

  useEffect(() => {
    const updateImageWidth = () => {
      const width = getWidthByScreen()
      setImgWidth(width)
    }

    const timeoutId = setTimeout(updateImageWidth, 100)
    return () => clearTimeout(timeoutId)
  }, [home.imageUrls])

  function getStayDatesStr() {
    const today = new Date()
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1)
    const shortStrThisMonth = today.toLocaleString('en-US', { month: 'short' })
    const shortStrNextMonth = nextMonth.toLocaleString('en-US', {
      month: 'short',
    })
    return today.getDate() > 26
      ? `${shortStrNextMonth} 1&thinsp;-&thinsp;4`
      : `${shortStrThisMonth} ${today.getDate() + 1}-${today.getDate() + 4}`
  }

  function handleLike(e) {
    e.preventDefault()
    e.stopPropagation()
    console.log('handleLike called')

    setIsLiked((prev) => !prev)
  }

  return (
    <Link className='home-preview-link' to={`/home/${home._id}`}>
      <article className='home-preview-container'>
        <div className='heart-icon-container' onClick={handleLike}>
          <FaHeart className={`heart filled ${isLiked ? 'liked' : ''}`} />
          <FaRegHeart className='heart outline' />
        </div>
        {/* <button className='home-like-btn'>Like</button> */}
        <div className='home-preview-image-slider-container' ref={containerRef}>
          <div className='home-preview-image-slider-wrapper'>
            <div
              className='home-preview-image-slider-track'
              style={{ '--translate-x-images': `${-firstIdx * imgWidth}px` }}
            >
              {home.imageUrls.map((imageUrl, idx) => (
                <div
                  key={idx}
                  className='images-slider-item'
                  ref={idx === 0 ? imgRef : null}
                >
                  <img src={imageUrl} alt={`${home.name} preview image`} />
                </div>
              ))}
            </div>
          </div>
          <div className='images-slider-buttons-container'>
            <div className='images-slider-btn-left'>
              {firstIdx > 0 && (
                <button
                  onClick={(ev) => onPrevClick(ev)}
                  className='images-slider-btn left'
                >
                  <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218785/left-arrow_ap8jfr.svg' />
                </button>
              )}
            </div>
            <div className='images-slider-btn-right'>
              {firstIdx < home.imageUrls.length - 1 && (
                <button
                  onClick={(ev) => onNextClick(ev)}
                  className='images-slider-btn right'
                >
                  <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218790/right-arrow_pxdlnj.svg' />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className='home-preview-info-container'>
          <p>
            {home.loc?.city
              ? `${capitalizeStr(home.type)} in ${capitalizeStr(home.loc.city)}`
              : capitalizeStr(home.type)}
          </p>

          <p>{getStayDatesStr()}</p>
          <p>
            {`${home.price}$`}
            {` for 3 nights`} · ★ <span>{getAvgRating(home)}</span>
          </p>
        </div>
      </article>
    </Link>
  )
}
