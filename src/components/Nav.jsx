import { Link } from 'react-router-dom'
import './Nav.css'

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-brand">elbie</Link>
        <div className="nav-links">
          <Link to="/">home</Link>
          <Link to="/blog">blog</Link>
          <Link to="/photos">photos</Link>
          <a href="https://docs.google.com/document/d/1TyRh3Nkf5zsWoLRd07ws81b0xAJ8QFDV/edit?usp=sharing&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer">resume</a>
        </div>
      </div>
    </nav>
  )
}

export default Nav
