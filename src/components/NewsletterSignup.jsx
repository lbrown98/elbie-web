import { useState } from 'react'
import './NewsletterSignup.css'

function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch(import.meta.env.VITE_NEWSLETTER_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company }),
      })

      if (!res.ok) throw new Error()
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="newsletter">
      <p className="newsletter-label">get notified when i publish something new</p>

      {status === 'success' ? (
        <p className="newsletter-msg newsletter-msg--ok">you're in — thanks for subscribing.</p>
      ) : (
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="newsletter-input"
            placeholder="your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          {/* honeypot — visually hidden, bots fill it in */}
          <input
            type="text"
            name="company"
            className="newsletter-hp"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={e => setCompany(e.target.value)}
          />

          <button
            type="submit"
            className="newsletter-btn"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'subscribing...' : 'subscribe'}
          </button>

          {status === 'error' && (
            <p className="newsletter-msg newsletter-msg--err">something went wrong — try again?</p>
          )}
        </form>
      )}
    </div>
  )
}

export default NewsletterSignup
