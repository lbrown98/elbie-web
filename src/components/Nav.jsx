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
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">resume</a>
        </div>
      </div>
    </nav>
  )
}

export default Nav
