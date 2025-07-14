import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadHome, addHomeMsg } from '../store/home.actions'

export function HomeDetails() {
  const { homeId } = useParams()
  const home = useSelector((storeState) => storeState.homeModule.home)

  useEffect(() => {
    loadHome(homeId)
    console.log('homeId:', homeId)
  }, [homeId])

  async function onAddHomeMsg(homeId) {
    try {
      await addHomeMsg(homeId, 'bla bla ' + parseInt(Math.random() * 10))
      showSuccessMsg(`Home msg added`)
    } catch (err) {
      showErrorMsg('Cannot add home msg')
    }
  }

  return (
    <section className='home-details'>
      <Link to='/home'>Back to list</Link>
      <h1>Home Details</h1>
      {home && (
        <div>
          <h3>{home.vendor}</h3>
          <h4>${home.price}</h4>
          <pre> {JSON.stringify(home, null, 2)} </pre>
        </div>
      )}
      <button
        onClick={() => {
          onAddHomeMsg(home._id)
        }}
      >
        Add home msg
      </button>
    </section>
  )
}
