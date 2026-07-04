# Oliva — Bar · Bites & Grill — Brandnotities

Bron: door de gebruiker aangeleverd Claude-design-systeem voor Oliva (niet strikt bindend, wel de belangrijkste referentie voor stijl/toon). Adres: **Eemplein 16c, Amersfoort**. Instagram: **@oliva_italianrestaurant**.

Personality: Premium · Rustig · Warm · Italiaans · Ambachtelijk · Gastvrij.

## Kleuren
- `--green-dark` #1E2419 (donkere pagina's)
- `--green-darker` #161B12
- `--cream` #EFEAE0 (lichte pagina's)
- `--cream-deep` #E4DDCB
- `--gold` #B89C5A / `--gold-soft` #9F8649 / `--gold-bright` #C8AD66
- `--olive-leaf` #7B8A56 / `--olive-mute` #5A6440
- Ink on dark: #EFEAE0 / #BFB59C / #7E7965 — Ink on cream: #1E2419 / #5F5A4B / #9A9485

## Typografie
- Cormorant Garamond (titels, italic body, prijzen) — Playfair Display genoemd in de oorspronkelijke README maar de daadwerkelijke token-CSS gebruikt Cormorant Garamond; gebruik Cormorant Garamond als primaire serif.
- Inter Bold voor sectielabels (uppercase, tracked 0.22em) en footer.
- Italic ampersand (`&`) is het signature-detail — gebruik `<em class="amp">&amp;</em>` in titels als "Bier & Wijn".

## Toon & stem
- Nederlands, met Italiaanse woorden waar ze natuurlijk vallen. Nooit halverwege een zin wisselen.
- Formeel "u", nooit "je".
- Bezittelijk: "onze", "ons eigen" — het huis heeft smaak.
- Geen emoji, geen uitroeptekens, geen marketing-taal. Autoriteit door soberheid.
- Menu-item ritme: `Naam` / `Beschrijving 1 / Beschrijving 2 / Beschrijving 3` (max 2 woorden per descriptor, lowercase, geen komma's).

## Layout-principes (vertaald naar web)
- Afwisseling donkergroen/crème per sectie (zoals de menupagina's afwisselen).
- Logo gecentreerd, met vage olijftak-watermark erachter.
- Sectietitels links uitgelijnd (niet gecentreerd) — signature move.
- Dunne gouden hairlines onder titels en sectielabels.
- Radius 0 overal — "dit is papier".
- Rustige motion: geen bounces, geen fades op tekst. Subtiele hover-states.

## Menukaart — geselecteerde items (echte prijzen uit de aangeleverde PDF)

### Cocktails — Signatures
- Aperol Spritz — Zomers / bitter / bubbels — € 9,00
- Limoncello Spritz — Citroen / fris / Italiaans — € 9,00

### Cocktails — Klassiekers
- Espresso Martini — Koffie / sterk / verleidelijk — € 9,95
- Oliva's Special G&T — Pink gin / granaatappel / ons eigen — € 9,50
- Mimosa — Feestelijk / fris / brunch — € 9,00
- Mojito — Fris / munt / Caribisch — € 9,00

### Bier & Wijn
- Van de tap: Alfa 0,25L — Nederlands pilsener — € 3,75
- Leffe Blond — Belgisch abdijbier / zacht — € 5,45
- La Trappe Tripel — Trappist / krachtig / goud — € 5,50
- Pinot Grigio — Appel / meloen / fris in balans — glas · fles
- Primitivo — Bosbessen / kersen / Zuid-Italië — glas · fles
- Prosecco — Fijne bubbels / feestelijk / fris — glas · fles

### Koffie
- Espresso — € 2,95 / Cappuccino — € 3,20 / Latte macchiato — € 3,70
- Special: Cannella Latte — Kaneel / warm / Italiaans — € 4,50

### Gin & Tonic
- Mediterrane G&T — Basilicum / fris / Italiaans — € 8,00
- Bombay G&T — Klassiek / gember / verfijnd — € 9,90

## Nog aan te leveren door gebruiker
- **Logo-bestanden** (PNG, licht + donker) → in `brand_assets/oliva/logo/`
- **Foto's** (interieur, gerechten: carpaccio/bittergarnituur plank, burrata pasta, pizza margherita, tomatensoep, wijn/toost, bar) → in `brand_assets/oliva/photos/`
- Volledig menu-PDF indien de site moet linken naar een downloadbare kaart
- Openingstijden (nog niet aangeleverd — nu als placeholder op de site, aanpassen zodra bekend)
- Reserveringsmethode (telefoonnummer / online reserveringssysteem)
