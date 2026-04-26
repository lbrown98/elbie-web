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

export function loadAllPosts() {
  return Object.entries(postModules)
    .map(([path, raw]) => {
      const data = parseFrontmatter(raw)
      const slug = path.split('/').pop().replace('.md', '')
      return { slug, ...data }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}
