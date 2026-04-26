import { Link } from 'react-router-dom'
import './BlogCard.css'

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function BlogCard({ title, category, date, description, slug }) {
  return (
    <Link to={`/blog/${slug}`} className="blog-card">
      <div className="blog-card-meta">
        <span className="blog-card-category">{category}</span>
        <span className="blog-card-date">{formatDate(date)}</span>
      </div>
      <h3 className="blog-card-title">{title}</h3>
      <p className="blog-card-description">{description}</p>
    </Link>
  )
}

export default BlogCard
