import { useRef } from 'react'
import { AppHeader } from './cmps/AppHeader'
import { RootCmp } from './RootCmp'

export function App() {
  const mainRef = useRef()

  return (
    <>
      <AppHeader scrollContainerRef={mainRef} />
      <RootCmp mainRef={mainRef} />
    </>
  )
}
