import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadHomes, setFilterBy } from '../store/home.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { homeService } from '../services/home/'
import { HomeList } from '../cmps/HomeList'
import { HomeFilter } from '../cmps/HomeFilter'
import { LabelsSlider } from '../cmps/LabelsSlider.jsx'
import { useFilterSearchParams } from '../customHooks/useFilterSearchParams.js'
import { useEffectUpdate } from '../customHooks/useEffectUpdate.js'

export function HomeIndex() {
  const filterBy = useSelector((state) => state.homeModule.filterBy)
  const homes = useSelector((state) => state.homeModule.homes)
  const users = useSelector(state => state.userModule.users)
  console.log("🚀 ~ HomeIndex ~ users:", users)
  const setExistSearchParams = useFilterSearchParams()
  
  useEffectUpdate(() => {
    loadHomes(filterBy)
    setExistSearchParams(filterBy)
  }, [filterBy])

  function onToggleLike(){

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
      <HomeList homes={homes} />
    </section>
  )
}
