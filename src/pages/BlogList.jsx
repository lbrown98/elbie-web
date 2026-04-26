import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaTh, FaList } from 'react-icons/fa'
import { loadAllPosts } from '../utils/posts'
import BlogCard from '../components/BlogCard'
import './BlogList.css'

const allPosts = loadAllPosts()
const categories = ['all', ...new Set(allPosts.flatMap(p => p.tags))]

function BlogList() {
  const [active, setActive] = useState('all')
  const [view, setView] = useState('card')

  useEffect(() => {
    document.title = 'lauren brown | blog'
  }, [])

  const filtered = useMemo(
    () => active === 'all' ? allPosts : allPosts.filter(p => p.tags.includes(active)),
    [active]
  )

  return (
    <div className="blog-list">
      <div className="blog-list-header">
        <h1>blog</h1>
        <div className="view-toggle">
          <button
            className={view === 'card' ? 'active' : ''}
            onClick={() => setView('card')}
            aria-label="Card view"
          >
            <FaTh />
          </button>
          <button
            className={view === 'compact' ? 'active' : ''}
            onClick={() => setView('compact')}
            aria-label="Compact view"
          >
            <FaList />
          </button>
        </div>
      </div>

      <div className="blog-list-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-chip${active === cat ? ' filter-chip--active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {view === 'card' ? (
        <div className="blog-list-grid">
          {filtered.map(post => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      ) : (
        <ul className="blog-list-compact">
          {filtered.map(post => (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`} className="compact-title">{post.title}</Link>
              {post.description && (
                <p className="compact-desc">{post.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BlogList
