import { Link } from 'react-router-dom'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../hooks/useTheme'
import './Nav.css'

function Nav() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-brand">elbie</Link>
        <div className="nav-links">
          <Link to="/">home</Link>
          <Link to="/blog">blog</Link>
          <Link to="/photos">photos</Link>
          <a href="https://docs.google.com/document/d/1TyRh3Nkf5zsWoLRd07ws81b0xAJ8QFDV/edit?usp=sharing&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer">resume</a>
          <button className="nav-theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
