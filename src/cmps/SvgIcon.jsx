import { ReactSVG } from 'react-svg'

export function SvgIcon({ src, className = '' }) {
  return (
    <ReactSVG
      src={src}
      wrapper="div"
      className={`svg-icon ${className}`}
      beforeInjection={(svg) => {
        svg.removeAttribute('width')
        svg.removeAttribute('height')

        svg.style.removeProperty('width')
        svg.style.removeProperty('height')

        // svg.querySelectorAll('[style]').forEach((el) => {
        //     el.removeAttribute('style')
        // })

        svg.removeAttribute('style')
        svg.querySelectorAll('[style]').forEach((el) => el.removeAttribute('style'))

        const bbox = svg.getBBox()
        const { x, y, width, height } = bbox

        svg.setAttribute('viewBox', `${x} ${y} ${width} ${height}`)
        // svg.querySelectorAll('[style]').forEach((el) => el.removeAttribute('style'))
        // svg.querySelectorAll('[fill]').forEach((el) => el.removeAttribute('fill'))
      }}
    />
  )
}