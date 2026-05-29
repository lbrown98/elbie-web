import { useEffect, useMemo } from 'react'
import inspiration from '../data/inspiration'
import './Inspiration.css'

function formatMonth(yyyyMm) {
  const [year, month] = yyyyMm.split('-')
  return new Date(Number(year), Number(month) - 1, 1).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  })
}

function Inspiration() {
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
      <h1>inspiration</h1>
      {grouped.map(([month, items]) => (
        <section key={month} className="inspiration-month">
          <h2 className="inspiration-month-label">{formatMonth(month)}</h2>
          <ul className="inspiration-list">
            {items.map(item => (
              <li key={item.url} className="inspiration-list-item">
                <span className="inspiration-list-type">{item.type}</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inspiration-list-title"
                >
                  {item.title} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export default Inspiration
