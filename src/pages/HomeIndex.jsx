import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import {
  addUserLike,
  loadHomes,
  removeUserLike
} from '../store/actions/home.actions'
import { HomeList } from '../cmps/HomeList'
import { useFilterSearchParams } from '../customHooks/useFilterSearchParams.js'
import { useEffectUpdate } from '../customHooks/useEffectUpdate.js'
import { addLike, removeLike } from '../store/actions/user.actions.js'

export function HomeIndex() {
  const filterBy = useSelector((state) => state.homeModule.filterBy)
  const homes = useSelector((state) => state.homeModule.homes)
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
  const setExistSearchParams = useFilterSearchParams()

  const [showLoader, setShowLoader] = useState(true)
  const loadStartRef = useRef(Date.now())

  useEffectUpdate(() => {
    loadHomes(filterBy)
    setExistSearchParams(filterBy)
  }, [filterBy])

  useEffect(() => {
    if (!Array.isArray(homes)) return
    const MIN_LOADER_MS = 500
    const elapsed = Date.now() - loadStartRef.current
    const wait = Math.max(0, MIN_LOADER_MS - elapsed)
    const t = setTimeout(() => setShowLoader(false), wait)
    return () => clearTimeout(t)
  }, [homes])

  async function onAddLike(homeId) {
    try {
      await addLike(homeId, loggedInUser._id)
      await addUserLike(homeId)
    } catch (err) {
      console.error('Failed to add like', err)
    }
  }

  async function onRemoveLike(homeId) {
    try {
      await removeLike(homeId, loggedInUser._id)
      await removeUserLike(homeId)
    } catch (err) {
      console.error('Failed to remove like', err)
    }
  }

  // const noResultsResponse = (
  //   <div className="no-matches-response-container">
  //     <h1>No exact matches</h1>
  //     <p>
  //       Try changing or removing some of your filters or adjusting your search
  //       area.
  //     </p>
  //   </div>
  // )
  return (
    <section className="home-index-container">
      {!Array.isArray(homes) || showLoader ? (
        <div className="loader-container">
          <span className="loading"></span>
        </div>
      ) : (
        <HomeList
          homes={homes}
          likedHomes={loggedInUser?.likedHomes}
          onAddLike={onAddLike}
          onRemoveLike={onRemoveLike}
        />
      )}
    </section>
  )
}
