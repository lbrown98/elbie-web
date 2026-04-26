import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import './App.css'

function BlogPostPlaceholder() {
  return (
    <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem', fontFamily: 'var(--font-body)' }}>
      <p style={{ color: 'var(--color-text-muted)' }}>Blog post page coming soon.</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Nav />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:slug" element={<BlogPostPlaceholder />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
