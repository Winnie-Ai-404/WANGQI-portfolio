# Designer Portfolio (Next.js)

A premium, calm, editorial portfolio built with:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion

The site is data-driven and designed for job applications and professional presentation.  
Global UI stays neutral and restrained, while project accents are used only for local emphasis.

## Structure

```txt
app/
  page.tsx
  works/page.tsx
  works/[slug]/page.tsx
  about/page.tsx
  contact/page.tsx
components/
  site-header.tsx
  site-footer.tsx
  project-card.tsx
  media-frame.tsx
  works-browser.tsx
  section-reveal.tsx
  page-transition.tsx
data/
  site.ts
  projects.ts
```

## Design System Notes

- Warm off-white global background: `#F5F4F1`
- White surfaces with light shadow and soft rounded corners (20px-24px)
- Max content width: `1280px`
- Reading width: `760px`
- 8px spacing rhythm
- Unified mother system:
  - sticky blurred navigation
  - shared typography scale
  - consistent card/button/media frame language
  - shared page rhythm across all routes
- Project accents:
  - City Life: `#7C84E8`
  - Medical Experience: `#E7A14A`
  - Pet-care: `#B79E86`
  - Aurora: `#355B46`

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Open:

```txt
http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

## Vercel Deployment

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the repo into Vercel.
3. Framework preset: `Next.js` (auto-detected).
4. Build command: `npm run build`
5. Output: `.next` (auto)
6. Deploy.

## Content Editing

- Edit portfolio owner metadata in `data/site.ts`.
- Add or update projects in `data/projects.ts`.
- Project detail pages and cards are generated automatically from this data.
