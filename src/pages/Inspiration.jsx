import { useState, useEffect, useMemo } from 'react'
import { FaTh, FaList } from 'react-icons/fa'
import inspiration from '../data/inspiration'
import InspirationCard from '../components/InspirationCard'
import './Inspiration.css'

function formatMonth(yyyyMm) {
  const [year, month] = yyyyMm.split('-')
  return new Date(Number(year), Number(month) - 1, 1).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  })
}

function Inspiration() {
  const [view, setView] = useState('list')

  useEffect(() => {
    document.title = 'lauren brown | inspiration'
  }, [])

  const grouped = useMemo(() => {
    const map = new Map()
    for (const item of inspiration) {
      const key = item.month ?? 'other'
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(item)
    }
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]))
  }, [])

  return (
    <div className="inspiration-page">
      <div className="inspiration-header">
        <h1>inspiration</h1>
        <div className="view-toggle">
          <button
            className={view === 'card' ? 'active' : ''}
            onClick={() => setView('card')}
            aria-label="Card view"
          >
            <FaTh />
          </button>
          <button
            className={view === 'list' ? 'active' : ''}
            onClick={() => setView('list')}
            aria-label="List view"
          >
            <FaList />
          </button>
        </div>
      </div>

      {grouped.map(([month, items]) => (
        <section key={month} className="inspiration-month">
          <h2 className="inspiration-month-label">{formatMonth(month)}</h2>
          {view === 'card' ? (
            <div className="inspiration-grid">
              {items.map(item => (
                <InspirationCard key={item.url} {...item} />
              ))}
            </div>
          ) : (
            <ul className="inspiration-list">
              {items.map(item => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inspiration-list-title"
                  >
                    {item.title} ↗
                  </a>
                  {item.description && (
                    <p className="inspiration-list-desc">{item.description}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  )
}

export default Inspiration
