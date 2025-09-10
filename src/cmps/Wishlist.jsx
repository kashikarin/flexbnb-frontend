import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HomeList } from '../cmps/HomeList'
import { homeService } from '../services/home'
import { addLike, removeLike } from '../store/actions/user.actions'

export function Wishlist() {
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
  const [likedHomes, setLikedHomes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadLikedHomes()
  }, [loggedInUser?.likedHomes])

  async function loadLikedHomes() {
    if (!loggedInUser?.likedHomes?.length) {
      setLikedHomes([])
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)

      const homesPromises = loggedInUser.likedHomes.map((homeId) =>
        homeService.getById(homeId)
      )
      const homes = await Promise.all(homesPromises)
      setLikedHomes(homes.filter((home) => home))
    } catch (err) {
      console.error('Failed to load liked homes:', err)
      setLikedHomes([])
    } finally {
      setIsLoading(false)
    }
  }

  async function onAddLike(homeId) {
    try {
      await addLike(homeId, loggedInUser._id)
    } catch (err) {
      console.error('Failed to add like', err)
    }
  }

  async function onRemoveLike(homeId) {
    try {
      await removeLike(homeId, loggedInUser._id)
      // הסר מהרשימה המקומית
      setLikedHomes((prev) => prev.filter((home) => home._id !== homeId))
    } catch (err) {
      console.error('Failed to remove like', err)
    }
  }

  if (!loggedInUser) {
    return (
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1>Your Wishlist</h1>
          <p>Please log in to see your saved homes</p>
        </div>
      </div>
    )
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p>{likedHomes.length} saved homes</p>
      </div>

      {isLoading ? (
        <div className="loader-container">
          <span className="loading"></span>
        </div>
      ) : likedHomes.length === 0 ? (
        <div className="empty-wishlist">
          <h2>Your wishlist is empty</h2>
          <p>Start exploring and save your favorite homes</p>
        </div>
      ) : (
        <HomeList
          homes={likedHomes}
          likedHomes={loggedInUser?.likedHomes}
          onAddLike={onAddLike}
          onRemoveLike={onRemoveLike}
        />
      )}
    </div>
  )
}
