import React, { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders, updateOrder } from '../store/actions/order.actions'

export const BookingDashboard = () => {
  // Get logged in user and orders from Redux store
  // Make sure you have loggedInUser in your Redux store at: storeState.userModule.loggedInUser
  const loggedInUser = useSelector(
    (storeState) => storeState.userModule.loggedInUser
  )
  const orders = useSelector((storeState) => storeState.orderModule.orders)

  // Debug console logs - remove these after fixing
  console.log('🚀 loggedInUser:', loggedInUser)
  console.log('🚀 isHost:', loggedInUser?.isHost)
  console.log('🚀 Full user object:', JSON.stringify(loggedInUser, null, 2))

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)
  const [selectedBooking, setSelectedBooking] = useState(null)

  // Load orders on component mount (only if user is logged in and is host)
  useEffect(() => {
    if (loggedInUser && loggedInUser?.isHost) {
      loadOrders({})
    }
  }, [loggedInUser])

  // Helper functions
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    })
  }

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getStatusText = (status) => {
    const statusMap = {
      approved: 'Approved',
      pending: 'Pending',
      rejected: 'Rejected',
    }
    return statusMap[status] || status
  }

  const getGuestCount = (guests) => {
    if (!guests) return 0
    let count = parseInt(guests.adults) || 0
    count += parseInt(guests.children) || 0
    count += parseInt(guests.infants) || 0
    return count
  }

  // Booking management functions
  const handleBookingAction = (bookingId, action) => {
    setSelectedBooking(bookingId)
    setConfirmAction(action)
    setShowConfirmModal(true)
  }

  const confirmBookingAction = async () => {
    if (!selectedBooking || !confirmAction) return

    try {
      // Find the order and update its status
      const orderToUpdate = orders.find(
        (order) => order._id === selectedBooking
      )
      if (orderToUpdate) {
        const updatedOrder = { ...orderToUpdate, status: confirmAction }
        await updateOrder(updatedOrder)
      }
    } catch (err) {
      console.error('Cannot update order status', err)
    }

    setShowConfirmModal(false)
    setSelectedBooking(null)
    setConfirmAction(null)
  }

  const cancelConfirmAction = () => {
    setShowConfirmModal(false)
    setSelectedBooking(null)
    setConfirmAction(null)
  }

  const getActionText = (action) => {
    const actionMap = {
      approved: 'approve',
      rejected: 'reject',
      pending: 'set as pending',
    }
    return actionMap[action] || action
  }

  // Filter orders
  const filteredBookings = useMemo(() => {
    if (!orders || !loggedInUser?.isHost) return []

    return orders.filter((order) => {
      const matchesSearch =
        order.home?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.host?.fullname
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.purchaser?.fullname
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())

      const matchesStatus =
        statusFilter === 'all' || order.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [orders, searchTerm, statusFilter, loggedInUser])

  // Calculate statistics
  const stats = useMemo(() => {
    if (!orders || !loggedInUser?.isHost)
      return { total: 0, approved: 0, pending: 0, rejected: 0, revenue: 0 }

    return {
      total: orders.length,
      approved: orders.filter((b) => b.status === 'approved').length,
      pending: orders.filter((b) => b.status === 'pending').length,
      rejected: orders.filter((b) => b.status === 'rejected').length,
      revenue: orders
        .filter((b) => b.status === 'approved')
        .reduce((sum, b) => sum + b.totalPrice, 0),
    }
  }, [orders, loggedInUser])

  return (
    <div className="booking-dashboard">
      {loggedInUser && loggedInUser?.isHost ? (
        <div className="container">
          {/* Header */}
          <header className="header">
            <h1>Bookings Dashboard</h1>
            <p>Manage and view your property reservations</p>
          </header>

          {/* Search and Filter Controls */}
          <div className="controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by property name or booker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-box">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Statistics */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Bookings</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.approved}</div>
              <div className="stat-label">Approved</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.pending}</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.rejected}</div>
              <div className="stat-label">Rejected</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                ${stats.revenue.toLocaleString()}
              </div>
              <div className="stat-label">Total Revenue</div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bookings-table-container">
            {!orders ? (
              <div className="no-results">
                <h3>Loading...</h3>
                <p>Please wait while we load your bookings</p>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="no-results">
                <h3>No bookings found</h3>
                <p>Try adjusting your search or filter parameters</p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Guest</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Guests</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((order) => (
                      <tr key={order._id} className="booking-row">
                        <td className="property-cell">
                          <div className="property-info">
                            <img
                              src={
                                order.home?.imgUrl ||
                                'https://via.placeholder.com/80x60/f0f0f0/666666?text=No+Image'
                              }
                              alt={order.home?.name || 'Property'}
                              className="property-image"
                              onError={(e) => {
                                e.target.src =
                                  'https://via.placeholder.com/80x60/f0f0f0/666666?text=No+Image'
                              }}
                            />
                            <div className="property-details">
                              <div className="property-name">
                                {order.home?.name || 'Property Name'}
                              </div>
                              <div className="booking-id">
                                #{order._id?.slice(-8) || 'N/A'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="guest-cell">
                          <div className="guest-name">
                            {order.purchaser?.fullname ||
                              order.host?.fullname ||
                              'Unknown'}
                          </div>
                        </td>
                        <td className="date-cell">
                          <div className="check-date">
                            {formatDate(order.checkIn)}
                          </div>
                        </td>
                        <td className="date-cell">
                          <div className="check-date">
                            {formatDate(order.checkOut)}
                          </div>
                          <div className="nights-count">
                            {calculateNights(order.checkIn, order.checkOut)}{' '}
                            nights
                          </div>
                        </td>
                        <td className="guests-cell">
                          <div className="guests-count">
                            {getGuestCount(order.guests)} guests
                          </div>
                          {order.guests?.pets && (
                            <div className="pets-count">
                              {order.guests.pets} pets
                            </div>
                          )}
                        </td>
                        <td className="price-cell">
                          <div className="total-price">
                            ${order.totalPrice?.toLocaleString() || '0'}
                          </div>
                        </td>
                        <td className="status-cell">
                          <span
                            className={`status-badge status-${order.status}`}
                          >
                            {getStatusText(order.status)}
                          </span>
                        </td>
                        <td className="actions-cell">
                          {order.status === 'pending' && (
                            <div className="table-actions">
                              <button
                                className="table-btn approve-btn"
                                onClick={() =>
                                  handleBookingAction(order._id, 'approved')
                                }
                                title="Approve booking"
                              >
                                ✓
                              </button>
                              <button
                                className="table-btn reject-btn"
                                onClick={() =>
                                  handleBookingAction(order._id, 'rejected')
                                }
                                title="Reject booking"
                              >
                                ✗
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Confirmation Modal */}
          {showConfirmModal && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>Confirm Action</h3>
                <p>
                  Are you sure you want to {getActionText(confirmAction)} this
                  booking?
                </p>
                <div className="modal-actions">
                  <button
                    className="action-btn cancel-btn"
                    onClick={cancelConfirmAction}
                  >
                    Cancel
                  </button>
                  <button
                    className="action-btn approve-btn"
                    onClick={confirmBookingAction}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : loggedInUser && !loggedInUser?.isHost ? (
        <div className="access-denied">
          <div className="reservations-placeholder">
            <img
              src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-reservations/original/6d5ef5a0-93bc-4dbe-89f3-9673e852d0be.png"
              alt="Manage reservations"
              className="reservations-image"
            />
            <h2>Manage your reservations and lists</h2>
            <p>
              When you're ready to book or host, we'll show your reservations
              and listings here.
            </p>
          </div>
        </div>
      ) : (
        <div className="access-denied">
          <div className="access-denied-content">
            <div className="access-denied-icon">🔒</div>
            <h2>Access Denied</h2>
            <p>Log in to see more</p>
          </div>
        </div>
      )}
    </div>
  )
}
