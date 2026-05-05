import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { loadPostBySlug } from '../utils/posts'
import './BlogPost.css'

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function BlogPost() {
  const { slug } = useParams()
  const post = loadPostBySlug(slug)

  useEffect(() => {
    document.title = post
      ? `lauren brown | ${post.title.toLowerCase()}`
      : 'lauren brown | blog'
  }, [post])

  if (!post) {
    return (
      <div className="blog-post-not-found" style={{ textAlign: 'center' }}>
        <h1>404</h1>
        <p>Post not found.</p>
        <Link to="/blog">← back to blog</Link>
        <br /><br />
        <img src={`${import.meta.env.BASE_URL}404_go_back.gif`} alt="404" style={{ display: 'block', margin: '0 auto' }} />
      </div>
    )
  }

  return (
    <div className="blog-post">
      <Link to="/blog" className="blog-post-back">← blog</Link>

      <header className="blog-post-header">
        <h1>{post.title}</h1>
        <div className="blog-post-meta">
          {(post.tags ?? []).map(tag => (
            <span key={tag} className="blog-post-category">{tag}</span>
          ))}
          <span className="blog-post-date">{formatDate(post.date)}</span>
        </div>
      </header>

      <article className="blog-post-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" /> }}>{post.body}</ReactMarkdown>
      </article>
    </div>
  )
}

export default BlogPost
