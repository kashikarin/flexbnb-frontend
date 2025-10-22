import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'

// AppFooter.jsx
export function AppFooter() {
    const location = useLocation()
    const isHomeEdit = location.pathname === '/hosting/edit'
    return !isHomeEdit && (
        <>
        <footer className="app-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Support</h4>
                    <button>Help Center</button>
                    <button>Get help with a safety issue</button>
                    <button>FlexCover</button>
                </div>

                <div className="footer-section">
                    <h4>Hosting</h4>
                    <button>Flexbnb your home</button>
                    <button>Flexbnb your experience</button>
                    <button>Flexbnb your service</button>
                </div>

                <div className="footer-section">
                    <h4>Flexbnb</h4>
                    <button>2025 Summer Release</button>
                    <button>Newsroom</button>
                    <button>Careers</button>
                </div>
            </div>
        </footer>
        </>
    )
}


