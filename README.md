# Special Delivery — playable portfolio

A tiny Three.js island where you play the courier: collect six letters from the red
mailbox and deliver them to the residents. Each letter opens one of Kingshuk Dholakia's
projects; delivering all six unlocks a final envelope addressed to the visitor.

## Run it
Any static server works (module imports + GLTF fetches don't run from `file://`):

    python3 -m http.server 8000
    # then open http://localhost:8000

## Deploy to GitHub Pages
Served as a root user site at `https://kingshukd7.github.io`. Push this folder's
contents (with `index.html` at the repo root) to a repo named exactly
`kingshukd7.github.io`, then enable Pages (Settings → Pages → Deploy from a branch →
`main` / root). No build step — everything is static and fetched over https.

## Structure
- `index.html` — UI shell (title, HUD, dialogue, letter overlays), importmap
- `js/main.js` — world, characters, deliveries, audio, game loop
- `assets/models/` — bespoke low-poly models built in Blender for this project (+ a few Kenney CC0 rocks)
- `vendor/` — Three.js r160 + GLTFLoader + bloom post-processing (vendored, no CDN)

## Swap in real links
Search `js/main.js` for `GH` — itch.io links for Spectrum Ops / Dungeon Golf currently
point at the GitHub profile; replace with direct URLs when ready.

## Live environment
The sky, sun, lighting and lanterns follow the visitor's real local time. On start the
site asks Open-Meteo (no key) for local weather — via browser geolocation if granted,
IP lookup otherwise — and renders rain, snow, fog, overcast skies or storms to match.

## Credits
3D models by Kenney (kenney.nl) — CC0. Everything else hand-written.
