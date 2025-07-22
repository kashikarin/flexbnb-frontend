import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { addUserLike, loadHomes, removeUserLike, setFilterBy } from '../store/home.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { homeService } from '../services/home/'
import { HomeList } from '../cmps/HomeList'
import { HomeFilter } from '../cmps/HomeFilter'
import { LabelsSlider } from '../cmps/LabelsSlider.jsx'
import { useFilterSearchParams } from '../customHooks/useFilterSearchParams.js'
import { useEffectUpdate } from '../customHooks/useEffectUpdate.js'
import { addLike, removeLike } from '../store/user.actions.js'

export function HomeIndex() {
  const filterBy = useSelector((state) => state.homeModule.filterBy)
  const homes = useSelector((state) => state.homeModule.homes)
  const loggedInUser = useSelector(state => state.userModule.loggedInUser)
  console.log("🚀 ~ HomeIndex ~ loggedInUser:", loggedInUser)
  const setExistSearchParams = useFilterSearchParams()

  useEffectUpdate(() => {
    loadHomes(filterBy)
    setExistSearchParams(filterBy)
  }, [filterBy])

  async function onAddLike(homeId){
    try {
        await addLike(homeId, loggedInUser._id)
        await addUserLike(homeId)
    } catch(err){
        console.error('Failed to add like', err)
    }  
  }

  async function onRemoveLike(homeId){
    try {
      await removeLike(homeId, loggedInUser._id)
      await removeUserLike(homeId)
    } catch(err){
        console.error('Failed to remove like', err)
    }
  }

  // function onSetFilterBy(filterBy) {
  //   setFilterBy(filterBy)
  // }

  // async function onRemoveHome(homeId) {
  //   try {
  //     await removeHome(homeId)
  //     showSuccessMsg('Home removed')
  //   } catch (err) {
  //     showErrorMsg('Cannot remove home')
  //   }
  // }

  // async function onAddHome() {
  //   const home = homeService.getEmptyHome()
  //   home.vendor = prompt('Vendor?')
  //   try {
  //     const savedHome = await addHome(home)
  //     showSuccessMsg(`Home added (id: ${savedHome._id})`)
  //   } catch (err) {
  //     showErrorMsg('Cannot add home')
  //   }
  // }

  // async function onUpdateHome(home) {
  //   const speed = +prompt('New speed?', home.speed)
  //   if (!speed) return
  //   const homeToSave = { ...home, speed }
  //   try {
  //     const savedHome = await updateHome(homeToSave)
  //     showSuccessMsg(`Home updated, new speed: ${savedHome.speed}`)
  //   } catch (err) {
  //     showErrorMsg('Cannot update home')
  //   }
  // }
  const noResultsResponse = <div className="no-matches-response-container">
                                <h1>No exact matches</h1>
                                <p>Try changing or removing some of your filters or adjusting your search area.</p>
                            </div>
  return (
    <section className='home-index-container'>
      {/* <LabelsSlider /> */}
      {/* <MultiCarousel /> */}
      {/*<header>
         <h2>Homes</h2>
        {userService.getLoggedinUser() && (
          <button onClick={onAddHome}>Add a Home</button>
        )}
      </header> */}
      {/* <HomeFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} /> */}
      {/* <HomeList
        homes={homes}
        onRemoveHome={onRemoveHome}
        onUpdateHome={onUpdateHome}
      /> */}
      {(!Array.isArray(homes) || !loggedInUser) ? 
          <h1>Loading...</h1> :
          <HomeList homes={homes} likedHomes={loggedInUser?.likedHomes} onAddLike={onAddLike} onRemoveLike={onRemoveLike}/>}
    </section>
  )
}
