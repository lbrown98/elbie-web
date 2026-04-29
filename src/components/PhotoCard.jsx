import { useState } from 'react'
import './PhotoCard.css'

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function PhotoCard({ src, date, description }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`photo-card${flipped ? ' photo-card--flipped' : ''}`}
      onClick={() => setFlipped(f => !f)}
    >
      <div className="photo-card-inner">
        <div className="photo-card-front">
          <img src={src} alt={description} />
          <span className="photo-card-date">{formatDate(date)}</span>
        </div>
        <div className="photo-card-back">
          <p className="photo-card-description">{description}</p>
          <span className="photo-card-date">{formatDate(date)}</span>
        </div>
      </div>
    </div>
  )
}

export default PhotoCard
