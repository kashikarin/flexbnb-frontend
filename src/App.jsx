import { useRef } from 'react'
import { AppHeader } from './cmps/AppHeader'
import { RootCmp } from './RootCmp'
import { AppFooter } from './cmps/AppFooter'

export function App() {
  const mainRef = useRef()

  return (
    <>
      {/* <AppHeader/> */}
      <AppHeader scrollContainerRef={mainRef} />
      <RootCmp mainRef={mainRef} />
      <AppFooter /> 
    </>
  )
}
