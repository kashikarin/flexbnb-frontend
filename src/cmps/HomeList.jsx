import { userService } from '../services/user'
import { HomePreview } from './HomePreview'

export function HomeList({ homes }) {
  

  return (
    <ul className='home-list-container'>
      {!Array.isArray(homes) || homes.length === 0? <h1>Loading...</h1> :
        homes.map((home) => (
          <li key={home._id}>
                <HomePreview home={home} />
          </li>
      ))}
    </ul>
  )
}
