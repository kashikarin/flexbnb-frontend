import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HomeList } from '../cmps/HomeList'
import { homeService } from '../services/home'

const MyTravels = () => {
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
  console.log('loggedInUser', loggedInUser)

  return <>hi</>
}

export default MyTravels
