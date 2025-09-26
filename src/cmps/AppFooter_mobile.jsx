import { NavLink } from "react-router-dom"
import { FaSearch, FaHeart, FaUser } from "react-icons/fa"
import { AiOutlineMessage } from "react-icons/ai"
import { MdOutlineTravelExplore } from "react-icons/md"

export function AppFooter_mobile() {
  return (
    <footer className="app-footer-mobile">
      <nav className="bottom-nav">
        <NavLink to="/" className="nav-btn">
          <span>Explore</span>
        </NavLink>
        <NavLink to="/wishlists" className="nav-btn">
          <span>Wishlists</span>
        </NavLink>
        <NavLink to="/dashboard" className="nav-btn">
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/profile" className="nav-btn">
          <span>Profile</span>
        </NavLink>
      </nav>
    </footer>
  )
}
