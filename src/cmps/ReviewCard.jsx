import { FaStar } from 'react-icons/fa'
import { getRandomIntInclusive } from '../services/util.service'

export function ReviewCard({ reviews }) {
  
  const gRelativeDates = ['1 week ago', 'few days ago', 'today', 'few weeks ago', 'few months ago', 'more than a year ago']
  const gReviewStay = ['Stayed one night', 'Stayed about a week', 'Stayed a few nights']
  
  if (!reviews || !reviews.length) return null

  function getRelativeDate(){
    return gRelativeDates[getRandomIntInclusive(0, gRelativeDates.length - 1)]
  }

  function getReviewStay(){
    return gReviewStay[getRandomIntInclusive(0, gReviewStay.length - 1)]
  }

  function getRandomSeniorityStr(){
    const seniority = getRandomIntInclusive(0, 12)
    let str
    seniority < 2 ? str = 'Tel Aviv, Israel' : str = `${seniority} years on Flexbnb`
    return str
  }

  return (
    <div className="review-card-list">
      {reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="review-user">
            <img
              className="review-user-img"
              src={
                review.by?.imageUrl
                  ? review.by?.imageUrl
                  : '/svgs/user-icon.svg'
              }
              alt={review.by.fullname}
            />
            <div className="review-user-details">
              <div className="review-user-name">
                {review.by.fullname || 'Mark'}
              </div>
              <div className="review-user-seniority">{getRandomSeniorityStr()}</div>
            </div>
          </div>
          <div className="review-meta">
            <span className="review-stars">
              {Array.from({ length: review.rate || 5 }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </span>
            <span className="review-date">{getRelativeDate()} </span>
            <span className="review-stay">· {getReviewStay()}</span>
          </div>
          <div className="review-txt">
            {review.txt ||
              'I have stayed here many times and am never disappointed. The high standards of this home are always maintained by Aviad. The cool decor and beautiful greenery really add an extra layer to the stay.'}
          </div>
        </div>
      ))}
    </div>
  )
}
