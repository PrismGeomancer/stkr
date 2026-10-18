# STICKER

Memes stick together. STICKER is a hand-drawn sticker studio: upload a meme, remove the background, style it, and publish it to the gallery with your creator ID. Explore, collections, remix attribution, creator profiles and spread-to-earn reward tracking are built in.

## Run

Requires Node.js 22+.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173. For production:

```sh
npm run build
npm run preview
```

The root `index.html` is the Vite entry template and loads TypeScript that must be compiled first, so open the site through `npm run dev` / `npm run preview` (or any static server pointed at `dist/`), not by double-clicking a file. No API keys, server, RPC endpoint, or environment variables are required. HTTPS or localhost is needed for wallet discovery and clipboard features.

## GitHub Pages

Push the complete project, including `.github/workflows/deploy-pages.yml`. In the repository, select **Settings → Pages → Build and deployment → Source: GitHub Actions**. Every push to `main` or `master` (or a manual run from Actions) installs dependencies, builds the app, and deploys `dist/`. Do not choose **Deploy from a branch**: that serves the uncompiled root `index.html`.

Builds use relative asset paths, so the site works at `https://username.github.io/REPOSITORY/`, on a custom domain, or after renaming the repository with no path edits. To pin an explicit base path:

```sh
STICKER_BASE_PATH=/STICKER/ npm run build
STICKER_BASE_PATH=/STICKER/ npm run preview
# Open http://127.0.0.1:4173/STICKER/
STICKER_TEST_URL=http://127.0.0.1:4173/STICKER/ npm test
```

## Features

- Upload and drag/drop PNG, JPEG, WEBP up to 10 MB; five one-click examples.
- 640 × 640 canvas composition with text, text colors/size, seven outline colors, outline thickness, border toggle, padding, scale, rotation, fit/fill crop, drag repositioning, and transparent/pastel backgrounds.
- Smart edge cleanup removes edge-connected solid backgrounds while preserving enclosed subject colors. **AI cutout** handles complex backgrounds.
- AI cutout uses lazy-loaded `@imgly/background-removal` (ISNet quantized) with ONNX in a Web Worker. First use downloads the model from IMG.LY's asset CDN; image pixels are never uploaded. If the model can't load, the editor keeps working with a clear message.
- PNG downloads for gallery and user-created stickers at 0.005 SOL each, with the first two free per connected wallet.
- Create drafts, publish with a unique Sticker ID, description and tags, attributed to your connected wallet or creator ID. Delete your own stickers from their detail view.
- Explore tabs, search/category filter, save/unsave, Saved collection, My Stickers, sticker details, copy, Web Share/clipboard/manual fallback, and remix ancestry.
- Live activity feed with relative timestamps.
- Wallet Standard discovers installed Solana wallets, with Phantom's injected provider as a fallback. Connect, account change, silent trusted reconnect, rejection, missing wallet and disconnect are handled. STICKER never asks for a seed phrase, signs transactions, or transfers SOL.
- Responsive from 320px to desktop; day/night theme (follows the system on first visit), keyboard-accessible dialogs, focus management, reduced motion.

## Data

`src/data.ts` holds the curated gallery: stickers, creators, metrics and activity. `src/storage.ts` persists user stickers, drafts, publications, saves, metric changes and activity in IndexedDB, and small preferences (creator ID, theme, selected wallet, free-download count per wallet address) through safe `readPref`/`writePref` helpers that never throw when storage is blocked. Wallet addresses always come from the wallet provider and are re-authorized on refresh.

## Downloads and rewards

`src/payments.ts` owns the price and the two-free-downloads policy; gallery cards, sticker details and editor exports share the same gate. Guests can create stickers but connect a wallet to download. A successful export consumes one free download; dismissing the dialog does not.

`src/rewards.ts` defines `DistributionRewardEngine` and `rewardEngine`: each download advances reward progress, and every 100 downloads unlocks 0.5 SOL for the creator. Counters originate in the client, so any real payout or paid entitlement must be verified by a trusted backend before settlement.

Spread Score = downloads + 3 × shares + 2 × saves + 5 × remixes.

## Verification

Start the dev server, then:

```sh
npx playwright install chromium
npm test
node scripts/preview-audit.mjs
```

The end-to-end suite validates real PNG bytes, all 24 downloads, canvas editing, uploads/drop, persistence, publishing, filters, collections, details, share/copy, remix ancestry, reward thresholds, wallet provider states, navigation, themes, widths, pricing display, wallet-required downloads and the free-download allowance. Wallet tests use provider fixtures in the test browser; final extension approval needs a real installed wallet. Screenshots are saved in `.test-artifacts/` (ignored).

## Assets, source and licensing

The first 12 stickers are high-resolution transparent PNGs; the other 12 are original SVG illustrations from `scripts/generate-assets.mjs`. The prompt set for the PNGs is in `public/stickers/hd-asset-prompts.json`. The logo is served from `public/branding/logo.png`. Headlines use self-hosted Mochiy Pop One (SIL Open Font License); UI text uses Schoolbell (Apache 2.0). Their licenses are in `licenses/`. Background-removal code is licensed under AGPL-3.0; the corresponding source and license are supplied through the footer's downloadable source archive. Run `python3 scripts/package-source.py` after source changes, before building (the Pages workflow does this automatically). See `LICENSE.md` and `THIRD_PARTY_NOTICES.md`.
