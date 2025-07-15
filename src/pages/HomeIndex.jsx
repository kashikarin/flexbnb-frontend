import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'

import {
  loadHomes,
  addHome,
  updateHome,
  removeHome,
  addHomeMsg,
} from '../store/home.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { homeService } from '../services/home/'
import { userService } from '../services/user'

import { HomeList } from '../cmps/HomeList'
import { HomeFilter } from '../cmps/HomeFilter'
import { Slider } from '../cmps/Slider.jsx'
import { MultiCarousel } from '../cmps/MultiCarousel.jsx'
import Carousel from 'react-multi-carousel'

export function HomeIndex() {
  const [filterBy, setFilterBy] = useState(homeService.getDefaultFilter())
  const homes = useSelector((storeState) => storeState.homeModule.homes)

  useEffect(() => {
    loadHomes(filterBy)
  }, [filterBy])

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }))
  }

  async function onRemoveHome(homeId) {
    try {
      await removeHome(homeId)
      showSuccessMsg('Home removed')
    } catch (err) {
      showErrorMsg('Cannot remove home')
    }
  }

  async function onAddHome() {
    const home = homeService.getEmptyHome()
    home.vendor = prompt('Vendor?')
    try {
      const savedHome = await addHome(home)
      showSuccessMsg(`Home added (id: ${savedHome._id})`)
    } catch (err) {
      showErrorMsg('Cannot add home')
    }
  }

  async function onUpdateHome(home) {
    const speed = +prompt('New speed?', home.speed)
    if (!speed) return
    const homeToSave = { ...home, speed }
    try {
      const savedHome = await updateHome(homeToSave)
      showSuccessMsg(`Home updated, new speed: ${savedHome.speed}`)
    } catch (err) {
      showErrorMsg('Cannot update home')
    }
  }

  return (
    <main className='home-index'>
      <Slider />
      {/* <MultiCarousel /> */}
      {/*<header>
         <h2>Homes</h2>
        {userService.getLoggedinUser() && (
          <button onClick={onAddHome}>Add a Home</button>
        )}
      </header> */}
      <HomeFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      {/* <HomeList
        homes={homes}
        onRemoveHome={onRemoveHome}
        onUpdateHome={onUpdateHome}
      /> */}
    </main>
  )
}
