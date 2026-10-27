# Supervision Taiwan Lab · 台灣視覺應用實驗室

繁體中文 / [English](#english)

以台灣場域為出發點的互動式電腦視覺概念網站：從研究計畫中的 20 個應用假設，探索機車停車、排隊與人車交會等決策情境。這是**獨立製作的 mock 概念展示**，不是已上線的監控產品，也不是 Roboflow 官方網站。

- 正式展示 / Live demo：[supervision-taiwan-lab.tw365ai.workers.dev](https://supervision-taiwan-lab.tw365ai.workers.dev)
- 正式發布驗收 / Production verification：[`docs/release-verification.md`](docs/release-verification.md)
- 網站原始碼：[tw365-org/supervision-taiwan-lab](https://github.com/tw365-org/supervision-taiwan-lab)
- 原始 Python 專案：[Roboflow / Supervision](https://github.com/roboflow/supervision)
- 固定研究基準：[Supervision 0.31.2](https://github.com/roboflow/supervision/tree/0.31.2)，MIT、Python >= 3.10
- 原始計畫：[`SUPERVISION_台灣應用_PLAN.md`](SUPERVISION_台灣應用_PLAN.md)（保留為研究來源；其中原本「不建立網站」的研究階段限制，不代表本次另行製作概念網站的交付範圍）

## 展示與真實能力的界線

畫面中的物件、數字、事件與互動皆為前端合成的示意資料，不是模型辨識結果、現場測試、串流、真實告警或已驗證效益。本網站**沒有在瀏覽器執行 Supervision**，也沒有 Python 推論後端、模型權重、攝影機接入、人臉／車牌識別、通知服務或影像上傳。

Supervision 是模型無關的 Python 工具箱，將**外部模型**輸出轉換、標註與統計；不會自行辨識所有台灣場景。實際產品需要：

```text
合法授權影像 → 外部偵測／分割模型 → sv.Detections
  → 按需外接追蹤器 → 區域／越線／應用自訂事件 → 人工複核與決策
```

`PolygonZone` 區域占用不等於累積獨立人數；`LineZone` 需要追蹤 ID，計算越線事件而非現場人數。0.31.2 已不提供 `sv.ByteTrack`，追蹤須外接，例如 `trackers.ByteTrackTracker`。熱圖不是精確人流密度或停留時間；模糊標註只處理傳入的偵測框，不代表完整匿名化。排隊時間與連續停留需要額外進出狀態邏輯。

20 個點子及優先順序都是 **[INFERENCE] 待驗證假設**。實際落地須取得適用影像與分析權限，確認遮擋、取像角度、模型授權與資料保存／個資措施，再以人工標記對照。人車交會示意不是碰撞預測或安全聯鎖；不可取代職安、救生、照護或其他專業判斷。未做模型實測、現場取像或市場訪談。

## 本機開發

使用 Node.js 22 LTS 與 npm，先 clone 此 repository：

```sh
npm ci
npm run dev
```

開啟 Vite 顯示的本機網址。正式建置與本機預覽：

```sh
npm run build
npm run preview
```

`npm run build` 產生 `dist/`；請勿將 `node_modules/`、`dist/`、憑證或 `.env` 提交到 Git。

## 架構與雙語規劃

- React + TypeScript + Vite，純靜態前端，無自訂後端或資料庫。
- `src/`：介面、情境資料與 mock 互動；`public/`：網站圖示與靜態資源。
- `src/locales/zh-TW.ts`、`src/locales/en.ts`：繁體中文與英文內容；預設 `zh-TW`，語言偏好儲存在本機 `localStorage` 的 `vision-lab-locale`。
- 兩種語言共用情境 ID、互動與資料結構；新增情境或文案時同步更新兩份語系，保留 API 識別字與來源連結，不把技術名詞翻成不存在的 API。
- 語系切換是單一網站中的介面切換，並非獨立語言網域、獨立索引路徑或已完成的多語 SEO 架構。
- `wrangler.jsonc`：Cloudflare Workers Static Assets，輸出 `dist/`，SPA fallback；沒有 Worker API。
- `.github/workflows/site.yml`：push / PR 建置檢查與人工觸發的選擇性部署。
- `public/_headers`：靜態回應安全標頭；部署後仍須確認實際回應。

## Cloudflare 發布

部署到 Cloudflare Workers Static Assets，不需要 Python、伺服器、資料庫或模型服務。以下操作會公開發布網站，請在自己的 Cloudflare 帳號執行：

```sh
npm ci
npm run build
npx --yes wrangler@4.153.0 login
npx --yes wrangler@4.153.0 whoami
npx --yes wrangler@4.153.0 deploy --dry-run
npx --yes wrangler@4.153.0 deploy
```

已登入的環境可以略過 `login`。發布目標名稱為 `supervision-taiwan-lab`；最終 URL 以 Wrangler 成功輸出為準，不把預期網域當成已部署網址。使用其他帳號／fork 時可調整 `wrangler.jsonc` 的 `name`，多帳號環境請設定 `CLOUDFLARE_ACCOUNT_ID`。不要提交 Wrangler 本機 OAuth 設定、API token 或帳號登入資訊。

GitHub Actions 預設**只建置，不自動部署**。若要在 GitHub 部署，先在 repository secrets 設定 `CLOUDFLARE_API_TOKEN`（限定目標帳號的 Workers 部署權限）及 `CLOUDFLARE_ACCOUNT_ID`，再從主分支手動執行 workflow 並勾選 `deploy`。本機登入憑證不會自動提供給 GitHub Actions。

發布驗收須包含：兩種語言、情境選擇／播放互動、鍵盤操作、手機版面、直接進入網址及重新整理、靜態安全標頭，以及在**真實瀏覽器**確認 HTML 的 `rel="icon"` 指向可成功載入的影像，瀏覽器實際採用該 favicon。僅成功 build 或 HTTP 回應不代表完成這些驗收。

2026-10-27 已以 Wrangler 成功發布至上述正式網址，並以真實 Chromium 完成雙語保存、三場景、手機無水平溢出、直接導航／刷新、播放與鍵盤操作、安全標頭及 favicon 實際採用檢查；詳細觀測值見發布驗收紀錄。這是網站驗收，不是模型或場域成效驗證。

## 授權與來源

本網站原創程式與內容以 [MIT](LICENSE) 授權；第三方依賴各依其授權。Supervision 的原始著作權為 **Copyright (c) 2022 Roboflow**；固定版本原文及來源區分見 [NOTICE](NOTICE)。本網站不打包 Python 工具箱；引用工具箱概念不表示 Roboflow 背書，也不授予商標權。模型、影像、資料集與其他整合的授權須獨立確認。

---

## English

An independent, bilingual interactive concept lab for Taiwan computer-vision applications, based on 20 research hypotheses. **This is a mock website, not a production surveillance system or an official Roboflow product.**

**Live demo:** https://supervision-taiwan-lab.tw365ai.workers.dev · [Production verification evidence](docs/release-verification.md). Published and exercised in real Chromium on 2026-10-27; this verifies the website, not model accuracy or field outcomes.

### Origin and limitations

The original project is [Roboflow Supervision](https://github.com/roboflow/supervision), an MIT-licensed, model-agnostic Python computer-vision toolbox. This site's research baseline is [0.31.2](https://github.com/roboflow/supervision/tree/0.31.2), not an assertion that it is the latest release. The original planning document is preserved above.

This browser application does **not** bundle or run the Python library. All displayed objects, metrics and events are synthetic demonstration data. There is no inference backend, camera capture, footage upload, trained model, live alerting or identity recognition. No accuracy, safety, commercial demand or performance claims have been validated through model tests, field capture or customer interviews.

A real implementation requires licensed footage, an external detector/segmenter, `sv.Detections`, optional external tracking, zone/line tools and custom event logic. Zone occupancy, tracked line crossings, heatmaps and continuous dwell time are distinct measurements. Tracking moved out of Supervision before this baseline; do not use removed `sv.ByteTrack`. Queue timing requires explicit entry/exit state. Blurring detections is not a complete privacy guarantee. Forklift co-presence is not collision prediction or a replacement for safety systems.

### Run and architecture

Use Node.js 22 LTS. Run `npm ci`, then `npm run dev`. Build with `npm run build` and preview with `npm run preview`; output is `dist/`.

The app uses React, TypeScript and Vite with no custom server or database. Traditional Chinese (`src/locales/zh-TW.ts`) is the default, and English lives in `src/locales/en.ts`. The selected locale persists under `vision-lab-locale` in browser local storage. Keep both dictionaries synchronized, reuse stable scenario identifiers and retain technical API names and source links. Locale switching is in-app, not a claim of separately indexed localized URLs.

### Deploy and contribute

The commands in the Cloudflare section build and publish static assets using the pinned Wrangler CLI. Authenticate with your own Cloudflare account; the actual URL must come from a successful deploy. The checked-in Worker configuration serves `dist/` with SPA fallback. Never commit credentials, local OAuth files, `.env`, `node_modules/` or `dist/`.

GitHub Actions builds on pushes and pull requests. Deployment is opt-in via manual workflow dispatch from `main`, requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets, and does not reuse local OAuth credentials. Before release, exercise both locales and interactions, keyboard/mobile layouts, direct navigation and refresh, response security headers, and the actual deployed favicon in a real browser.

When contributing, keep every simulated result clearly labeled, update both locales, link technical statements to upstream sources, and distinguish hypotheses from measured outcomes. This site's original work is [MIT licensed](LICENSE); the original Supervision copyright is **Copyright (c) 2022 Roboflow**. See [NOTICE](NOTICE) for the exact tagged upstream license and provenance. This project is not affiliated with, endorsed by or sponsored by Roboflow; models, media and dependencies have their own licensing requirements.
