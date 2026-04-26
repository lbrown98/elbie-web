const postModules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true })

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const data = {}
  match[1].split('\n').forEach(line => {
    const colon = line.indexOf(':')
    if (colon === -1) return
    const key = line.slice(0, colon).trim()
    const value = line.slice(colon + 1).trim()
    data[key] = value
  })
  return data
}

function getBody(raw) {
  const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?([\s\S]*)/)
  return match ? match[1].trim() : raw.trim()
}

function parseTags(raw) {
  if (!raw) return []
  return raw.split(',').map(t => t.trim()).filter(Boolean)
}

export function loadPostBySlug(slug) {
  const entry = Object.entries(postModules)
    .find(([path]) => path.split('/').pop().replace('.md', '') === slug)
  if (!entry) return null
  const [, raw] = entry
  const data = parseFrontmatter(raw)
  const body = getBody(raw)
  return { slug, body, ...data, tags: parseTags(data.tags) }
}

export function loadAllPosts() {
  return Object.entries(postModules)
    .map(([path, raw]) => {
      const data = parseFrontmatter(raw)
      const slug = path.split('/').pop().replace('.md', '')
      return { slug, ...data, tags: parseTags(data.tags) }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}
