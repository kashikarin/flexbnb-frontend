import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { loadUser } from '../store/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import {
  socketService,
  SOCKET_EVENT_USER_UPDATED,
  SOCKET_EMIT_USER_WATCH,
} from '../services/socket.service'
import { loadOrder, loadOrders } from '../store/order.actions'

export function UserDetails() {
  const params = useParams()
  const user = useSelector((storeState) => storeState.userModule.watchedUser)
  const orders = useSelector((storeState) => storeState.orderModule.orders)
  useEffect(() => {
    loadUser(params.id)
    loadOrders({})
    socketService.emit(SOCKET_EMIT_USER_WATCH, params.id)
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    return () => {
      socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    }
  }, [params.id])

  function onUserUpdate(user) {
    showSuccessMsg(
      `This user ${user.fullname} just got updated from socket, new score: ${user.score}`
    )
    store.dispatch({ type: 'SET_WATCHED_USER', user })
  }

  return (
    <main className='user-details'>
      <h2>My Dashboard</h2>
      <table className='orders-table'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Booker</th>
            <th>Stay</th>
            <th>Dates</th>
            <th>Nights</th>
            <th>Guests</th>
            <th>Price / night</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const stayNightsNum = Math.max(
              1,
              Math.floor((order.endDate - order.startDate) / 86400000)
            )
            const guestsNum =
              (Number(order.guests.adults) || 0) +
              (Number(order.guests.children) || 0) +
              (Number(order.guests.infants) || 0) +
              (Number(order.guests.pets) || 0)
            const pricePerNight = stayNightsNum
              ? Math.round(order.totalPrice / stayNightsNum)
              : order.totalPrice
            return (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.guest.fullname}</td>
                <td>{order.home.name}</td>
                <td>
                  {`${new Date(
                    order.startDate
                  ).toLocaleDateString()} - ${new Date(
                    order.endDate
                  ).toLocaleDateString()}`}
                </td>
                <td>{stayNightsNum}</td>
                <td>{guestsNum}</td>
                <td>${pricePerNight}</td>
                <td>${Math.round(order.totalPrice)}</td>
                <td className={order.status}>{order.status}</td>
                <td>
                  <button className='approve'>Approve</button>
                  <button className='reject'>Reject</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>
  )
}
