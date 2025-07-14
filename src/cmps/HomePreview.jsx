import { Link } from 'react-router-dom'

export function HomePreview({ home }) {
  return (
    <article className='preview'>
      <header>
        <Link to={`/home/${home._id}`}>{home.vendor}</Link>
      </header>

      <p>
        Speed: <span>{home.speed?.toLocaleString()} Km/h</span>
      </p>
      {home.owner && (
        <p>
          Owner:{' '}
          <Link to={`/user/${home.owner._id}`}>{home.owner.fullname}</Link>
        </p>
      )}
    </article>
  )
}
