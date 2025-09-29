import { eventBus, showSuccessMsg } from '../services/event-bus.service'
import { useState, useEffect, useRef } from 'react'
import {
  socketService,
  SOCKET_EVENT_YOUR_HOME_BOOKED,
  SOCKET_EVENT_ORDER_APPROVED,
  SOCKET_EVENT_ORDER_REJECTED,
} from '../services/socket.service'
import { ReactSVG } from 'react-svg'
import ConfettiBoom from 'react-confetti-boom'

window.showSuccessMsg = showSuccessMsg
export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  const [showConfetti, setShowConfetti] = useState(false)
  const confettiTimeoutRef = useRef()

  useEffect(() => {
    console.log('✅ UserMsg mounted')
    const unsubscribe = eventBus.on('show-msg', (msg) => {
      console.log('📢 UserMsg got eventBus event:', msg)
      setMsg(msg)
      if (msg.type === 'success') {
        triggerConfetti()
      }
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
        timeoutIdRef.current = null
      }
      timeoutIdRef.current = setTimeout(closeMsg, 5000)
    })

    socketService.on(SOCKET_EVENT_YOUR_HOME_BOOKED, (order) => {
      console.log('📩 got home-booked from server:', order)
      showSuccessMsg(`Your home ${order.home.name} was booked just now`)
      //   triggerConfetti()
    })

    socketService.on(SOCKET_EVENT_ORDER_APPROVED, (order) => {
      console.log('📩 got order-approved from server:', order)
      showSuccessMsg(
        `Your booking for ${order.home.name} has been approved ! 🎉`
      )
      triggerConfetti()
    })

    socketService.on(SOCKET_EVENT_ORDER_REJECTED, (order) => {
      console.log('📩 got order-rejected from server:', order)
      showSuccessMsg(
        `Unfortunately, your booking request for ${order.home.name} was declined.`
      )
    })

    return () => {
      console.log('❌ UserMsg unmounted, removing listeners')
      unsubscribe()
      socketService.off(SOCKET_EVENT_YOUR_HOME_BOOKED)
      socketService.off(SOCKET_EVENT_ORDER_APPROVED)
      socketService.off(SOCKET_EVENT_ORDER_REJECTED)
    }

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }
    if (confettiTimeoutRef.current) {
      clearTimeout(confettiTimeoutRef.current)
    }
  }, [])

  function triggerConfetti() {
    setShowConfetti(true)

    if (confettiTimeoutRef.current) {
      clearTimeout(confettiTimeoutRef.current)
    }

    confettiTimeoutRef.current = setTimeout(() => {
      setShowConfetti(false)
    }, 4000)
  }

  function closeMsg() {
    setMsg(null)
  }

  function msgClass() {
    return msg ? 'visible' : ''
  }
  return (
    <>
      {showConfetti && (
        <div
          style={{
            zIndex: 99999,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
          }}
        >
          <ConfettiBoom
            particleCount={150}
            effectCount={3}
            colors={['#ff6b6b', '#ff577f', '#ff884b', '#ffd384', '#fff9b0']}
            shapeSize={12}
            effectInterval={300}
            effectLength={3000}
            mode="fall"
            fadeOutHeight={0.7}
          />
        </div>
      )}
      <section className={`user-msg ${msg?.type || ''} ${msgClass()}`}>
        <div className="user-msg-inner">
          <div className="user-msg-icon">
            <ReactSVG src="/svgs/flexbnb.svg" />
          </div>
          <div className="user-msg-content">
            <p>{msg?.txt}</p>
          </div>
          <button className="user-msg-close" onClick={closeMsg}>
            ×
          </button>
        </div>
      </section>
    </>
  )
}
