import { userService } from '../services/user'
import { HomePreview } from './HomePreview'

export function HomeList({ homes, likedHomes, onAddLike, onRemoveLike }) {
  return (
    <ul className='home-list-container cards-container-narrow grid-layout'>
      {!homes? (
        <h1>Loading...</h1>
      ) : (
        homes.map((home) => (
          <li key={home._id}>
            <HomePreview home={home} isHomeLiked={likedHomes?.includes(home._id)} onAddLike={onAddLike} onRemoveLike={onRemoveLike}/>
          </li>
        ))
      )}
    </ul>
  )
}
