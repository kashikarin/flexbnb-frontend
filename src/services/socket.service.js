import io from 'socket.io-client'
import { userService } from './user'

export const SOCKET_EVENT_YOUR_HOME_BOOKED = 'home-booked'
export const SOCKET_EVENT_ORDER_APPROVED = 'order-approved'
export const SOCKET_EVENT_ORDER_REJECTED = 'order-rejected'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000'
export const socketService = createSocketService()

// for debugging from console
window.socketService = socketService

socketService.setup()

function createSocketService() {
  var socket = null
  const socketService = {
    setup() {
      socket = io(baseUrl)

      socket.on('connect', () => {
        console.log('✅ socket connected', socket.id)
        const user = userService.getLoggedinUser()
        if (user) {
          console.log('🔑 re-login user after connect:', user._id)
          this.login(user._id)
        }
      })

      socket.on('disconnect', (reason) => {
        console.log('⚠️ socket disconnected:', reason)
      })
      
      const user = userService.getLoggedinUser()
      if (user) this.login(user._id)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    login(userId) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },
  }
  return socketService
}
