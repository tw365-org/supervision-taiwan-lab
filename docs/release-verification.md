# 正式發布驗收 / Production release verification

## Release identity

- Date: 2026-10-27.
- Brand: **AI 模擬視覺實驗室 / AI Simulation Vision Lab**.
- Public site: https://supervision-taiwan-lab.tw365ai.workers.dev
- Public source: https://github.com/tw365-org/supervision-taiwan-lab (public, `main`).
- Cloudflare Worker: `supervision-taiwan-lab`, Workers Static Assets, `dist/`, SPA fallback, no custom API/backend.
- Wrangler: `4.153.0`; deployed version: **`4b3877cb-e938-4aab-a996-592586dac653`**.
- Production assets: `index-mjTu65IZ.js`, `index-DgOp8AJX.css`, `index.html`, preserved `favicon.svg`.

This release replaces the previous three-scene-only interactive lab with **all 20 use cases in section 01**. The three recommended tabs remain shortcuts; a labeled native selector exposes every application. It also applies the requested new original-site brand, without renaming the repository/domain or upstream Supervision project.

Frontend declared READY after its final `npm run build`, `npm run typecheck` and `npm audit --json` passed (audit: zero vulnerabilities). Its local verification is recorded in [app-design.md](app-design.md). Release reused those final artifacts rather than rebuilding concurrently. The production checks below were performed independently after deployment, not inferred from frontend reports.

## Exercised deployment

```sh
npx --yes wrangler@4.153.0 whoami
npx --yes wrangler@4.153.0 deploy --dry-run
npx --yes wrangler@4.153.0 deploy
```

All exited 0. Cached local OAuth authenticated successfully. Dry-run read six asset-directory entries and found no bindings. Deployment uploaded three changed assets; the favicon was already present. Wrangler returned the production URL and version above. No OAuth file, credential or token was copied into source or GitHub Actions.

## Independent production browser matrix

Real Chromium **156.0.8078.48** on Windows, against public HTTPS. Desktop **1440 × 1000**, mobile **390 × 844** CSS pixels. Screenshots of mobile Chinese fruit grading, mobile English branding and desktop English helmet inspection were captured and visually inspected.

- **240 state checks:** 20 selectable applications × three scene-specific states × two locales × two viewports. Recorded primary/secondary readings and checked document width in each combination. No horizontal page overflow.
- **80 control checks:** all 20 × two locales × two viewports. Keyboard Home/End reached each rule control's actual min/max. Turning analysis off showed `—` as the primary numeric reading for every case; it was re-enabled before observing scene readings.
- **40 detail-navigation checks:** all 20 × two locales. Clicking the introduction link opened the matching `case-N` and moved focus to its summary (waited for focus, not just the click).
- Accessible native selector, labeled scenario/rule/frame controls, SVG image labels, tabs and status were present in the real browser accessibility observation. This is not an accessibility certification.
- No stale `台灣視覺實驗室` or `Taiwan Vision Lab` in rendered body/title across the 80 case/locale/viewport observations. Titles recorded during that previous release used the then-current Chinese spacing; the current exact Chinese title is `AI 模擬視覺實驗室｜Supervision 應用概念`, and the unchanged English title is `AI Simulation Vision Lab | Supervision concepts`. See the spacing-only release evidence below for the current browser check.
- English persisted across direct `/concepts#lab` navigation and reload; 20 options remained. Chinese persisted after switching back and reloading (`html.lang` and `vision-lab-locale` both `zh-TW`). `/concepts` is a deliberate SPA fallback probe, not another authored page.
- Playback advanced to step 2 and paused. Reset returned step 0; manual advance returned step 1. Keyboard frame End reached step 11 for temporal checks.
- Browser console entries and uncaught page errors were empty after the exercised interactions and reloads.

An initial long automation run exceeded the tab runner's default 30-second execution deadline; it was rerun with an explicit longer deadline. An early toggle probe began with analysis already disabled; the final matrix explicitly enabled analysis before recording each scene, then verified the disabled em dash. These were harness-state corrections, not hidden application failures.

## All 20 are meaningful domain demonstrations

Observed in both languages and viewports; the examples below quote English desktop readings. They are synthetic observations, not model results. Rule controls can select a target, direction or event type as well as a numeric threshold. Equal readings in some states do not imply identical semantics: temporal cases must be advanced, while static inspection samples intentionally do not invent changing counts on every scrub.

| # / application | Domain-specific scene, control and observed distinction |
| --- | --- |
| 01 Scooter parking | Twelve bays, free/occupied/occluded states; low-availability threshold. Initial 4 confirmed free; full state 0; occluded state 2 unresolved, not falsely free. At step 11, threshold 0 vs 6 changed no-alert to advisory with 1 free bay. |
| 02 Intersection turns | Entry and left/straight/right exits, tracked movement paths; selected movement control, completed-event count and tracked segments, not current occupancy. Three states illustrate left, straight and right/return paths. |
| 03 Loading overstay | Private loading bay and dwell timeline; seconds threshold. Continuous state reached 60 seconds at step 11; exit/re-entry state recorded 2 distinct dwell episodes. Exit resets continuous dwell. |
| 04 Bus waiting areas | Two platform zones and crossing line; selected-zone control. At peak step 11, selecting zone 1 vs 2 changed occupants 5 → 3; crossing events are separately labeled, not waiting time. |
| 05 Night-market routing | Two aisles and accumulated position samples; diversion threshold. Initial peak occupancy 6 versus ordinary 2; samples are person-frames, not unique visitors or calibrated density. Step-11 threshold endpoints changed advisory state. |
| 06 Temple/event gates | Two gates with directional histories; selected gate control. Cross/return at step 11 produced 1 inbound and 1 outbound event, not attendance. |
| 07 Tea/breakfast queue | Counter, queue and excluded pickup area; count threshold. Ordinary/peak/pickup states showed 3/6/2 queue occupants; front-person dwell is explicitly not service time. Step-11 threshold 2 vs 8 changed advisory to no alert. |
| 08 Shelf gaps | Fixed shelf facings, explicit empty and unknown areas; restock threshold. Ordinary 0 empty; gap state 2; occlusion state 1 visible empty plus 2 unresolved, not POS stock. Threshold endpoints changed advisory state. |
| 09 Bento omissions | Four fixed-menu compartments; all/selected compartment control. Full/missing/occluded states showed 0/1/2 confirmed omissions; visible dishes 4/3/1. At step 11, all-compartments vs compartment 4 changed confirmed omissions 1 → 0. |
| 10 Recycling | Paper/container bins, overflow, mis-sort and closed-lid unknown; review-event selector. Mis-sort/closed state recorded 1 matching site and 1 unknown interior. No inferred hidden fill rate. |
| 11 Helmet/zone review | Heads, worn/held helmets and restricted zone; review-event selector. Correctly worn state paired 2 helmets; held helmet state paired only 1 and raised a review event. Not a mere helmet-object count or automated compliance decision. |
| 12 Forklift crossing | Separate person/vehicle routes and shared zone; co-presence persistence control. Separated state 0 objects in zone; shared state 2 with continuous co-presence. Not collision prediction or a safety interlock. |
| 13 Factory defects | Fixed workpiece, scratch/chip/glare and slice windows; minimum schematic defect extent. Normal 0; scratch 18 schematic pixels; chip 24. At step 11, rule 2 vs 30 changed reviewable defects 1 → 0. |
| 14 Pallet movements | Warehouse/loading-door line and pallet path; direction selector. Outbound state at step 11 changed selected count 0 → 1 when direction changed. The pause-before-line/return state remained 0 in both directions. No stock or SKU inference. |
| 15 Care controlled exit | Corridor, approach zone and controlled door; permitted-period control. Approach state at step 11 showed 1 event outside permitted hours, changing to 0 when passage permitted. Dwell is separately labeled; no identity/health inference. |
| 16 Swimming lanes | Three lanes, visible swimmers and illustrated submerged/glare exclusions; lane selector. Busy step 11 changed visible count 3 → 5 between lanes; visibility edge state separately reported 1 invisible swimmer, excluded from visible count. Not drowning detection. |
| 17 Sticky traps | Target/non-target insects, dirt/overlap and slice windows; minimum body size. Dense sample at step 11 changed accepted targets 12 → 0 with size control endpoints. Excluded candidates separately counted; no pesticide prescription. |
| 18 Fruit grading | Four fruit with explicit visible blemish percentages; tolerance control. Normal largest 2%; blemished 22%; edge sample 28%. At step 11, tolerance 0 vs 30 changed review fruit 4 → 0; unseen back/internal quality not inferred. |
| 19 Feed residue | Fixed observation window, pellets and visibility mask; review threshold. Sparse/accumulating start 6/4 pellets; accumulating reached 15 at step 11. Turbid/glare state returned `—`, not an invented underwater estimate. |
| 20 River/harbor waste | Two water zones, debris area, leaves/foam exclusions; cleanup-zone selector. Accumulation step 11 changed selected visible waste area 1386 → 2034 schematic units; 3 non-waste candidates excluded. Not waste weight or water quality. |

## Preserved favicon: loadable and actually selected

1. Live HTML explicitly declares `rel="icon"`, `type="image/svg+xml"`, `href="/favicon.svg"`.
2. Browser fetch returned **200**, `Content-Type: image/svg+xml`; browser `Image.decode()` succeeded with **150 × 150** natural dimensions.
3. Opened Chrome's own `chrome://favicon2/?size=32&scaleFactor=1x&pageUrl=https%3A%2F%2Fsupervision-taiwan-lab.tw365ai.workers.dev%2F` service. Its selected image decoded at **32 × 32**.
4. Canvas inspection found the intended preserved SVG brand colors: **801** opaque pixels at RGB 20,47,61 (`#142f3d`), **96** at 168,236,226 (`#a8ece2`), **20** at 241,187,99 (`#f1bb63`). This proves actual browser adoption rather than only an HTML declaration or generic fallback.

The current browser request-log query did not retain a separate autonomous favicon request; no new autonomous-network observation is claimed. The decoded live icon plus matching Chrome-selected favicon cache provide the current acceptance evidence.

## Production security response headers

Browser fetch of live `/concepts` returned HTTP 200 with:

```text
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: DENY
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

No camera, microphone, geolocation or inference backend is needed. These are baseline headers, not a security certification.

## GitHub release and CI policy

The source repository remains public. `.github/workflows/site.yml` builds on push and pull requests. Deployment is opt-in through manual workflow dispatch on `main`, requiring separately configured `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets. Local Wrangler OAuth is not installed in CI; no CI token was created for this release. The public GitHub description now uses the new brand; repository and domain names are unchanged.

Release source commit **`86e2e1258c11501155e892c7283dd290b03ee07d`** was pushed to public `main`. GitHub Actions run [40483330991](https://github.com/tw365-org/supervision-taiwan-lab/actions/runs/40483330991) **passed**, independently observed with `gh run watch --exit-status`: `npm ci`, `npm run build` and `site-dist` upload succeeded; the build job took 12 seconds and deployment was correctly skipped on push. Nonblocking annotations noted v4 actions' Node 20 runtime migration to Node 24 and the ubuntu-latest image migration. They were runner notices, not application failures.

## Spacing-only brand correction — 2026-10-27

This follow-on release changes only the current original-site Chinese brand to **AI 模擬視覺實驗室**. The exact document title is **AI 模擬視覺實驗室｜Supervision 應用概念**. English copy, repository/domain identifiers, upstream attribution, original research, scene implementations, CSS and the existing favicon are unchanged. `NOTICE` contains only the unchanged English site name, so required no edit. The public GitHub repository description received the same Chinese spacing correction.

- `npm run build` and `npm run typecheck` both exited 0. Vite emitted `index-CcNiZhqm.js` and the unchanged `index-DgOp8AJX.css`.
- `npx --yes wrangler@4.153.0 deploy` exited 0 using cached local OAuth. It uploaded only `index.html` and `assets/index-CcNiZhqm.js`; the remaining assets were already uploaded. Deployed Worker version: **`5ac1f221-11f6-4ae9-b2ac-b011011f4845`** at https://supervision-taiwan-lab.tw365ai.workers.dev.
- Real Chromium checked the deployed HTTPS page at **390 × 844** CSS pixels. The exact Chinese title and visible header used the corrected spacing. A screenshot was captured and visually inspected: no header overlap. The brand-link rectangle was x=20, y=21, width=137.78125, height=29.984375; the language button began at x=319.5625. Document scroll width equaled the 390px viewport.
- Rendered body plus title contained no unspaced Chinese brand in either locale. English retained `AI Simulation Vision Lab | Supervision concepts`; switching back to Chinese and reloading retained the exact corrected Chinese title. The application selector still exposed 20 options; no scene redesign or full scene-matrix rerun was part of this mechanical release. The browser reported no uncaught page errors.
- The explicit existing `<link rel="icon" type="image/svg+xml" href="/favicon.svg">` remains. Browser fetch returned **200**, `image/svg+xml`; image decoding succeeded at **150 × 150**. Chromium's `chrome://favicon2/` cache for the live site returned a complete **32 × 32** image, whose screenshot visibly showed the intended preserved teal lab icon, confirming browser adoption rather than just an HTML declaration.
- The prior release's broader matrix and GitHub Actions evidence above are historical; only the checks listed here were re-exercised for this spacing correction. Commit/push and the new push-triggered CI result are reported with the delivery.

## Boundaries / 驗收邊界

以上為 mock 網站發布及互動驗收，不是模型準確率、真實鏡頭、全瀏覽器／實體手機矩陣、無障礙認證、法律合規或市場成效驗證。所有物件、數字及告警皆為前端合成資料；沒有執行 Supervision Python、上傳影像或推論。20 項皆保留待驗證假設及逐項限制。上游 Supervision 名稱、固定研究基準、MIT 授權與 Roboflow 原始著作權維持原樣；原始計畫不因品牌更名而改寫。No field/model/customer validation is implied by a successful website release.
