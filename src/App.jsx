import { useRef } from 'react'
import { AppHeader } from './cmps/AppHeader'
import { RootCmp } from './RootCmp'
import { AppFooterWrapper } from './cmps/AppFooterWrapper'

export function App() {
  const mainRef = useRef()

  return (
    <>
      {/* <AppHeader/> */}
      <AppHeader scrollContainerRef={mainRef} />
      <RootCmp mainRef={mainRef} />
      
    </>
  )
}
