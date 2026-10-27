import type { Copy } from "./types";
export const zhTW: Copy = {
  title: "AI 模擬視覺實驗室｜Supervision 應用概念",
  description:
    "用模擬資料探索 20 個台灣電腦視覺應用，理解 Supervision 的能力與落地邊界。",
  brand: "AI 模擬視覺實驗室",
  nav: ["互動實驗", "20 個應用", "技術與落地", "來源"],
  navigationLabel: "主要導覽",
  gratitude: "特別致謝 Roboflow 團隊",
  categoriesLabel: "應用分類",
  languageLabel: "Switch to English",
  languageShort: "EN",
  siteRepo: "本站 GitHub",
  upstream: "上游 Supervision",
  skip: "跳至主要內容",
  hero: {
    eyebrow: "從畫面，到可驗證的決策",
    title: "讓視覺 AI，\n看見台灣的日常。",
    body: "早餐店的隊列、車站旁的機車格、倉庫裡的交會區。先用可操作的概念實驗，理解一張影像如何變成有意義的現場訊號。",
    action: "開始互動實驗",
    secondary: "探索 20 個應用",
    note: "純前端模擬資料，無攝影機、無上傳、無模型推論。",
    stamp: "先定義問題，再驗證模型。",
    stampBody:
      "以 Roboflow Supervision 0.31.2 為研究基準的獨立概念網站，不是已驗證產品。",
  },
  lab: {
    heading: "把規則，放進現場。",
    intro:
      "20個應用都能操作：先選推薦三項，或從完整選單選場景。改變狀態與規則，觀察確定性模擬；所有讀值都不是現場量測。",
    tabs: { queue: "排隊提醒", parking: "機車空位", forklift: "人車交會區" },
    recommended: "推薦驗證",
    simulated: "模擬資料",
    viewport: "概念示意與合成觀測，非實際攝影機影像",
    frame: "模擬步數",
    play: "播放模擬",
    pause: "暫停模擬",
    reset: "重設",
    scenario: "場景狀態",
    normal: "未達提醒條件",
    alert: "觸發輔助提醒",
    disabled: "分析與規則已關閉",
    controls: "模擬控制",
    details: "閱讀此應用的完整介紹",
  },
  catalog: {
    heading: "20 個在地問題，20 個驗證起點。",
    intro:
      "從潛在買方的決策出發，而不是從模型功能出發。所有應用與推薦均為推論假設，尚未做模型、現場或市場驗證。展開每一項，查看可觀測結果與不該承諾的事。",
    search: "搜尋應用",
    placeholder: "搜尋場景、買方或技術…",
    filters: {
      all: "全部",
      mobility: "交通與人流",
      retail: "零售與餐飲",
      safety: "安全與照護",
      production: "製造與農業",
      environment: "環境與水域",
    },
    result: "個應用",
    empty: "找不到符合條件的應用。請換一個關鍵字或清除篩選。",
    clear: "清除篩選",
    buyer: "場景與可訪談買方",
    capability: "Supervision ＋外部能力",
    validation: "最小驗證：輸入與可觀測結果",
    limitation: "限制與決策邊界",
    recommended: "優先驗證",
    inference: "推論假設，非實測",
  },
  architecture: {
    heading: "工具箱，不是萬用辨識模型。",
    intro:
      "Supervision 是模型無關的 Python 電腦視覺工具箱，協助把模型輸出變成區域計數、事件與標註。真正的應用，需要把外部能力與自訂規則接起來。",
    stages: [
      {
        title: "合法影像",
        body: "授權影片、攝影機或外部取流工具。Supervision 不負責即時攝影機擷取。",
        tag: "外部輸入",
      },
      {
        title: "偵測與追蹤",
        body: "選用場域模型，轉換為 sv.Detections；跨影格事件需要外部 tracker 的暫時 ID。",
        tag: "模型／追蹤另接",
      },
      {
        title: "區域與標註",
        body: "PolygonZone 計數、LineZone 越線事件、視覺標註與資料集工具。",
        tag: "Supervision",
      },
      {
        title: "決策與複核",
        body: "連續停留、排隊、共現、通知及儀表板為應用自訂邏輯。",
        tag: "應用整合",
      },
    ],
    facts: [
      {
        title: "區域數 ≠ 累積人數",
        body: "PolygonZone 依單一影格的指定錨點判斷區域，不必有追蹤 ID；LineZone 的雙向越線事件則需要 tracker_id。",
      },
      {
        title: "追蹤 ID ≠ 身分",
        body: "0.31.0 起已移除內建 ByteTrack；應用需另接外部 trackers 的 ByteTrackTracker.update()。暫時 ID 不代表身分或跨鏡頭識別。",
      },
      {
        title: "視覺化 ≠ 校正量測",
        body: "HeatMapAnnotator 是歷史偵測位置累積，不是人／平方公尺。InferenceSlicer 切片仍要外部模型與足夠畫素，會增加運算，不保證更準或即時。",
      },
      {
        title: "範例 ≠ 完整業務規則",
        body: "time_in_zone 可作結構參考；連續停留須明確定義進出與重入計時，不能把保留首次見到時間的計時器直接當連續等待時間。",
      },
    ],
  },
  rollout: {
    heading: "下一步不是接上所有攝影機。",
    intro:
      "推薦依序驗證排隊、機車空位、人車交會區。理由是決策與人工對照較容易定義，而非已證實市場需求。",
    steps: [
      {
        title: "先確認權利與可視性",
        body: "由管理者確認取像、分析、標註與保存權限。固定一個場域、一種決策，檢查遮擋與鏡頭角度；公開可看不等於可下載或商用訓練。",
      },
      {
        title: "建立人工對照",
        body: "排隊先核對人數與加入／離開；停車核對逐格占用；交會區用無人車、分離、同區演練。記錄漏檢、誤報及不可觀測情況。",
      },
      {
        title: "讓現場人員決定是否有用",
        body: "定義複核責任、提醒處置與停止條件，再用獲授權的現地資料評估模型。導入費加維護訂閱僅是訪談假設，不提供虛構報價或效益。",
      },
    ],
    privacyTitle: "隱私是系統設計，不是一個模糊按鈕。",
    privacy:
      "正式導入應評估個資、告知、最少取像、權限與保存期限，可優先考慮場內運算與只保留事件統計。是否傳出影像取決於選用的模型與推論服務，工具箱不強制上傳至 Roboflow。BlurAnnotator 只模糊傳入偵測框，臉與車牌偵測需另接，漏檢仍可能暴露，不能宣稱完整匿名化。本站只在瀏覽器保存語言偏好，不取得影像。",
    limitsTitle: "把尚未知道的事，說清楚。",
    limits:
      "本網站沿用計畫核對的公開文件與來源；未做模型實測、現場取像、法律個案判定或市場訪談。模擬數字不是準確率、營運效益或安全保證。20 個點子都是待驗證假設，不預設可取得政府原始串流。",
  },
  sources: {
    heading: "開源有出處，推論有邊界。",
    intro:
      "本站是獨立製作的互動概念展示，非 Roboflow 官方產品，與 Roboflow 無隸屬、合作或背書關係。",
    links: [
      {
        label: "Roboflow / Supervision",
        url: "https://github.com/roboflow/supervision",
        note: "上游原始專案與工具箱定位",
      },
      {
        label: "Supervision 官方文件與 FAQ",
        url: "https://supervision.roboflow.com/latest/faq/",
        note: "追蹤器移除、取流及整合邊界；最新文件可能不同於研究版",
      },
      {
        label: "0.31.2 原始碼與發行基準",
        url: "https://github.com/roboflow/supervision/tree/0.31.2",
        note: "固定版本核對，不將 main 視為發行版",
      },
      {
        label: "上游 MIT License",
        url: "https://github.com/roboflow/supervision/blob/0.31.2/LICENSE.md",
        note: "保留著作權與授權聲明，無擔保",
      },
      {
        label: "嘉義市 CCTV 開放資料",
        url: "https://data.gov.tw/dataset/173813",
        note: "僅證明資料入口存在，未實測串流或確認訓練權利",
      },
      {
        label: "職安署工地影像應用案例",
        url: "https://www.osha.gov.tw/48110/48417/48419/87044",
        note: "2020 年歷史案例，不代表本站模型效能",
      },
      {
        label: "農業藥物試驗所影像應用活動",
        url: "https://www.acri.gov.tw/Item/Detail/活動視窗_116_",
        note: "2026 年活動紀錄；高光譜成果不可直接視為 RGB 能力",
      },
      {
        label: "水產影像研究方向",
        url: "https://www.agriharvest.tw/archives/36974/",
        note: "魚隻追蹤研究，不直接證明可辨識殘餌",
      },
      {
        label: "環境管理署廢棄物派工案例",
        url: "https://www.ema.gov.tw/policies/outcomes/8368.html",
        note: "海岸空拍案例，水面應用仍需另驗證",
      },
      {
        label: "TDX 使用條款",
        url: "https://tdx.transportdata.tw/term",
        note: "資料有審核、顯名、費用及權利差異，不全是免費影像",
      },
      {
        label: "政府資料開放授權條款",
        url: "https://data.gov.tw/license",
        note: "確認實際資料適用範圍、顯名與第三人權利",
      },
    ],
    baseline:
      "研究基準：Supervision 0.31.2／Python ≥ 3.10；本網站不執行 Python 或 Supervision。",
    license:
      "上游採 MIT；模型權重、資料與其他依賴需分別確認授權，不能推論整套商用權利。",
    disclaimer:
      "所有畫面與數值皆為預設模擬，不是攝影機取像、推論結果或量測成果。",
    foot: "為台灣現場問題而做的開源概念實驗。",
  },
  cases: [
    {
      id: 1,
      category: "mobility",
      title: "機車停車空位看板",
      context:
        "車站周邊、校園、民營機車場；可訪談停車場業者與校方。只有鏡頭能區分車格才適合先驗證。",
      capability:
        "外部機車偵測模型＋PolygonZone；依可辨識車格或區段輸出占用與空位，非車牌識別。",
      validation:
        "一支授權固定高角度影片，人工逐格標記占用，再比對每格空位判斷與錯誤情境。",
      limitation:
        "密集遮擋、斜停與雨衣需現地驗證；不可見車格不能當成空位，無現成準確率保證。",
    },
    {
      id: 2,
      category: "mobility",
      title: "路口汽機車轉向觀測",
      context: "地方交通改善、校門周邊；可訪談交通顧問與道路管理單位。",
      capability:
        "外部車種偵測與追蹤＋自訂區域轉移規則，輸出分車種左轉、直行、右轉量。",
      validation:
        "授權且涵蓋各轉向的影片，與人工分類轉向表比對漏計、重複與分類錯誤。",
      limitation:
        "追蹤 ID 切換造成重複或漏計；只作規劃分析，不自動認定違規或事故風險。",
    },
    {
      id: 3,
      category: "mobility",
      title: "裝卸區占用超時提醒",
      context: "物流園區與商辦私有卸貨區；可訪談物業與物流業者。",
      capability:
        "外部車輛模型＋PolygonZone＋自訂連續占用計時，輸出需調度區位。",
      validation:
        "包含進入、短暫遮擋、離開及重入的影片，核對是否分開兩次停留事件。",
      limitation:
        "需定義遮擋容忍與重新計時；畫面重疊不證明違停，不串接自動裁罰。",
    },
    {
      id: 4,
      category: "mobility",
      title: "公車候車區壅塞指標",
      context: "可合法架設鏡頭的轉運站與候車亭；可訪談客運與站務。",
      capability:
        "人物模型＋PolygonZone 當下人數；如需進出量，另接外部追蹤與 LineZone。",
      validation: "一個月台尖峰片段，對照人工區域人數與雙向越線事件。",
      limitation: "共用候車區不能推論各路線需求，人數也不保證實際等候時間。",
    },
    {
      id: 5,
      category: "mobility",
      title: "夜市走道人潮分流",
      context: "夜市狹窄通道；可訪談自治會與營運單位以決定疏導位置。",
      capability:
        "人物模型＋分區計數＋HeatMapAnnotator，呈現通道人數與歷史位置累積。",
      validation: "包含暢通與擁擠的授權片段，比對分區人數與人工壅塞事件。",
      limitation: "熱圖不是獨立遊客數或校正密度，嚴重遮擋需改善高角度取像。",
    },
    {
      id: 6,
      category: "mobility",
      title: "宮廟與活動出入口流量",
      context: "廟會、祭典、地方展會；可訪談主辦單位與宮廟。",
      capability:
        "人物模型＋外部追蹤＋LineZone，記錄各入口雙向事件及可視區當下占用。",
      validation: "雙向通行並含折返的授權演練影片，人工核對每次越線及折返。",
      limitation:
        "未覆蓋所有出口時，不能將累積進出差當總在場人數；不辨識信眾身分。",
    },
    {
      id: 7,
      category: "retail",
      title: "手搖飲／早餐店排隊提醒",
      context:
        "櫃台及取餐區；可訪談連鎖門市與店長。先從單店、單一人物類別驗證人數與提醒用途。",
      capability:
        "外部人物偵測＋PolygonZone＋自訂隊列進出狀態。人數是第一指標；樣本等待時間需另定義加入與離開事件，非工具箱自帶預測。",
      validation:
        "授權尖峰影片，人工標記加入與離開隊列，再比對當下人數；時間指標另核對事件定義與誤差。",
      limitation:
        "排除取餐者與同行者，離區不代表付款或出餐完成。本站只模擬人數門檻，沒有等待時間估算。",
    },
    {
      id: 8,
      category: "retail",
      title: "超市與生鮮賣場缺貨巡檢",
      context: "生鮮與常溫貨架；可訪談超市、量販與區域連鎖。",
      capability:
        "外部貨架／商品偵測或分割＋Detections 過濾與標註，輸出疑似空架待補區。",
      validation: "固定一層貨架，取得有貨、缺貨與遮擋影像，人工核對空架提醒。",
      limitation: "不是 POS 庫存；商品倒放或顧客遮擋不能直接判缺貨。",
    },
    {
      id: 9,
      category: "retail",
      title: "便當裝盒漏配菜複核",
      context: "中央廚房、團膳輸送帶；可訪談餐飲工廠與品管人員。",
      capability:
        "外部菜色／格位模型＋分區與框標註，按同一餐盒的可見配菜存在性產生待複核圖。",
      validation: "固定餐盒與菜單，蒐集正常及缺配樣本，與人工缺項標記比對。",
      limitation: "不推論食品安全、重量或營養；換菜與遮擋都要重新驗證。",
    },
    {
      id: 10,
      category: "environment",
      title: "回收站滿溢與混投複核",
      context: "社區回收區與園區回收點；可訪談物業與清運商。",
      capability:
        "外部滿溢／廢棄物模型＋區域規則與標註，提供清運或人工分類點位。",
      validation:
        "有蓋、開蓋、未滿、滿溢及明顯混投的授權影像，分別核對兩類事件。",
      limitation: "內部不可見不能估滿載率；外觀不能保證材質或辨識有害物。",
    },
    {
      id: 11,
      category: "safety",
      title: "工地安全帽與禁入區複核",
      context: "營造工地；可訪談承包商、工地主任與職安人員。",
      capability:
        "外部人員／安全帽模型＋自訂物件配對＋PolygonZone，標示疑似缺帽或禁區事件。",
      validation: "正確戴帽、手持帽、遮擋與禁區演練片段，比對人工事件標記。",
      limitation: "不是法規合規證明；不取代職安巡檢，也不作自動懲處。",
    },
    {
      id: 12,
      category: "safety",
      title: "堆高機與行人交叉口提醒",
      context:
        "倉儲、工廠內有固定邊界的交會區；可訪談倉儲主管與工安單位，以授權演練定義事件。",
      capability:
        "外部人物／堆高機模型＋PolygonZone＋自訂同區同時出現規則，產生供人工處置的交會提醒。",
      validation:
        "無人車、人車分離、人車同區三組演練影片；人工標記錨點，僅同區共現時產生事件並核對誤報。",
      limitation:
        "2D 共現不是校正距離或碰撞預測，不介入車輛控制、不取代安全聯鎖。安全價值仍需向職安人員驗證。",
    },
    {
      id: 13,
      category: "production",
      title: "中小工廠外觀瑕疵複核",
      context: "固定金屬加工或塑膠工件產線；可訪談品保主管。",
      capability:
        "專用瑕疵偵測／分割模型＋必要時 InferenceSlicer＋框或遮罩，標示供複核的位置。",
      validation:
        "固定工件及光源，正常、刮傷、缺角樣本對照人工品檢，記錄漏檢與誤報。",
      limitation:
        "透明、反光與微小缺陷需要合適成像；安裝工具箱不等於具備 AOI 能力。",
    },
    {
      id: 14,
      category: "production",
      title: "棧板裝卸進出盤點",
      context: "物流中心、冷鏈倉庫；可訪談倉儲營運單位。",
      capability: "外部棧板模型＋外部追蹤＋LineZone，計算裝卸門進出事件。",
      validation: "進、出、線邊停留與折返片段，人工核對每次越線事件。",
      limitation: "不等於貨物件數、SKU 或唯一庫存；堆疊與遮擋需另驗證。",
    },
    {
      id: 15,
      category: "safety",
      title: "長照機構管制出口提醒",
      context: "長照公共走道與管制門；可訪談機構管理與照護團隊。",
      capability:
        "人物模型＋PolygonZone／LineZone，配合自訂時段規則，提示接近或穿越管制出口。",
      validation:
        "僅由同意參與的工作人員演練接近、經過與越界，核對提醒及誤報。",
      limitation:
        "不辨認住民身分、失智、情緒或健康狀態；影像不能成為唯一防護。",
    },
    {
      id: 16,
      category: "environment",
      title: "運動中心泳道使用量",
      context: "可合法取得影像的公共泳池泳道；可訪談運動中心營運商。",
      capability: "外部游泳者專用模型＋泳道分區，輸出各道可見人數趨勢。",
      validation: "同一泳道不同反光與稀疏、密集片段，對照人工可見人數。",
      limitation: "潛水者可能不可見，絕非溺水偵測或救生替代。",
    },
    {
      id: 17,
      category: "production",
      title: "農業黏蟲板自動盤點",
      context: "溫室、果園；可訪談農友、農業服務商及試驗單位。",
      capability: "外部昆蟲專用模型＋InferenceSlicer＋標註，輸出每板目標蟲數。",
      validation: "固定板型，人工逐隻標註，核對計數與相似非目標蟲誤判。",
      limitation: "髒污、重疊與物種需現地資料；不直接診斷病害或開農藥處方。",
    },
    {
      id: 18,
      category: "production",
      title: "水果外觀分級輔助",
      context: "芒果、番石榴等集貨包裝線；可訪談合作社與包裝場。",
      capability:
        "專用外觀缺陷／色澤模型＋分割或偵測標註，依現有人工規格標示待複核級別。",
      validation: "固定果實種類與光源，使用人工分級標籤，比對分級混淆。",
      limitation: "單一視角不保證全表面品質；RGB 外觀不能保證糖度或內部病變。",
    },
    {
      id: 19,
      category: "environment",
      title: "養殖餵料區可見殘餌觀測",
      context: "可近距離固定拍攝的養殖槽或試驗池；可訪談養殖業者與水產設備商。",
      capability:
        "可見飼料專用模型／分割＋區域統計，呈現固定觀測窗的可見殘餌趨勢。",
      validation:
        "先在清晰水面或受控槽體拍攝已知可見飼料，核對可見面積或顆數。",
      limitation:
        "不是水下攝食量、魚健康或生物量。水色反光使飼料不可見時，應判場域不適用，不改宣稱可估測。",
    },
    {
      id: 20,
      category: "environment",
      title: "河港水面垃圾清理派工",
      context: "港區與排水道固定可視水面；可訪談港務、水環境維護及清潔承商。",
      capability:
        "外部漂浮垃圾偵測／分割＋必要時切片＋區域統計，輸出位置與可見堆積趨勢。",
      validation: "含葉片、反光、泡沫及垃圾的影片，人工核對告警與清理紀錄。",
      limitation:
        "陰影不是污染；可見面積不能推論重量、水質或毒性，海岸案例不能直接驗證水面效能。",
    },
  ],
};
