import { useRef, useState } from 'react'
import { AppHeader } from './cmps/AppHeader'
import { RootCmp } from './RootCmp'
import { AppFooterWrapper } from './cmps/AppFooterWrapper'


export function App() {
  const mainRef = useRef()
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  return (
    <>
      {/* <AppHeader/> */}
      <AppHeader scrollContainerRef={mainRef} setIsSearchExpanded={setIsSearchExpanded}/>
      <RootCmp mainRef={mainRef} isSearchExpanded={isSearchExpanded} setIsSearchExpanded={setIsSearchExpanded}/>
      
    </>
  )
}
