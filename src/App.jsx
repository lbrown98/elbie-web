import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Nav />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
