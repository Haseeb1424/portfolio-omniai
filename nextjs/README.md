# Team OmniAI - Next.js + Node

Marketing site rebuilt as a Next.js 14 App Router frontend with an Express backend for the contact form.

## Structure

```text
app/
  layout.js             root layout: fonts, nav, footer, cursor canvas
  page.js               home page
  services/page.js
  work/page.js          case-study gallery
  work/[slug]/page.js   case-study template
  about/page.js
  pricing/page.js
  contact/page.js
components/             Nav, Footer, ContactSection, ServicesCarousel, HeroNetwork, AuditModal, CaseCover, Reveal, FloatingActions
lib/site.js             contact details, services, and case-study data
server/index.js         Express API
public/                 logos, team photos, videos, and work images
```

## Assets Included

- `public/logo.png`, `public/logo-primary.png`, `public/logo-mark.png`
- `public/media/1.mp4`, `public/media/2.mp4`, `public/media/3.mp4`, `public/media/ch.mp4`
- `public/team/haseeb.png`, `public/team/danish.png`, `public/team/zeeshan.png`
- `public/work/project-1-*.webp` exported from the filled HTML image slots

Other case-study cards use generated in-app cover art until final project images are available.

## Run

```bash
npm install
npm run dev      # frontend: http://localhost:3000
npm run server   # API: http://localhost:4000
npm run dev:all  # frontend + API
```

## Contact API

`POST /api/contact` accepts `{ name, email, problem, interests[], budget }`.

- validates name and email
- logs the lead and emails it via SMTP when configured
- exposes `GET /api/health` and `GET /api/leads?key=ADMIN_KEY`

Frontend calls `/api/contact`, proxied by Next.js to `http://127.0.0.1:4000` by default. Set `API_URL` to change the proxy target, or `NEXT_PUBLIC_API_URL` to call a separate public API directly. Run both the frontend and API for form submissions. Without SMTP settings, the local API stores leads in memory only.

## Design Notes

Near-black `#0d0d0f`, homepage cyan `#01FBFF`, inner-page cyan `#00e5ff`, Space Grotesk headings, Inter body text, compact services grid, site-wide constellation cursor, and the scroll-forming Team OmniAI hero logo. The contact heading uses the same founder photo as the HTML export. Homepage audit buttons open the website audit modal.
