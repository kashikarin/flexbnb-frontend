import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'

export function AppFooter() {
    const location = useLocation()
    const isHomeEdit = location.pathname === '/hosting/edit'
    return !isHomeEdit && (
        <footer className="app-footer main-container full">
            <section>
                <p>Coffeerights &copy; 2025</p>
                {/* <p>Count: {count}</p> */}
            </section>
        </footer>
    )
}