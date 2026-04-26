import { FaInstagram, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-copyright">&copy; Lauren Brown 2026</p>
      <div className="footer-socials">
        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <FaYoutube />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
      </div>
      <div className="footer-spacer" />
    </footer>
  )
}

export default Footer
