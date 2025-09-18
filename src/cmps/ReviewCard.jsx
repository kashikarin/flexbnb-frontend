import { FaStar } from 'react-icons/fa'

export function ReviewCard({ reviews }) {
  if (!reviews || !reviews.length) return null

  const getRelativeDate = () => '1 week ago'

  return (
    <div className="review-card-list">
      {reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="review-user">
            <img
              className="review-user-img"
              src={
                review.by?.imageUrl?.startsWith('/')
                  ? review.by?.imageUrl
                  : '/svgs/user-icon.svg'
              }
              alt={review.by.fullname}
            />
            <div className="review-user-details">
              <div className="review-user-name">
                {review.by.fullname || 'Mark'}
              </div>
              <div className="review-user-loc">Jerusalem, Israel</div>
            </div>
          </div>
          <div className="review-meta">
            <span className="review-stars">
              {Array.from({ length: review.rate || 5 }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </span>
            <span className="review-date">{getRelativeDate()} </span>
            <span className="review-stay">· Stayed a few nights</span>
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
