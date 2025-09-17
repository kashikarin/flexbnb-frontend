import { useEffect, useState } from "react"

export function ResizeDebugger() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth
      console.log('🔄 resize -> width:', width)
      setIsMobile(width <= 580)
    }

    console.log('✅ listener added')
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      console.log('❌ listener removed')
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    console.log('📱 isMobile changed ->', isMobile)
  }, [isMobile])

  return <h2>{isMobile ? "📱 Mobile" : "💻 Desktop"}</h2>
}
