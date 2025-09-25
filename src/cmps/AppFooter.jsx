import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { useIsMobile } from '../Providers/MobileProvider'
import { AppFooter_mobile } from './AppFooter_mobile'


export function AppFooter() {
    const isMobile = useIsMobile()
    const location = useLocation()
    const isHomeEdit = location.pathname === '/hosting/edit'
    return !isHomeEdit && (
        <>
        {!isMobile ? (
        <footer className="app-footer full">
            <section>
                <p>Coffeerights &copy; 2025</p>
                {/* <p>Count: {count}</p> */}
            </section>
        </footer>
    ): (
        <AppFooter_mobile/>
    )}
    </>
    )
}