import { useState, useMemo } from 'react'
import { loadAllPosts } from '../utils/posts'
import BlogCard from '../components/BlogCard'
import './BlogList.css'

const allPosts = loadAllPosts()
const categories = ['all', ...new Set(allPosts.map(p => p.category))]

function BlogList() {
  const [active, setActive] = useState('all')

  const filtered = useMemo(
    () => active === 'all' ? allPosts : allPosts.filter(p => p.category === active),
    [active]
  )

  return (
    <div className="blog-list">
      <h1>blog</h1>

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

      <div className="blog-list-grid">
        {filtered.map(post => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  )
}

export default BlogList
