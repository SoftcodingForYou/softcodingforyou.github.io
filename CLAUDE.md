# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is David Baum's professional portfolio website hosted on GitHub Pages at `https://softcodingforyou.github.io`. It's a static website showcasing his work as a Research Engineer and Software Developer under the name **softcoding for you** (always written in lowercase; `softcodingforyou` only appears in URLs and handles).

The site is an **information page, not a contact gate**: visitors should find everything they need on the page itself. There is no contact section. The footer has GitHub and email only. David's personal LinkedIn, Twitter, Instagram and Facebook no longer exist and must not be linked. Client and organization accounts, such as Acupuntura Tung's Instagram, are fine.

### Tone of copy
Describe projects modestly and factually: what the thing is and what it does. Leave out self-praise and superlatives such as "powerful tool", "innovative", "cutting-edge", "empowering" or "smart". Prefer "a small app that…" to "a revolutionary platform for…". Keep exclamation marks out of descriptions.

## Technology Stack

### Frontend Architecture
- **Pure HTML/CSS/JavaScript** - No frameworks or build process required
- **Static Site** - Served directly from GitHub Pages
- **Responsive Design** - CSS Grid and Flexbox, breakpoints at 1024px, 768px and 480px
- **Brand identity** - softcoding for you identity kit (Bommel the mascot, green palette, Recursive font)

### File Structure
```
├── index.html              # Main page
├── 404.html                # Custom 404 (served by GitHub Pages; uses root-absolute paths)
├── styles.css              # Brand tokens, light/dark themes, layout
├── script.js               # Vanilla JavaScript for interactivity
├── favicon.ico             # Pixel-art favicon (16/32/48), from the identity kit
├── assets/brand/           # Files copied from the identity kit (mascot, app icons, badge, favicons)
├── assets/images/          # Profile photo (webp) and client project icons
└── README.md               # Project documentation
```

## Development Commands

### Local Development
- **Serve locally**: `python -m http.server 8000`, then open http://localhost:8000
- **No build process**: All files are ready for production
- The 404 page only routes on GitHub Pages. Locally, open `/404.html` directly. The plain `python -m http.server` won't serve it for unknown paths, so typo suggestions can only be tested with a server that falls back to `404.html`

### Testing
- **Themes**: Check light, dark and "system" (no saved preference). The toggle saves to localStorage
- **Mobile testing**: 390px, 768px and 1024px widths
- **Accessibility**: Keyboard navigation (the hero coin flips with Enter/Space), reduced motion, contrast

## Code Architecture & Patterns

### CSS Organization
- **Brand tokens** `--sfy-*` mirror the kit's `palette/colors.css`
- **Semantic tokens** (`--bg`, `--card`, `--text`, `--text-muted`, `--accent`, `--border`, `--tile-bg`, `--tag-bg`, ...) are what components use. Dark mode only redefines semantic tokens under `:root[data-theme="dark"]`. Never hard-code colors or add per-component dark overrides
- `data-theme` is always set before first paint by the inline script in `<head>` (saved choice, else OS preference)
- **BEM-like naming** for class names

### JavaScript Features
- **Theme system**: follows the OS until the visitor toggles, then persists the choice
- **Hero coin**: two spins on load (skipped under reduced motion). Flips to the mascot on mouse hover, tap, or Enter/Space
- **Mobile menu toggle** (accessible `<button>` with `aria-expanded`)
- **Scroll reveal** for cards and timeline items (skipped under reduced motion)
- **i18n** for nav and hero (EN/DE/FR/ES) via `data-i18n` keys in `script.js`. The language selector shows plain codes, because flag emoji don't render on Windows
- **No external dependencies** - pure vanilla JS. Smooth scrolling and the fixed-nav offset are CSS (`scroll-behavior`, `scroll-margin-top`)

### HTML Structure
- **Semantic markup** with a single `h1` (hero) and proper heading hierarchy
- **Accessibility**: ARIA labels on icon-only links, decorative icons `aria-hidden`
- **External links** use `target="_blank" rel="noopener"`

## Content Management

### Profile Information
- **Current**: Research Engineer at InteraXon Inc. (Muse), Toronto; Freelance Developer as softcoding for you
- **Former**: Co-founder & CTO of Helment, Santiago
- **Education**: PhD in Neurophysiology, Sorbonne Université (2018)
- The About timeline is intentionally undated except for the PhD year
- **Skills**: Core: Python (full stack), Flutter/Dart (full stack), MATLAB (backend). Also: React (web apps), Unity (full stack), REST APIs. No self-rated skill bars
- **Languages**: German, French, English (fluent); Spanish (proficient)

### Projects
**Flagship projects**, in this order:
1. **EazzZyLearn** - Automated targeted memory reactivation (TMR) during deep sleep. Written for sleep research, and since implemented by a company for industrial use. Tags: Python, Sleep Research, Real-time Biosignal Processing. It is real-time DSP, not AI: never tag it "AI"
2. **KA'A** - The Mesoamerican ball game as a two-player abstract strategy game, developed for Off Earth Games (React PWA)
   - Link: https://kaa.softcodingforyou.com/
3. **Securicata** - DNS-level content blocker for families
   - Link: https://securicata.app/ (`mi.securicata.app` no longer exists)
4. **NeuriGUI** - Open-source app for exploring electrophysiological signals in real time

**Smaller projects**: Mail2Cal, EyeLabyrinth, Touch Torch (premise: as little code as possible while still being a useful app), PrendeTuMente

### Additional Work
- **Acupuntura Tung** - Healthcare tech consulting
  - Google Play: https://play.google.com/store/apps/details?id=com.acupuntura.tung
  - Instagram: https://www.instagram.com/acupuntura_hoy
- **Club de Astronomía Puente Alto** (formerly Ciudad del Este; always with the accent on the í) - Community astronomy club. Icon: `assets/images/projects/club-astronomia-puente-alto.png`, the round pudú emblem cut from the club logo in `D:\Nextcloud\SoftcodingForYou\Club de Astronomía Puente Alto` without the lettering
  - WhatsApp community: https://chat.whatsapp.com/JG7glXosvffIB10JXMBkhK

## Brand Identity

### Source
The identity kit lives at `D:\Nextcloud\SoftcodingForYou\softcodingforyou-identity` (README, boards, SVG/PNG exports). Copy what the site needs into `assets/brand/`. Don't hotlink.

### The mascot's name: Bommel
The googly-eyed mascot is called **Bommel**, in every language: "Bommel, the softcoding for you mascot". Don't use the kit's old working name or its original file prefix anywhere, because they can be misread. Kit mascot files are renamed to `bommel-*.svg` when copied (e.g. `bommel-mark.svg`, `bommel-hi.svg`, `bommel-oops.svg`), and their internal `aria-label`s are updated to match.

### Principle: serious frame, soft signature
The layout, type and copy stay restrained and expert-level. Bommel, the mascot, appears **only** in these places:

| Where | Asset |
|---|---|
| Nav brand | `assets/brand/mascot/bommel-mark.svg`, with "David Baum, PhD" above the `softcoding.for(you)` code lockup in live text (`.code-lockup`) |
| Hero coin, back face | `assets/brand/mascot/bommel-hi.svg` on `--coin-back` (Cream in light mode, Forest in dark) |
| Project cards | Googly-eyed app icons `assets/brand/apps/{neurigui,mail2cal,touch-torch}.svg` |
| Footer | `assets/brand/badge/made-by-dark.svg` (the footer is always on a dark ground) |
| 404 page | `bommel-oops.svg`, **inlined** in `404.html` so its pupils can glance around (see below) |

- No mascot in About, Experience or Skills.
- Projects without a kit icon get a neutral glyph tile (`.project-icon--glyph`, a Font Awesome icon).
- Projects with an established icon of their own use it from `assets/images/projects/`: KA'A (`kaa.png`, a full-bleed square), EazzZyLearn (`eazzzylearn.png`, from the EazzZyLearn_pc repo's `assets/`) and Securicata (`securicata.png`, from `securicatajs/assets/securicata_logo.png`). Icons with a transparent background get `.project-icon--framed`, a Cream tile in both themes. Logos that bring their own outline get `.project-icon--shaped` (no corner clipping), like Securicata's leaf-shaped tile. The googly-eye rule is only for the kit's softcoding for you app icons.
- Mascot moods available in the kit: hi, hmm, busy, oops, yay, zzz. Full illustrations from ~96px up, `bommel-mark` below that.
- Icons use the kit's corner radius: 22.5% (54/240).

### Color Palette
```css
--sfy-cream: #E5F3D7;      /* grounds (light), alternate sections */
--sfy-paper: #F3F9EC;      /* page background (light), type on dark */
--sfy-mint: #87DEAB;       /* the fur, accents on dark */
--sfy-forest: #217845;     /* accents/buttons on light, coin back on dark */
--sfy-ink: #123F26;        /* text (light), page background (dark), footer */
--sfy-muted: #42684F;      /* secondary text on light */
--sfy-muted-dark: #8FB9A0; /* secondary text on dark */
```

### Typography
- **Font family**: Recursive (Google Fonts), loaded as `family=Recursive:wght,CASL,MONO@300..800,0..1,0..1`. Axes must be listed lowercase first, then uppercase alphabetically
- **Linear (CASL 0)** for all headings and body text, which keeps the site serious. Casual (CASL 1) is used only for brand marks: the `softcoding.for(you)` code lockup in the nav (kit spec: `"MONO" 1, "CASL" 1`; weight 800 for `softcoding` and `you`, 500 for `.for(` and `)`; `you` in the accent colour)
- **Mono** (`font-variation-settings: "MONO" 1`) for tags, timeline/expertise labels, project group labels and the footer
- Headings weight 700 with slight negative letter-spacing. Section headers are left-aligned `h2`s with **no eyebrow labels** above them (David finds they add no value). Don't add decorative small titles
- Browser tab title: `David Baum, PhD | softcoding.for(you)`. The hero starts directly with the `h1`, and the "PhD" lives in the nav name

### Interactive Elements
- **Buttons**: `.btn-primary` (accent fill) and `.btn-secondary` (outline)
- **Cards**: border plus a soft shadow, with a CSS-only hover lift (-3px)

## GitHub Pages Configuration

### Deployment
- **Automatic deployment** from main branch
- **Custom domain**: Can be configured via CNAME
- **HTTPS**: Automatically provided by GitHub Pages
- `404.html` at the root is served automatically for unknown paths. It is personalized by an inline script (it does not load `script.js`):
  - It shows the requested path as `GET /path → 404`.
  - It suggests the closest section or project for typos (Levenshtein match on the first path segment against a `targets` list). **Add new projects to that list.**
  - It uses the visitor's language: the main site's saved choice, else the browser's, for EN/DE/FR/ES.
  - It uses the same header as the main site.
  - The inlined `bommel-oops` pupils sit at their eye centres. `--pose` restores the "oops" look and `--r` sets how far each pupil can travel. The `pupils-search` animation runs 3 times and is disabled under reduced motion. If the mascot file changes, re-inline it the same way

### Performance Considerations
- Profile photo is a 480px WebP (~21 KB). Keep images small
- Mascot, app icons and badge are SVG
- External requests: Google Fonts (Recursive) and Font Awesome 6.4.0 (cdnjs)

## Maintenance Notes

### Content Updates
- **Projects**: Two groups. **Flagship** (`.projects-grid--flagship`, 2 columns, larger cards with 64px icons) and **Smaller projects** (`.projects-grid--small`, 4 columns, then 2, then 1, with compact cards and 40px icons). Keep the flagship count even so the 2×2 grid fills, and the smaller count a multiple of 4 (or 2) where possible. Project titles are `h4` under the `h3.subsection-label` group labels
- **Experience**: Add to the Additional Work section
- **Links**: Keep external links current. Don't add social profiles that no longer exist

### Technical Updates
- **Accessibility**: Regular testing with screen readers
- **Security**: Keep external CDN links (Font Awesome, Google Fonts) updated

## Contact Information
- **GitHub**: https://github.com/softcodingforyou
- **Email**: portfolio@davidb.addy.io
- **Professional focus**: Neuroscience, Brain-Computer Interfaces, Mobile Development
