import { useIsMobile } from '../Providers/MobileProvider'
import { AppFooter } from './AppFooter'
import { AppFooter_mobile } from './AppFooter_mobile'

export function AppFooterWrapper() {
  const isMobile = useIsMobile()

  return (
    <>
      {isMobile ? <AppFooter_mobile /> : <AppFooter />}
    </>
  )
}
