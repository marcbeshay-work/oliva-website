# Oliva — Bar · Bites & Grill — Website Project Rules

## Doel
Website voor **Oliva**, een Italiaans restaurant/bar in Amersfoort (Eemplein 16c). De site moet er verzorgd en branded uitzien — niet als een generieke "AI vibe-coded" pagina.

## Merk
- Volledig design systeem staat in `brand_assets/oliva/`: `colors_and_type.css` (kleuren/type tokens), `textures.css` (page-surfaces, olijftak-watermark), `BRAND_NOTES.md` (samenvatting: toon, layout-principes, echte menu-items met prijzen). Lees `BRAND_NOTES.md` eerst.
- Dit design systeem is aangeleverd als referentie, niet als keihard verplicht format — gebruik het als sterke leidraad voor kleur/typografie/toon, maar vertaal de print-menukaart-esthetiek naar een goed werkende website (secties i.p.v. A5-pagina's, etc.).
- Logo-bestanden en foto's komen in `brand_assets/oliva/logo/` en `brand_assets/oliva/photos/` zodra de gebruiker ze aanlevert — tot die tijd nette, gelabelde placeholders gebruiken die er niet lelijk uitzien, en makkelijk te vervangen zijn.
- Toon: Nederlands met Italiaanse seasoning, formeel "u", geen emoji/uitroeptekens, ingetogen zelfverzekerd. Menu-items in het "Naam / descriptor / descriptor / descriptor" ritme.

## Design-kwaliteit
- Geen kaal/standaard AI-scaffold. Gebruik een doordachte lay-out, echte typografieschaal, passende spacing/contrast en subtiele, functionele animatie (bijv. fade-ins, hover states) — geen overdreven effecten.
- Denk aan restaurant-specifieke onderdelen: hero met sfeerbeeld, menukaart-sectie, openingstijden, locatie/kaart, reserveren-CTA, foto's van gerechten, testimonials/reviews.

## Screenshot-workflow
- Gebruik een headless browser (Puppeteer/Playwright) om de lokale site te screenshotten en te controleren tijdens het bouwen. Sla screenshots op in `temporary_screenshots/` (niet in de repo committen).
- **Uitzondering:** schakel de screenshot-vergelijking UIT voor geanimeerde/dynamische elementen (bewegende achtergronden, canvas-animaties). Werk die gewoon in code af en laat de gebruiker visueel controleren.

## Inspiratie / kloon-referenties
- Als de gebruiker een referentiesite aanlevert (screenshot + gekopieerde stijl uit devtools, of een link), gebruik die als stijlbasis en werk daarna de eigen merkassets (logo, kleuren, teksten) erin.

## Lokaal testen vs. deployen
- Werk altijd eerst lokaal (localhost) en laat de gebruiker het resultaat bekijken.
- **Commit/push pas naar GitHub als de gebruiker dat expliciet vraagt** (bijv. "push dit" of "dit ziet er goed uit, deploy het"). Nooit automatisch pushen.

## Techstack
- Simpele statische site (HTML/CSS/JS) tenzij de gebruiker om een framework vraagt (bv. Next.js). Houd het licht en snel.
