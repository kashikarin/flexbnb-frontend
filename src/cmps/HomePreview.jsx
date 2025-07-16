import { Link } from 'react-router-dom'
import { homeService } from '../services/home'
import { capitalizeStr, utilService } from '../services/util.service'
import { useRef, useState, useEffect } from 'react'

export function HomePreview({ home }) {
  const [firstIdx, setFirstIdx] = useState(0)
  const [imgWidth, setImgWidth] = useState(220)
  const [screenWidth, setScreenWidth] = useState(null)
  const imgRef = useRef(null)
  const lastIdx = Math.min(firstIdx, home.imageUrls.length - 1)

  function onPrevClick() {
    if (firstIdx === 0) return
    setFirstIdx((prev) => Math.max(0, prev - 1))
  }

  function onNextClick() {
    if (firstIdx + 1 >= home.imageUrls.length) return
    setFirstIdx((prev) => Math.min(prev + 1, home.imageUrls.length - 1))
  }

  const getWidthByScreen = () => {
    return window.innerWidth
  }

  useEffect(() => {
      const handleResize = () => setScreenWidth(getWidthByScreen())
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])
  
    useEffect(() => {
    if (imgRef.current) {
      const width = imgRef.current.getBoundingClientRect().width
      setImgWidth(width) 
    }
  }, [screenWidth])

  function getStayDatesStr(){
    const today = new Date()
    const nextMonth = new Date(today.getFullYear(),today.getMonth() + 1 )
    const shortStrThisMonth = today.toLocaleString('en-US', { month: 'short' })
    const shortStrNextMonth = nextMonth.toLocaleString('en-US', { month: 'short' })
    return today.getDate() > 26 ? 
      `${shortStrNextMonth} 1&thinsp;-&thinsp;4` 
        : 
      `${shortStrThisMonth} ${today.getDate() + 1}-${today.getDate() + 4}`
  }
  console.log(imgWidth)
  return (
      <a className='home-preview-link' href={`/home/${home._id}`}>
        <article className='home-preview-container'>
          {/* <button className='home-like-btn'>Like</button> */}
          <div className="home-preview-image-slider-container">
              <div className='home-preview-image-slider-wrapper'>
                <div className="home-preview-image-slider-track" style={{ '--translate-x-images': `${-firstIdx * (imgWidth)}px`}}>
                  {home.imageUrls.map((imageUrl, idx) => (
                    <div className="images-slider-item" ref={firstIdx === 0 && idx === 0 ? imgRef : null}>
                      <img src={imageUrl} alt={`${home.name} preview image`} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="images-slider-buttons-container">
                <div className="images-slider-btn-left">
                  {firstIdx > 0 && (
                    <button onClick={onPrevClick} className='images-slider-btn left'>
                        <img src="https://res.cloudinary.com/do0a92wpm/image/upload/v1699218785/left-arrow_ap8jfr.svg" />
                    </button>
                  )}
                </div>
                <div className="images-slider-btn-right">
                  {lastIdx < home.imageUrls.length - 1 && (
                    <button onClick={onNextClick} className='images-slider-btn right'>
                        <img src="https://res.cloudinary.com/do0a92wpm/image/upload/v1699218790/right-arrow_pxdlnj.svg" />
                    </button>
                  )}
                </div>
              </div>
          </div>
        <div className="home-preview-info-container">
          <div>{`${capitalizeStr(home.type)} in ${capitalizeStr(home.loc.city)}`}</div>
          <div>{getStayDatesStr()}</div>
          <div>{`${home.price}$ for 3 nights`} · ★ 4.5</div>
        </div>
      </article>
    </a>
    
  )
}
