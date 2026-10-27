# 正式發布驗收 / Production release verification

## Release identity

- Date: 2026-10-27 (production browser responses observed around 09:04–09:09 UTC).
- Public site: https://supervision-taiwan-lab.tw365ai.workers.dev
- Public source: https://github.com/tw365-org/supervision-taiwan-lab
- Cloudflare Worker: `supervision-taiwan-lab`, Workers Static Assets, `dist/`, SPA fallback, no custom API/backend.
- Wrangler: `4.153.0`.
- Deployed version: `64cb08a8-2d37-4289-8907-f7352eb0c79c`.
- Production assets: `index-CfriC2Rs.js`, `index-xkH8Om2o.css`, `index.html`, `favicon.svg`.

Frontend explicitly declared its edits complete before deployment. Its final `npm run build`, `npm run typecheck` and `npm audit --json` exited 0; local evidence is separately documented in [app-design.md](app-design.md). Release did not claim a second build: it deployed those completed build artifacts.

## Exercised deployment commands

```sh
npx --yes wrangler@4.153.0 deploy --dry-run
npx --yes wrangler@4.153.0 deploy
```

Both exited 0. Dry-run read six asset-directory entries and found no bindings. Production deployment uploaded four static assets and returned the live URL and version above. Local cached OAuth was used; no credentials were committed or copied to GitHub Actions.

## Real production browser acceptance

Exercised in real Chromium `156.0.8078.48` on Windows, against the public HTTPS URL, not a local preview. Desktop viewport: 1440 × 1000 CSS pixels. Mobile viewport: 390 × 844 CSS pixels. Browser screenshots were also captured and visually inspected for desktop/mobile layout.

| Check | Actual observation |
| --- | --- |
| Initial locale | Fresh production origin opened with `html.lang = zh-TW`; `vision-lab-locale = zh-TW`. |
| English persistence | Clicked language button, reloaded; `html.lang = en`, stored value `en`, title `Taiwan Vision Lab \| Supervision concepts`. |
| Traditional Chinese persistence | Switched back and reloaded; `html.lang = zh-TW`, stored value `zh-TW`. |
| Queue scene | Busy state: reading 6 people; advisory reports queue threshold met. Keyboard End on threshold changes value to 8; status becomes no alert. |
| Parking scene | Busy state: 0 visible free bays; advisory reports no visible bays available. |
| Forklift scene | Busy state: 2 co-present objects with advisory; ordinary state: 0 in shared zone and no alert. Disabling rules changes reading to an em dash and status to disabled, not a false safety guarantee. |
| Keyboard navigation | Focused queue tab and pressed End; selected tab and focused element both become `tab-forklift`. |
| Playback | Reset gave step 00, clicked play, observed advance to step 02, clicked pause; play button `aria-pressed = false`. |
| Mobile overflow | All three scenes in both languages: `window.innerWidth = 390`, `document.documentElement.scrollWidth = 390`. No horizontal page overflow in those six cases. |
| Desktop overflow | Width and document scroll width both 1440. |
| Direct navigation / refresh | Loaded `/concepts#lab` directly and reloaded: document HTTP 200, app rendered with one scene panel and 20 application details; English preference survived. `/concepts` is a deliberate SPA fallback test, not a separately authored content page. |
| Runtime diagnostics | Production browser console entries `[]`; uncaught page errors `[]` after locale/scene/navigation/playback exercises. |

## Favicon: declared, loadable, and actually selected by Chrome

This check did not rely on `Page.getAppManifest` or only inspect HTML.

1. The live document declares `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`, resolving to https://supervision-taiwan-lab.tw365ai.workers.dev/favicon.svg.
2. On first page load, **before the explicit fetch/image probes**, the browser autonomously requested this URL as resource type `other`, returning HTTP **200** with `Content-Type: image/svg+xml`. This is the browser's favicon request, distinct from subsequent scripted `fetch` and `Image` requests (which revalidated with 304).
3. Browser fetch of the URL returned 200 and an SVG document; a browser `Image` loaded successfully with nonzero natural dimensions (150 × 150 for this viewBox-only SVG).
4. Opened Chrome's own favicon cache service at `chrome://favicon2/?size=32&scaleFactor=1x&pageUrl=https%3A%2F%2Fsupervision-taiwan-lab.tw365ai.workers.dev%2F`. It returned a complete **32 × 32** image for this production page.
5. Canvas inspection of that browser-selected cached image found the intended site's exact brand colors: RGB **20,47,61** (`#142f3d`, 798 opaque pixels), **168,236,226** (`#a8ece2`, 96 opaque pixels), and **241,187,99** (`#f1bb63`, 20 opaque pixels). These match the deployed SVG background, viewfinder stroke and center mark, rather than Chrome's generic fallback icon.

Together, the explicit declaration, autonomous favicon request, successful image load and Chrome's matching selected favicon cache establish actual browser adoption of the intended original site icon.

## Production security response headers

Observed on live root HTML, `/concepts` SPA fallback, JS and CSS responses:

```text
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: DENY
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

HTML, JS and CSS loaded successfully with correct content types. No camera, microphone, geolocation or inference backend is needed by the mock site. These headers are useful baseline controls, not a security certification.

## GitHub release and CI policy

The source repository is public. `.github/workflows/site.yml` builds on push and pull requests. Deployment from CI is opt-in through manual workflow dispatch on `main` and requires separately configured `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets. Local Wrangler OAuth is not installed in CI. No CI deployment token was created for this release.

GitHub workflow outcome is checked after the source push and reported in the release hand-off; this document records the deployed site acceptance independently of that subsequent source-publication check.

## Boundaries / 驗收邊界

以上是 mock 網站的實際發布與瀏覽器驗收，不是模型準確率、真實鏡頭、全瀏覽器／實體手機矩陣、無障礙認證、法律合規或市場成效驗證。所有視覺物件、數字與告警仍為合成示意資料；網站沒有執行 Supervision Python，也沒有現場影像上傳或推論。No field/model/customer validation is implied by a successful website release.
