import { useState, useMemo, useEffect } from 'react'
import { photos } from '../data/photos'
import PhotoCard from '../components/PhotoCard'
import './PhotoAlbum.css'

const allPhotos = photos
const albums = ['all', ...new Set(allPhotos.flatMap(p => p.tags))]

function PhotoAlbum() {
  const [active, setActive] = useState('all')

  useEffect(() => {
    document.title = 'lauren brown | photos'
  }, [])

  const filtered = useMemo(
    () => active === 'all' ? allPhotos : allPhotos.filter(p => p.tags.includes(active)),
    [active]
  )

  return (
    <div className="photo-album">
      <h1>photos</h1>

      {albums.length > 1 && (
        <div className="photo-album-filters">
          {albums.map(album => (
            <button
              key={album}
              className={`filter-chip${active === album ? ' filter-chip--active' : ''}`}
              onClick={() => setActive(album)}
            >
              {album}
            </button>
          ))}
        </div>
      )}

      <div className="photo-album-grid">
        {filtered.map((photo, i) => (
          <PhotoCard key={i} {...photo} />
        ))}
      </div>
    </div>
  )
}

export default PhotoAlbum
