import { eventBus, showSuccessMsg } from '../services/event-bus.service'
import { useState, useEffect, useRef } from 'react'
import { socketService, SOCKET_EVENT_REVIEW_ABOUT_YOU, SOCKET_EVENT_YOUR_HOME_BOOKED } from '../services/socket.service'

window.showSuccessMsg = showSuccessMsg
export function UserMsg() {
    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()
    
    useEffect(() => {
        console.log('✅ UserMsg mounted')
        const unsubscribe = eventBus.on('show-msg', msg => {
            console.log('📢 UserMsg got eventBus event:', msg)
            setMsg(msg)
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current)
                timeoutIdRef.current = null
            }
            timeoutIdRef.current = setTimeout(closeMsg, 3000)
        })

        socketService.on(SOCKET_EVENT_YOUR_HOME_BOOKED, order => {
            console.log('📩 got home-booked from server:', order)
            showSuccessMsg(`Your home ${order.home.name} was booked just now`)
        })

        socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, review => {
            showSuccessMsg(`New review about me ${review.txt}`)
        })

        return () => {
            console.log('❌ UserMsg unmounted, removing listeners')
            unsubscribe()
            socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
            socketService.off(SOCKET_EVENT_YOUR_HOME_BOOKED)
        }
    }, [])

    function closeMsg() {
        setMsg(null)
    }

    function msgClass() {
        return msg ? 'visible' : ''
    }
    return (
        <section className={`user-msg ${msg?.type || ''} ${msgClass()}`}>
            <button onClick={closeMsg}>x</button>
            {msg?.txt}
        </section>
    )
}
