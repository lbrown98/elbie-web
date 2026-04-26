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
            <img src="/headshot.jpg" alt="Lauren" className="hero-image" />
          </div>
        </div>
        <div className="hero-text">
          <h1>who am i?</h1>
          <p>
            hello world. my name is lauren and i am a software engineer.
            i have many hobbies and many things that i want to learn about.
            for example, philsophy. reading, writing, tea. learning languages.
            i am also interested in tea, coffee, cooking, and The Outdoors TM.
            physical activities include climbing, whitewater kayaking, freediving, and snowboarding.
            i have too many things that i want to do and generally not enough time.
            also i feel like i have a lot of thoughts but i:
            a. don't always retain them since i forget to write them down / where i wrote them down
            b. don't have a good place as of now to share them
          </p>

          <h1>why website?</h1>
          <p>
            in my day-to-day i primarily do data engineering and backend stuff.
            this website is a playground for me to experiment with web development and share my projects.
            yes, i know that ai is going to make web development mostly obsolete, thanks for reminding me.
            anyway i also want a website so i finally have a place to collect my thoughts that's not on traditional social media.
            stay tuned for more updates and projects in the future!
            {/* something here about traditional social media feeling very shallow and performative */}
            {/* something here about social media / short form content and adhd */}
            {/* write something eventually about how i feel about ai and losing brain funcitoning */}
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
          href="/resume.pdf"
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
