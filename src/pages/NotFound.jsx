import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import './BlogPost.css'

function NotFound() {
  useEffect(() => {
    document.title = 'lauren brown | not found'
  }, [])

  return (
    <div className="blog-post-not-found" style={{ textAlign: 'center' }}>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">← go home</Link>
      <br /><br />
      <img src={`${import.meta.env.BASE_URL}404_go_back.gif`} alt="404" style={{ display: 'block', margin: '0 auto' }} />
    </div>
  )
}

export default NotFound
