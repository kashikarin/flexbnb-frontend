import { createContext, useContext, useEffect, useState } from 'react'

const MobileContext = createContext({ isMobile: false })

export function MobileProvider({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 740)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 740)
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
  const context = useContext(MobileContext)
  return context.isMobile 
}
