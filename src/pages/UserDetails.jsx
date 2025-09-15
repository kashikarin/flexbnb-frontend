import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { loadUser } from '../store/actions/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import {
  loadOrder,
  loadOrders,
  updateOrder,
} from '../store/actions/order.actions'
// import PieChart from '../cmps/PieChart'
import BasicPie from '../cmps/BasicPie'
import { BarChart } from '@mui/x-charts'
import BasicBars from '../cmps/BasicBars'
import BasicLineChart from '../cmps/BasicLineCharts'
import { draftOrderService } from '../services/draft-order/draft-order.service.local'

export function UserDetails() {
  const params = useParams()
  const { getNumberOfNights } = draftOrderService
  // const user = useSelector((storeState) => storeState.userModule.watchedUser)
  const orders = useSelector((storeState) => storeState.orderModule.orders)
  console.log('🚀 ~ orders:', orders)

  useEffect(() => {
    loadUser(params.id)
    loadOrders({})
  }, [params.id])

  async function onUpdateOrderStatus(order, updatedStatus) {
    const orderToUpdate = { ...order, status: updatedStatus }
    try {
      await updateOrder(orderToUpdate)
    } catch (err) {
      console.error('Cannot update order status', err)
    }
  }

  function getPricePerNight(totalPrice, nightsNum) {
    return Math.round(totalPrice / (nightsNum * (1 + 0.14)))
  }

  return (
    <main className="user-details">
      <section
        className="charts"
        style={{
          display: 'flex',
          gap: '20px',
          marginBlockStart: '20px',
          marginBlockEnd: '20px',
          justifyContent: 'space-evenly',
        }}
      >
        <div className="chart-container">
          <BasicPie />
        </div>
        <div className="chart-container">
          <BasicBars />
        </div>
        <div className="chart-container">
          <BasicLineChart />
        </div>
      </section>

      <h2>My Dashboard</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Booker</th>
            <th>Stay</th>
            <th>Dates</th>
            <th className="center">Nights</th>
            <th className="center">Guests</th>
            <th className="center">Price / night</th>
            <th className="center">Total</th>
            <th className="center">Status</th>
            <th className="center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const stayNightsNum = getNumberOfNights(
              order.checkIn,
              order.checkOut
            )
            const guestsNum =
              (Number(order.guests?.adults) ?? 0) +
              (Number(order.guests?.children) ?? 0)

            return (
              <tr key={order._id}>
                <td>{order?.purchaser?.fullname}</td>
                <td>{order.home.name}</td>
                <td>
                  {`${new Date(
                    order.checkIn
                  ).toLocaleDateString()} - ${new Date(
                    order.checkOut
                  ).toLocaleDateString()}`}
                </td>
                <td className="center">{stayNightsNum}</td>
                <td className="center">{guestsNum}</td>
                <td className="center">
                  ${getPricePerNight(order.totalPrice, stayNightsNum)}
                </td>
                <td className="center"> ${Math.round(order.totalPrice)}</td>
                <td className={`${order.status} center`}>{order.status}</td>
                <td className="center">
                  {order.status === 'pending' && (
                    <>
                      <button
                        className="approve"
                        onClick={() => onUpdateOrderStatus(order, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="reject"
                        onClick={() => onUpdateOrderStatus(order, 'rejected')}
                      >
                        Reject
                      </button>{' '}
                    </>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>
  )
}
