import { useEffect } from 'react'
import { loadAllPosts } from '../utils/posts'
import BlogCard from '../components/BlogCard'
import InspirationCard from '../components/InspirationCard'
import inspiration from '../data/inspiration'
import './Home.css'

const posts = loadAllPosts().slice(0, 3)

function Home() {
  useEffect(() => {
    document.title = 'lauren brown | elbie'
  }, [])

  return (
    <div className="home">

      {/* Hero */}
      <section className="hero">
        <div className="hero-image-wrap">
          <div className="hero-image-circle">
            <img src={`${import.meta.env.BASE_URL}headshot.jpg`} alt="Lauren" className="hero-image" />
          </div>
        </div>
        <div className="hero-text">
          <h1>who am i?</h1>
          <p>
            hello world. my name is lauren and i am a data engineer.
            i have many hobbies and interests, and this blog is a place 
            for me to explore those more deeply. also it's a place for me
            to share things that's not traditional social media.
          </p>
            
          <h1>unorganized list of interests and hobbies</h1>
          <p>
            philsophy. history. reading. writing. learning languages. data.
            weiqi. mahjong. gardening. taijiquan. meditation. tea. coffee. cooking.
            wine. climbing. whitewater kayaking. freediving. snowboarding. cycling?
          </p>

          <h4>note</h4>
          <p>
            not all hobbies are on the forefront of my mind at all times. 
            content will rotate based on what is currently most interesting to me,
            or what i've been learning about recently.
          </p>
        </div>
      </section>

      {/* Blog */}
      <section className="home-blog">
        <h2>recent posts</h2>
        <div className="home-blog-grid">
          {posts.map(post => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      </section>

      {/* Inspiration */}
      <section className="home-inspiration">
        <h2>inspiration</h2>
        <div className="home-inspiration-grid">
          {inspiration.map(item => (
            <InspirationCard key={item.url} {...item} />
          ))}
        </div>
      </section>

      {/* Resume */}
      <section className="home-resume">
        <h2>resume</h2>
        <p>view or download my resume below.</p>
        <a
          href={`${import.meta.env.BASE_URL}resume.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="resume-btn"
        >
          open resume
        </a>
      </section>

    </div>
  )
}

export default Home
