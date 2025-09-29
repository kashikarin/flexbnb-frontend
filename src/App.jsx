import { useRef, useState } from 'react'
import { AppHeader } from './cmps/AppHeader'
import { RootCmp } from './RootCmp'

export function App() {
  const mainRef = useRef()
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  return (
    <>
      <AppHeader scrollContainerRef={mainRef} setIsSearchExpanded={setIsSearchExpanded}/>
      <RootCmp mainRef={mainRef} isSearchExpanded={isSearchExpanded} setIsSearchExpanded={setIsSearchExpanded}/>
      
    </>
  )
}
