# 應用設計與維護 / Application design

## 範圍與事實邊界

這是獨立的 React + TypeScript + Vite 互動概念網站，不是 Roboflow 官方產品，也不執行 Python、Supervision 或任何模型。研究內容沿用根目錄 `SUPERVISION_台灣應用_PLAN.md` 的公開來源與 0.31.2 基準；原研究計畫的「不建置網站」限制由後續建站要求取代，其技術、授權與未驗證邊界保留。原計畫原文不修改。

三個可操作場景依推薦順序為 #7 排隊、#1 機車停車、#12 堆高機／行人區域共現。20 項應用都有雙語的場景／可訪談買方、工具箱與外部能力、驗證輸入／可觀測結果及限制。買方、推薦與商業模式是推論，不代表需求已獲確認。排隊只示範人數門檻；交會區只是 2D 共現，不是防撞預測。

This frontend uses deterministic mock data only. It captures no camera images, accepts no uploads, calls no external inference or data APIs, and makes no model, field, market or legal validation claims. External links open original sources; fonts use the local system stack without third-party font requests.

## 設計計畫與自我檢視

- 霧白 `#f2f6f5`、白紙 `#ffffff`、深海軍藍 `#142f3d`、海洋青 `#087e83`、訊號琥珀 `#a36010`。
- 字體採本機 Noto Sans TC / Microsoft JhengHei / sans-serif；中文標題厚重、內文安靜，數據用等寬數字設定，不依賴外部字型下載。
- 左對齊標題與說明，主要記憶點是能操作的俯視區域圖，不是裝飾性數字或虛構效益卡片。桌面圖面和規則檢視器並排，390px 改成圖面後接檢視器。
- 圖面框線表示偵測框、虛線表示分析區域、琥珀表示規則觸發；同時用文字描述狀態，不只靠顏色。
- 編碼前自評：捨棄通用行銷卡片 hero 與準確率 KPI，改成可檢查的在地地面示意。完成後實際查看 1440px 桌面與 390px 中英文截圖；保持圖面為唯一強視覺，來源與驗證內容維持清楚低調。

```text
桌面 / Desktop
[品牌              導覽          本站原始碼 / 語言]
[標題、脈絡、開始實驗                 台灣定位圖]
[排隊                   停車                交會]
[             場景示意             | 規則與讀值]
[搜尋 / 分類]
[20 個可展開的完整應用介紹]
[技術流程 → 驗證方式 → 隱私 → 來源]

手機 / Mobile
[品牌 / 語言]
[標題與行動]
[三場景頁籤]
[場景示意]
[控制、讀值、明確限制]
[完整應用與技術內容]
```

## 模組、介面與在地化

- `src/model.ts` 是純函式模組。`getScene(demo, scenario, frame, threshold, zones)` 是確定性介面，傳回同一畫面使用的物件位置、車格占用、讀值與提醒。這個 seam 讓圖面與讀值不會各自產生隨機資料。不建立不存在的後端 adapter。
- `src/Simulation.tsx` 專注繪製 SVG；不自行取資料、不管理計時。物件 ID 是示意用暫時代號，不是識別身分。
- `src/App.tsx` 管理使用者狀態、播放間隔、頁籤鍵盤行為、搜尋、原生 details 與頁內跳轉。關閉區域時讀值顯示破折號；不得把關閉規則誤呈現成「未共現」。重設停止播放，回到步數 0、日常狀態、門檻 5、規則啟用。
- `src/locales/types.ts` 是兩種語系的內容介面；`zh-TW.ts`、`en.ts` 提供介面、可及性標籤、20 項完整介紹與來源註解。新增內容須同步維護兩檔。專案品牌、ID、API 名稱不翻譯。
- 預設 `zh-TW`，語言偏好保存於 `localStorage["vision-lab-locale"]`。儲存被禁用時仍能切換當次語言。同步更新 `html.lang`、文件標題與 description。切換鈕使用目標語言名稱，方便找到。
- `src/config.ts` 集中本站 GitHub 與上游 GitHub URL，兩者在頁首／頁尾來源脈絡中明確區分。
- `public/favicon.svg` 是本站自製區域取景品牌圖，不挪用上游商標。`index.html` 明確宣告 icon link。
- `public/_headers` 定義正式靜態站的基本安全標頭，禁用 camera、microphone、geolocation 權限。開發 Vite 不套用這些正式部署標頭。

## 已執行的本機驗收 / Exercised local acceptance

在真實 Chromium 156 透過瀏覽器工具操作，沒有留下測試腳本或額外測試依賴：

- `npm install`：安裝完成；npm 提示 esbuild 的 postinstall 未列入 allowScripts，實際 Vite build 成功。
- `npm run build && npm run typecheck`：通過，輸出 `dist`。最初 TypeScript 自動找到工作目錄外不完整的 ambient types；以明確 `types` 清單修正，不依賴父目錄型別。
- `npm audit --json`：runtime 與 dev 相依套件合計 0 個已回報漏洞（info / low / moderate / high / critical 均 0）；這是安裝當下的稽核，不是永久資安保證。
- 標準 Prettier 格式化 TS、TSX、CSS、HTML 與配置；格式器只透過 npm exec 執行，不加入永久依賴。
- 排隊繁忙狀態 6 人、門檻鍵盤 Home / End、包含等號的提醒條件、區外取餐者排除、播放推進、暫停、重設。
- 停車滿位狀態、三種場景切換、堆高機同區提醒與分離不提醒、關閉區域時破折號及鍵盤 Space 切換。
- 頁籤 ArrowRight / End、Enter 展開原生 details、可見 focus outline、完整介紹跳轉及焦點交接。
- 兩種語系合計 40 個完整介紹逐一展開，每個檢查四個具標題且非空的內容段落；搜尋、分類（餐飲零售 3 項）、空結果與清除。
- 預設繁中、英文切換、刷新保存、文件 lang 與 title；reduced-motion 下初始停止播放。
- 1440px 桌面及 390px 手機無水平溢出；390px 中英文與三場景各三狀態檢查。
- favicon 明確 link；瀏覽器導覽 icon URL 得到 HTTP 200、`image/svg+xml`、可解析 64×64 SVG。瀏覽器頁面載入亦自行請求 `/favicon.svg`（快取重驗可能 304）。正式部署的 favicon 與安全標頭由 release 工作流程另作驗收。
- 本機瀏覽器錯誤清單為空；console 只有 Vite 連線與 React 開發工具提示。

驗收不等於模型準確率、正式可及性認證、全瀏覽器矩陣或現地測試。公開引用依原計畫保留，未重新聲稱實測來源串流。
