export function DotsIndicator({ slidesNum, currentIdx, maxDots = 5, onDotClick }) {
  let startIdx = Math.max(
    0,
    Math.min(currentIdx - 2, slidesNum - maxDots)
  )

  const dotsToRender = Math.min(slidesNum, maxDots)

  return (
    <div className="dots-indicator">
      {Array.from({ length: dotsToRender }, (_, i) => {
        const slideIdx = startIdx + i
        return (
          <span
            key={slideIdx}
            className={`dot ${slideIdx === currentIdx ? "active" : ""}`}
            onClick={(e) => onDotClick(e, slideIdx)}
          />
        )
      })}
    </div>
  )
}
