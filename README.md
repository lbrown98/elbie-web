# elbie-web

Personal website built with React + Vite.

## Running locally

```bash
npm install
npm run dev
```

## Project structure

```
public/
  headshot.jpg        # hero image
  resume.pdf          # linked from home page

src/
  pages/
    Home.jsx          # landing page: hero, recent posts, inspiration, resume
    BlogList.jsx      # all posts with tag filters and card/compact view toggle
    BlogPost.jsx      # individual post page (rendered markdown)
    PhotoAlbum.jsx    # photos page with album filters and flip cards

  components/
    Nav.jsx           # top navigation bar
    Footer.jsx        # social icons and copyright footer
    BlogCard.jsx      # post card used on home and blog list
    InspirationCard.jsx  # external link card used on home
    PhotoCard.jsx     # flip card used on photos page

  posts/              # blog post content (markdown with frontmatter)
    commentary-on-tea.md

  assets/
    photos/           # photo images (imported by src/data/photos.js)

  data/
    inspiration.js    # list of inspiration links shown on home page
    photos.js         # list of photos shown on photos page

  utils/
    posts.js          # loads and parses all markdown posts at build time
```

## Adding a blog post

Create a new `.md` file in `src/posts/`. Filename becomes the URL slug.

```markdown
---
title: My Post Title
tags: tag one, tag two
date: 2025-01-01
description: One-line summary shown on cards.
---

Post content goes here.
```

## Adding a photo

1. Drop the image into `src/assets/photos/`
2. Open `src/data/photos.js` and add an import + array entry:

```js
import myPhoto from '../assets/photos/my-photo.jpg'

// in the array:
{ src: myPhoto, date: '2025-06-15', description: 'Caption.', tags: ['album name'] }
```

Tags become the album filter chips on the photos page. A photo can have multiple tags.

## Adding an inspiration link

Edit `src/data/inspiration.js` and add an entry to the array:

```js
{ title: 'Title', url: 'https://...', type: 'blog', description: 'Short description.' }
```

Valid types: `blog`, `youtube`, `website`, `book`, `podcast`

---

## Todo

- [ ] add first blog post
- [ ] add resume
- [ ] replace inspiration cards with actual inspiration
- [ ] add a few pictures
- [ ] publish website
- [ ] link website on ig, linkedin, etc.
- [ ] add chinese version of the website
- [ ] add projects section
- [ ] add ai vs user connect5 mini game (project)
- [ ] update website titles for new sections

