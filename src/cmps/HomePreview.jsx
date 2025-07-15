import { Link } from 'react-router-dom'
import { homeService } from '../services/home'
import { capitalizeStr, utilService } from '../services/util.service'

export function HomePreview({ home }) {
  
  function getStayDatesStr(){
    const today = new Date()
    const nextMonth = new Date(today.getFullYear(),today.getMonth() + 1 )
    const shortStrThisMonth = today.toLocaleString('en-US', { month: 'short' })
    const shortStrNextMonth = nextMonth.toLocaleString('en-US', { month: 'short' })
    return today.getDate() > 26 ? 
      `${shortStrNextMonth} 1-4` 
        : 
      `${shortStrThisMonth} ${today.getDate() + 1}-${today.getDate() + 4}`
  }
  return (
    <article className='home-preview-container'>
      <img src={home.imageUrls[0]} alt={`${capitalizeStr(home.name)} image`} />
      <div className="home-preview-info-container">
        <div>{`${capitalizeStr(home.type)} in ${capitalizeStr(home.loc.city)}`}</div>
        <div>{getStayDatesStr()}</div>
        <div>{`${home.price}$ for 3 nights`} · ★ 4.5</div>
      </div>
    </article>
  )
}
