# 專案工作日誌

- 日期：2026-10-27。以下依工作演進與 Git 提交順序整理，不推算工時或補寫精確作業時間。
- 現行網站：**AI 模擬視覺實驗室｜Supervision 應用概念**（AI Simulation Vision Lab）。
- 正式展示：[supervision-taiwan-lab.tw365ai.workers.dev](https://supervision-taiwan-lab.tw365ai.workers.dev)。
- 公開原始碼：[tw365-org/supervision-taiwan-lab](https://github.com/tw365-org/supervision-taiwan-lab)，分支 `main`。

## 紀錄依據與閱讀方式

本日誌彙整 [README](../README.md)、[應用設計](app-design.md)、[正式發布驗收](release-verification.md)、[原始研究計畫](../SUPERVISION_台灣應用_PLAN.md) 及實際 `git log`。初版範圍另以初次提交中的 [設計文件](https://github.com/tw365-org/supervision-taiwan-lab/blob/018571c5e7d7e1f2f4974c86cf740d2e7c6ae20f/docs/app-design.md) 核對，避免用目前的 20 項互動倒寫初版成果。

下列建置、型別、稽核、瀏覽器及部署結果均為**既有紀錄中的歷史結果**，不是撰寫本日誌時重新執行的結果。這次只新增日誌與 README 入口，不修改應用、不重新部署靜態站，也不重跑完整測試矩陣。工作日誌提交後的 CI 屬於新的文件提交檢查，應與先前網站發布驗收分開閱讀。

## 2026-10-27｜階段一：研究計畫與概念網站初版

### 工作內容

- 以 Roboflow / Supervision 公開資料與 **0.31.2** 為研究基準，整理 20 個台灣場域應用假設。保留原始研究計畫；原計畫「不建立程式」是研究階段範圍，後續另行製作網站，不代表已完成真實場域原型。
- 製作 **React + TypeScript + Vite** 純靜態雙語網站，初始品牌為 **Taiwan Vision Lab／台灣視覺實驗室**。預設繁體中文，提供英文切換、語言保存及響應式版面。
- 初版可操作模擬僅有推薦的 **#7 排隊、#1 機車空位、#12 堆高機／行人共現**；其餘應用雖有雙語介紹，尚非可操作模擬。**這是初版交付落差，不能寫成一開始就完成 20 項互動。**
- 以確定性前端 mock 資料呈現物件、規則與讀值，不接攝影機、不執行模型或 Supervision Python。
- 設定 Cloudflare **Workers Static Assets**，使用 `dist/` 與 SPA fallback；無自訂 API、後端或資料庫。建立 GitHub Actions 建置與選擇性人工部署流程。
- 加入本站 MIT 授權、上游來源與著作權區分、既有品牌 favicon 與靜態安全標頭。研究基準與來源引用不代表 Roboflow 官方產品、背書或模型授權。

### 相關檔案與歷史結果

- 介面與示意：[`src/App.tsx`](../src/App.tsx)、[`src/Simulation.tsx`](../src/Simulation.tsx)、[`src/model.ts`](../src/model.ts)、[`src/styles.css`](../src/styles.css)。
- 雙語與來源：[`src/locales/zh-TW.ts`](../src/locales/zh-TW.ts)、[`src/locales/en.ts`](../src/locales/en.ts)、[`src/locales/types.ts`](../src/locales/types.ts)、[`src/config.ts`](../src/config.ts)。
- 發布與權利：[`wrangler.jsonc`](../wrangler.jsonc)、[`.github/workflows/site.yml`](../.github/workflows/site.yml)、[`LICENSE`](../LICENSE)、[`NOTICE`](../NOTICE)、[`public/_headers`](../public/_headers)、[`public/favicon.svg`](../public/favicon.svg)、[`index.html`](../index.html)。上述連結指向目前檔案，初版內容以提交快照為準。
- 初版設計紀錄記載 build、typecheck 通過，當次 `npm audit --json` 為 0 個已回報漏洞；真實 Chromium 操作三個互動場景、雙語介紹、鍵盤、語言保存與桌機／手機版面。這些結果只適用當時範圍，不是後來全部 20 項的驗收。
- 初次公開提交：[018571c5e7d7e1f2f4974c86cf740d2e7c6ae20f](https://github.com/tw365-org/supervision-taiwan-lab/commit/018571c5e7d7e1f2f4974c86cf740d2e7c6ae20f)，涵蓋雙語概念網站、研究來源與 Cloudflare 發布紀錄。
- 後續提交 [85c2e68d7c4556699256c022ba49924c7b7a4f72](https://github.com/tw365-org/supervision-taiwan-lab/commit/85c2e68d7c4556699256c022ba49924c7b7a4f72) 補記公開 CI 建置通過證據；此處不補造未核對的 run 編號。

## 2026-10-27｜階段二：依使用者更正擴充全部 20 項

### 落差修正

使用者要求不只三個推薦展示，而是 **20 個應用都有有意義的領域模擬**。後續將全部 20 項加入第一節的原生選單；三個推薦頁籤保留為捷徑，不再構成互動範圍上限。每項提供三種具名狀態、場景專屬參數與主／次讀值，以及播放、單步、重設、步數滑桿、分析開關及完整介紹跳轉。

擴充不是替換標題套用同一張人流圖：機車區分空格與遮擋未知、轉向與門口以軌跡計越線、卸貨與排隊處理停留、餐盒與貨架保留固定樣本及未知、泳道排除不可見泳者、果實使用示意斑點比例、水面垃圾排除葉片與泡沫。靜態檢查不假造逐步變動的數量；混濁殘餌場景直接顯示不適用。逐項語意與限制見[應用設計表](app-design.md#20種模擬的決策語意)及[正式站逐項觀測](release-verification.md#all-20-are-meaningful-domain-demonstrations)。

同階段將品牌由 **Taiwan Vision Lab** 改為 **AI模擬視覺實驗室／AI Simulation Vision Lab**；中文空格在下一階段再修正。既有 repository、網域、上游 Supervision 名稱與原研究標題不變。

### 相關檔案與歷史結果

- 新增／擴充 [`src/lab.ts`](../src/lab.ts) 的 20 項定義、[`src/DomainScene.tsx`](../src/DomainScene.tsx) 的其餘 17 項場域圖面、`src/model.ts` 的確定性規則，以及 `src/App.tsx` 的完整選單和控制；同步維護雙語、品牌與文件。
- 本機紀錄：`npm run build && npm run typecheck && npm audit --json` 成功，當次稽核為 0 個已回報漏洞。
- 本機與獨立正式站各有 Chromium 驗收紀錄。正式站矩陣為 **20 項 × 3 狀態 × 2 語系 × 2 版面 = 240 個狀態組合**，未見水平溢出；另有 **80 組控制檢查**及 **40 組完整介紹焦點跳轉**。240 是狀態組合數，不是 240 個應用或實地測試。
- 正式站另檢查時間事件、播放／暫停／重設、語言保存、直接路徑與刷新、安全回應標頭、瀏覽器錯誤，以及 favicon 的 HTTP 200、影像解碼與 Chrome 實際採用。正式站版本為 `4b3877cb-e938-4aab-a996-592586dac653`；詳細觀測與自動化狀態修正均保留於[發布驗收](release-verification.md)。
- 原始碼提交：[86e2e1258c11501155e892c7283dd290b03ee07d](https://github.com/tw365-org/supervision-taiwan-lab/commit/86e2e1258c11501155e892c7283dd290b03ee07d)。[CI 40483330991](https://github.com/tw365-org/supervision-taiwan-lab/actions/runs/40483330991) 通過安裝、建置與產物上傳，push 的部署步驟依設定略過。
- 提交 [88e42d1f78e0088969a41bd118d1dff0c82917ef](https://github.com/tw365-org/supervision-taiwan-lab/commit/88e42d1f78e0088969a41bd118d1dff0c82917ef) 補記該次 CI 結果。

## 2026-10-27｜階段三：中文品牌空格校正

- 依要求將 **AI模擬視覺實驗室** 精確改為 **AI 模擬視覺實驗室**；現行中文文件標題為 **AI 模擬視覺實驗室｜Supervision 應用概念**。英文品牌維持不變。
- 更新原站中文品牌、文件與公開 GitHub 描述；不改場景、英文內容、上游歸屬、網域、repository 或既有 favicon。`NOTICE` 僅含不變的英文站名，無須修改。
- 歷史結果：build、typecheck 通過；部署版本 `5ac1f221-11f6-4ae9-b2ac-b011011f4845`。真實 Chromium 在手機版檢查正確標題與可見品牌、無重疊／水平溢出、切換與刷新保存、20 個選項，以及 favicon 載入和瀏覽器採用。**此機械性更正未重跑完整 240 組矩陣。**
- 提交：[6d99d30b663749983075a62b54b4ef6d3db29463](https://github.com/tw365-org/supervision-taiwan-lab/commit/6d99d30b663749983075a62b54b4ef6d3db29463)；[CI 40485363261](https://github.com/tw365-org/supervision-taiwan-lab/actions/runs/40485363261) 通過，push 部署略過。

## 2026-10-27｜階段四：頂部雙語致謝與響應式調整

- 在前三個站內導覽後加入 **「特別致謝 Roboflow 團隊」／「Thanks to the Roboflow team」**，連至 [Roboflow](https://roboflow.com/)，新分頁開啟並保留 `rel="noreferrer"`。
- 使用獨立 `gratitude` 語系欄位，不改原 `nav` 的 Sources 索引；頁尾來源仍保留。1100px 以下導覽移至第二列；820px 以下隱藏原三項導覽時，致謝仍可見且可鍵盤操作。
- 相關檔案為 `src/App.tsx`、`src/styles.css`、雙語及語系型別檔，並同步設計與驗收文件；未修改 20 項場景。
- 歷史結果：最終合併版 build、typecheck 通過；正式部署版本 **`05c25279-ef37-4e23-8db7-2194bed9cac3`**，取代僅修空格的版本。正式站 Chromium 檢視手機繁中與桌機中英文截圖，另檢查英文 1280、1101、1024、820、390px 寬度，未見水平溢出，致謝連結可見；核對雙語文字、URL、新分頁與 noreferrer、頁尾 Sources、正確標題、無未捕捉頁面錯誤及 favicon 實際採用。這不是重跑全部場景矩陣。
- 提交：[25f606b2d0239d0288a9800db8db6920910ea32a](https://github.com/tw365-org/supervision-taiwan-lab/commit/25f606b2d0239d0288a9800db8db6920910ea32a)。撰寫日誌時另由 GitHub Actions 查得該提交的 [CI 40485839449](https://github.com/tw365-org/supervision-taiwan-lab/actions/runs/40485839449) 已完成且結論為 **success**；這項新查詢不表示本次重新執行瀏覽器驗收。

## 目前交付與限制

### 已交付

1. 公開雙語概念網站、完整 20 項可操作的領域模擬、20 項研究介紹與三個推薦入口。
2. 正確中英文品牌、響應式頂部致謝、來源／授權／安全限制及既有 favicon。
3. 公開 MIT 原始碼、Cloudflare 靜態站設定、GitHub Actions 建置與人工部署流程，以及研究、設計、發布驗收與本工作日誌。

### 不屬於已完成能力

- 所有物件、數字及事件均為前端合成示意；沒有真實影像、攝影機、影像上傳、推論後端、模型權重或在瀏覽器執行 Supervision。
- 20 項及買方／商業模式仍為 **[INFERENCE] 待驗證假設**；未做模型準確率、現地取像、客戶訪談、市場或效益驗證。安全相關情境不替代職安、救生、照護或專業判斷。
- 網站驗收不等於無障礙認證、全瀏覽器／實體手機完整矩陣、法律合規或完整匿名化。MIT 工具箱授權不能代替模型、資料集與影像的個別授權。
- GitHub Actions 在 push／PR 執行建置；**不自動部署**。只有 `main` 的人工 workflow dispatch 勾選 `deploy` 才執行發布，且需先設定 repository secrets `CLOUDFLARE_API_TOKEN` 與 `CLOUDFLARE_ACCOUNT_ID`。本機 OAuth 不會自動提供給 CI；本日誌不宣稱已配置這些 secrets。
- 既有 CI 的 Node 20 → Node 24 actions 執行環境與 ubuntu-latest 遷移提示是非阻擋 runner 通知，不是應用失敗。歷史 audit 的零漏洞也不是永久安全保證。

## 本次文件整理範圍

僅新增 `docs/work-log.md`，並在 README 增加日誌入口。核對既有文件、歷史初版設計、Git 提交、現存本機引用路徑及已完成 CI 的提交對應；不編造時間、工時、模型成效或新的測試結果。本次提交的完整 SHA 與後續 CI 結果由交付訊息記錄，避免將尚未產生的提交／檢查寫成已完成證據。
