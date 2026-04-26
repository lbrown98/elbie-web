import './InspirationCard.css'

const typeLabels = {
  blog: 'blog',
  youtube: 'youtube',
  website: 'website',
  book: 'book',
  podcast: 'podcast',
}

function InspirationCard({ title, url, type, description }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inspiration-card"
    >
      <div className="inspiration-card-header">
        <span className="inspiration-card-type">{typeLabels[type] ?? type}</span>
        <span className="inspiration-card-arrow">↗</span>
      </div>
      <h3 className="inspiration-card-title">{title}</h3>
      {description && (
        <p className="inspiration-card-description">{description}</p>
      )}
    </a>
  )
}

export default InspirationCard
