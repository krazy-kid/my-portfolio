# Prem Singh — Portfolio

A premium, production-ready personal portfolio for **Prem Singh**, Frontend Engineer & Conversion Rate Optimization Specialist. Built as a fully static site — no build step required.

> Design language inspired by Apple, Linear, Vercel and Stripe: dark glassmorphism, floating gradient blobs, glow accents and buttery micro-interactions.

## ✨ Features

- **Fully static** — open `index.html` or deploy to GitHub Pages / Netlify / any static host.
- **Dark / Light theme** with system preference detection and `localStorage` persistence.
- **Custom animated cursor** (dot + trailing ring) with a pointer spotlight.
- **Canvas particle constellation** background with mouse repulsion.
- **Animated gradient blobs**, grid overlay and glow effects.
- **GSAP + ScrollTrigger** reveal animations and parallax.
- **AOS** scroll animations, **Typed.js** hero typing effect.
- **Magnetic buttons** and **3D tilt** cards.
- **Animated counters**, scroll progress bar, back-to-top, loading screen.
- **Sticky animated navbar** with active-section highlighting and mobile menu.
- **Accessible & semantic** markup, respects `prefers-reduced-motion`.
- **SEO ready**: meta tags, Open Graph, Twitter cards, JSON-LD structured data, `sitemap.xml`, `robots.txt`, favicon.
- **Fully responsive** — desktop, laptop, tablet and mobile.

## 🧰 Tech Stack

HTML5 · Tailwind CSS (Play CDN) · Vanilla JavaScript · GSAP · AOS · Font Awesome · Typed.js · Google Fonts (Space Grotesk + Inter).

No React. No Next.js. No Bootstrap. No bundler.

## 📁 Structure

```
portfolio/
├── index.html
├── assets/
│   ├── css/
│   │   ├── style.css          # tokens, base, layout & components
│   │   ├── responsive.css     # breakpoints
│   │   └── animations.css     # keyframes, blobs, effects
│   ├── js/
│   │   ├── main.js            # core interactions
│   │   ├── cursor.js          # custom cursor + spotlight
│   │   ├── particles.js       # canvas particle field
│   │   ├── animations.js      # GSAP, tilt, magnetic
│   │   └── typing.js          # Typed.js hero animation
│   ├── images/                # hero + project + OG SVGs
│   ├── icons/                 # custom SVG icons
│   ├── favicon.svg
│   └── resume.pdf
├── robots.txt
├── sitemap.xml
└── README.md
```

## 🚀 Getting Started

Because everything is static, there is nothing to install.

**Option 1 — Just open it**

```bash
# open the file directly in your browser
start index.html      # Windows
open index.html       # macOS
```

**Option 2 — Local server (recommended for correct paths)**

```bash
# Python
python -m http.server 5173

# Node (npx)
npx serve .
```

Then visit `http://localhost:5173`.

## 🌐 Deploy to GitHub Pages

1. Push the `portfolio/` contents to a repository.
2. In **Settings → Pages**, choose the `main` branch and `/root`.
3. Your site goes live at `https://<username>.github.io/<repo>/`.

> Update the absolute URLs in `index.html` (canonical, Open Graph), `sitemap.xml` and `robots.txt` to match your final domain.

## 🎨 Customization

- **Colors / fonts**: edit the CSS variables in `assets/css/style.css` (`:root`) and the Tailwind config inside `index.html`.
- **Content**: all copy lives in `index.html`.
- **Typing phrases**: `assets/js/typing.js`.
- **Resume**: replace `assets/resume.pdf`.

## ⚡ Performance & Accessibility

- Lazy-loaded, lightweight SVG imagery.
- Semantic HTML5 landmarks and ARIA labels.
- Keyboard-focusable interactive elements with visible focus rings.
- Motion disabled automatically for users who prefer reduced motion.
- Targets 95+ Lighthouse scores across categories.

## 📫 Contact

- Email: [premsingh.ps49@gmail.com](mailto:premsingh.ps49@gmail.com)
- LinkedIn: [in/premsingh98](https://linkedin.com/in/premsingh98)
- Location: Maharashtra, India

---

© Prem Singh. Crafted with care.
