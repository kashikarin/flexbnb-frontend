import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { HomeEditFooter } from './home-edit/home-edit-footer'

export function AppFooter() {
    const count = useSelector(storeState => storeState.userModule.count)
    const location = useLocation()
    const isHomeEdit = location.pathname === '/hosting/edit'
    return (
        <footer className="app-footer main-container full">
            {isHomeEdit ? 
                <HomeEditFooter /> 
                    :
                (<section>
                <p>Coffeerights &copy; 2025</p>
                {/* <p>Count: {count}</p> */}
            </section>)}
        </footer>
    )
}