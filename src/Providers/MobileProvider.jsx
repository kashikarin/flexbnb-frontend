import { createContext, useContext, useEffect, useState } from 'react'

const MobileContext = createContext({ isMobile: false })

export function MobileProvider({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 580)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 580)
    handleResize() // ריצה ראשונית
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <MobileContext.Provider value={{ isMobile }}>
      {children}
    </MobileContext.Provider>
  )
}

export function useIsMobile() {
  return useContext(MobileContext)
}
