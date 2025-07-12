import { userService } from '../services/user'
import { homePreview } from './HomePreview'

export function HomeList({ homes, onRemoveHome, onUpdatehome }) {
  function shouldShowActionBtns(home) {
    const user = userService.getLoggedinUser()

    if (!user) return false
    if (user.isAdmin) return true
    return home.owner?._id === user._id
  }

  return (
    <section>
      <ul className='list'>
        {homes.map((home) => (
          <li key={home._id}>
            <homePreview home={home} />
            {shouldShowActionBtns(home) && (
              <div className='actions'>
                <button onClick={() => onUpdatehome(home)}>Edit</button>
                <button onClick={() => onRemoveHome(home._id)}>x</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
