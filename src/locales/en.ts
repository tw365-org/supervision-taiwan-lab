import type { Copy } from "./types";
export const en: Copy = {
  title: "Taiwan Vision Lab | Supervision concepts",
  description:
    "Explore 20 computer vision concepts for Taiwan with simulated data, grounded capabilities and explicit limits.",
  brand: "Taiwan Vision Lab",
  nav: [
    "Interactive lab",
    "20 applications",
    "Technology & rollout",
    "Sources",
  ],
  navigationLabel: "Main navigation",
  categoriesLabel: "Application categories",
  languageLabel: "切換至繁體中文",
  languageShort: "繁中",
  siteRepo: "Site GitHub",
  upstream: "Upstream Supervision",
  skip: "Skip to main content",
  hero: {
    eyebrow: "From images to testable decisions",
    title: "Computer vision,\ncloser to everyday Taiwan.",
    body: "A breakfast-shop queue. Scooter bays beside a station. A warehouse crossing. Explore how an image could become a useful signal, before connecting a camera.",
    action: "Enter the interactive lab",
    secondary: "Explore 20 applications",
    note: "Frontend simulation only. No camera, uploads or model inference.",
    stamp: "Define the question. Then test the model.",
    stampBody:
      "An independent concept site based on Supervision 0.31.2 research, not a validated product.",
  },
  lab: {
    heading: "Put the rules into the scene.",
    intro:
      "Choose a use case, change the scenario, then adjust a rule. The scene and readings share reproducible mock data; none are field measurements.",
    tabs: {
      queue: "Queue alerts",
      parking: "Scooter parking",
      forklift: "Shared crossing",
    },
    recommended: "Validation priority",
    simulated: "Simulated data",
    viewport: "Top-down concept schematic, not a real camera image",
    frame: "Simulation step",
    play: "Play simulation",
    pause: "Pause simulation",
    reset: "Reset",
    scenario: "Scenario",
    scenarios: ["Everyday", "Busy", "Edge case"],
    threshold: "Queue count threshold",
    thresholdUnit: "people or more to alert",
    zones: "Enable zone rules",
    normal: "No alert condition",
    alert: "Advisory alert triggered",
    disabled: "Zone rules disabled",
    current: {
      queue: "People in the queue zone",
      parking: "Visible free bays",
      forklift: "Objects in shared zone",
    },
    secondary: {
      queue: "Alert threshold",
      parking: "Illustrated bays",
      forklift: "Shared-zone rule",
    },
    status: {
      queue: "Queue count meets threshold",
      parking: "No visible bays available",
      forklift: "Person and forklift share the zone",
    },
    note: {
      queue:
        "Count threshold only, not an estimated wait. Pickup customers outside the queue are excluded. Leaving the queue does not prove payment or order completion.",
      parking:
        "Each bay uses a preset state, not image recognition. The camera must resolve individual bays. Occlusion, angled parking and rain covers need field validation. No plate recognition.",
      forklift:
        "Only 2D zone co-presence, never calibrated distance or collision prediction. No vehicle control; not a substitute for safety interlocks or occupational safety measures.",
    },
    legend: [
      "Person / scooter",
      "Forklift",
      "Analysis zone",
      "Outside analysis zone",
    ],
    scene: {
      queue: ["Service counter", "Queue zone", "Pickup area", "Entrance"],
      parking: ["Scooter parking", "Access aisle", "Exit", "Bay"],
      forklift: ["Storage", "Shared zone", "Pedestrian route", "Vehicle route"],
    },
    controls: "Simulation controls",
    details: "Read the full application introduction",
    count: "people",
    available: "bays",
    coPresence: "person / vehicle",
    event: "Co-presence",
    noEvent: "No co-presence",
  },
  catalog: {
    heading: "20 local questions. 20 places to start.",
    intro:
      "Start with a potential buyer’s decision, not a model feature. All applications and recommendations are hypotheses, without model, site or market validation. Expand any item for observable outcomes and limits.",
    search: "Search applications",
    placeholder: "Search scenes, buyers or techniques…",
    filters: {
      all: "All",
      mobility: "Mobility & crowds",
      retail: "Retail & food",
      safety: "Safety & care",
      production: "Industry & agriculture",
      environment: "Environment & water",
    },
    result: "applications",
    empty:
      "No applications match. Try a different keyword or clear the filters.",
    clear: "Clear filters",
    buyer: "Context & potential interviewees",
    capability: "Supervision + external capabilities",
    validation: "Minimum validation: input & observable result",
    limitation: "Limits & decision boundaries",
    recommended: "Validate first",
    inference: "Inference, not measured evidence",
  },
  architecture: {
    heading: "A toolbox. Not an all-purpose vision model.",
    intro:
      "Supervision is a model-agnostic Python computer vision toolbox for converting model outputs into zone counts, events and annotations. A real application connects external capabilities and custom rules.",
    stages: [
      {
        title: "Authorized images",
        body: "Licensed video, cameras or external stream capture. Supervision does not capture live camera streams.",
        tag: "External input",
      },
      {
        title: "Detection & tracking",
        body: "Choose a domain model, convert to sv.Detections, then use temporary IDs from an external tracker for cross-frame events.",
        tag: "External model / tracker",
      },
      {
        title: "Zones & annotations",
        body: "PolygonZone counts, LineZone crossings, visual annotation and dataset tools.",
        tag: "Supervision",
      },
      {
        title: "Decisions & review",
        body: "Continuous dwell, queues, co-presence, notifications and dashboards are custom application logic.",
        tag: "Application integration",
      },
    ],
    facts: [
      {
        title: "Zone count ≠ cumulative visitors",
        body: "PolygonZone tests specified anchors in a single frame and needs no tracking ID. LineZone counts bidirectional crossing events and requires tracker_id.",
      },
      {
        title: "Tracking ID ≠ identity",
        body: "Built-in ByteTrack was removed in 0.31.0. Integrate an external tracker, such as trackers ByteTrackTracker.update(). Temporary IDs are not identity or cross-camera recognition.",
      },
      {
        title: "Visualization ≠ calibrated measurement",
        body: "HeatMapAnnotator accumulates historical detection positions, not people per square meter. InferenceSlicer still needs an external model and enough pixels; slicing adds compute and guarantees neither accuracy nor real time.",
      },
      {
        title: "Example code ≠ complete business rules",
        body: "time_in_zone is a structural reference. Continuous dwell requires explicit entry, exit and re-entry timing; a timer retaining the first-seen time is not automatically a continuous-wait timer.",
      },
    ],
  },
  rollout: {
    heading: "The next step is not connecting every camera.",
    intro:
      "Validate queues, then scooter parking, then shared crossings. The order reflects clearer decisions and manual comparisons, not proven market demand.",
    steps: [
      {
        title: "Confirm rights and visibility",
        body: "Have the operator confirm capture, analysis, annotation and retention permissions. Choose one site and one decision; inspect occlusion and camera angles. Publicly viewable does not mean downloadable or licensed for commercial training.",
      },
      {
        title: "Build a human reference",
        body: "For queues, label counts and entry / exit. For parking, label each bay. For crossings, stage empty, separated and shared-zone cases. Record misses, false alerts and unobservable states.",
      },
      {
        title: "Let operators judge usefulness",
        body: "Define review ownership, alert responses and stop criteria before evaluating a model on authorized site data. Setup fees plus maintenance subscriptions are interview hypotheses, not established prices or returns.",
      },
    ],
    privacyTitle: "Privacy is a system design, not a blur button.",
    privacy:
      "A real rollout must assess personal data, notice, capture minimization, access and retention. Consider on-site compute and event-only statistics. Image transmission depends on the chosen model and inference service; the toolbox does not force Roboflow uploads. BlurAnnotator only blurs supplied boxes; face and plate detection is external and missed detections can expose data. It is not complete anonymization. This site only stores your language preference in the browser and collects no images.",
    limitsTitle: "Be explicit about what is not known.",
    limits:
      "This site follows the public documentation and sources checked in the research plan. No model testing, on-site capture, case-specific legal assessment or market interviews were performed. Mock figures are not accuracy, business impact or safety guarantees. All 20 ideas remain hypotheses; access to original government camera streams is not assumed.",
  },
  sources: {
    heading: "Open source with a clear origin.",
    intro:
      "An independently built interactive concept, not an official Roboflow product. No affiliation, partnership or endorsement by Roboflow.",
    links: [
      {
        label: "Roboflow / Supervision",
        url: "https://github.com/roboflow/supervision",
        note: "Original upstream project and toolbox scope",
      },
      {
        label: "Official documentation & FAQ",
        url: "https://supervision.roboflow.com/latest/faq/",
        note: "Tracker removal, capture and integration limits; latest docs may differ from the baseline",
      },
      {
        label: "0.31.2 source baseline",
        url: "https://github.com/roboflow/supervision/tree/0.31.2",
        note: "Pinned source reference; main is not treated as a release",
      },
      {
        label: "Upstream MIT License",
        url: "https://github.com/roboflow/supervision/blob/0.31.2/LICENSE.md",
        note: "Retain copyright and license notices; no warranty",
      },
      {
        label: "Chiayi CCTV open dataset",
        url: "https://data.gov.tw/dataset/173813",
        note: "Evidence of a data entry point, not tested stream availability or training rights",
      },
      {
        label: "OSHA construction vision example",
        url: "https://www.osha.gov.tw/48110/48417/48419/87044",
        note: "A historical 2020 example, not evidence of this site’s model performance",
      },
      {
        label: "Agricultural vision activity record",
        url: "https://www.acri.gov.tw/Item/Detail/活動視窗_116_",
        note: "2026 activity record; hyperspectral findings cannot be assumed for RGB cameras",
      },
      {
        label: "Aquaculture vision research",
        url: "https://www.agriharvest.tw/archives/36974/",
        note: "Fish-tracking research does not establish leftover-feed recognition",
      },
      {
        label: "Environmental cleanup dispatch example",
        url: "https://www.ema.gov.tw/policies/outcomes/8368.html",
        note: "Coastal aerial case; water-surface applications still require validation",
      },
      {
        label: "TDX terms",
        url: "https://tdx.transportdata.tw/term",
        note: "Approval, attribution, fees and rights vary; not universally free video",
      },
      {
        label: "Taiwan Open Government Data License",
        url: "https://data.gov.tw/license",
        note: "Check the applicable dataset scope, attribution and third-party rights",
      },
    ],
    baseline:
      "Research baseline: Supervision 0.31.2 / Python ≥ 3.10. This website runs neither Python nor Supervision.",
    license:
      "Upstream uses MIT. Model weights, data and dependencies have separate licenses; do not infer rights for the whole commercial system.",
    disclaimer:
      "Every scene and reading is preset simulation, not camera footage, inference output or measured performance.",
    foot: "An open-source concept lab for everyday problems in Taiwan.",
  },
  cases: [
    {
      id: 1,
      category: "mobility",
      title: "Scooter parking availability",
      context:
        "Station areas, campuses and private scooter lots; interview parking operators and universities. Prioritize only when individual bays are visible.",
      capability:
        "External scooter detector + PolygonZone; report occupancy or availability per resolvable bay or section, without plate recognition.",
      validation:
        "One authorized fixed, high-angle video; manually label each bay’s occupancy and compare individual availability decisions and error cases.",
      limitation:
        "Dense occlusion, angled parking and rain covers need site testing. An invisible bay is not a free bay; there is no established accuracy guarantee.",
    },
    {
      id: 2,
      category: "mobility",
      title: "Intersection turning observations",
      context:
        "Local road improvements and school intersections; interview transport consultants and road authorities.",
      capability:
        "External vehicle-class detector and tracker + custom zone-transition rules; count left, through and right movements by vehicle type.",
      validation:
        "Authorized video covering all turns; compare against a manual movement table for misses, duplicates and class errors.",
      limitation:
        "ID switches cause duplicate or missed counts. Planning analysis only, not automated violation findings or crash-risk assessment.",
    },
    {
      id: 3,
      category: "mobility",
      title: "Loading-zone overstay advisory",
      context:
        "Logistics parks and private commercial loading areas; interview property and logistics operators.",
      capability:
        "External vehicle model + PolygonZone + custom continuous-occupancy timing; identify bays needing dispatch attention.",
      validation:
        "Video of entry, brief occlusion, exit and re-entry; verify two visits remain separate dwell events.",
      limitation:
        "Define occlusion tolerance and restart rules. Image overlap does not prove illegal parking; no automated enforcement.",
    },
    {
      id: 4,
      category: "mobility",
      title: "Bus waiting-area crowding",
      context:
        "Terminals and stops with lawful camera placement; interview bus operators and station staff.",
      capability:
        "Person model + PolygonZone for current occupancy; add an external tracker and LineZone for entries and exits.",
      validation:
        "One peak platform clip compared with manual zone counts and bidirectional crossing events.",
      limitation:
        "Shared waiting areas do not reveal route-specific demand; headcount cannot guarantee actual waiting time.",
    },
    {
      id: 5,
      category: "mobility",
      title: "Night-market pedestrian routing",
      context:
        "Narrow night-market walkways; interview market associations and operators about where to redirect crowds.",
      capability:
        "Person model + zone counts + HeatMapAnnotator for local counts and accumulated detection locations.",
      validation:
        "Authorized free-flow and crowded clips; compare counts and manually labeled congestion events.",
      limitation:
        "A heatmap is neither unique visitor count nor calibrated density. Severe occlusion requires better high-angle capture.",
    },
    {
      id: 6,
      category: "mobility",
      title: "Temple and event entrance flow",
      context:
        "Temple festivals, ceremonies and local exhibitions; interview organizers and temple operators.",
      capability:
        "Person model + external tracker + LineZone for bidirectional entrance events, alongside visible-zone occupancy.",
      validation:
        "Authorized staged two-way movement including turnbacks; manually verify each crossing and reversal.",
      limitation:
        "Without every exit covered, net entries cannot represent total attendance. No identification of worshippers.",
    },
    {
      id: 7,
      category: "retail",
      title: "Tea-shop and breakfast queues",
      context:
        "Counter and pickup areas; interview chain-store teams and managers. Start with one store and one person class to test count and alert usefulness.",
      capability:
        "External person detector + PolygonZone + custom queue entry / exit state. Count comes first; sample waits require separately defined joining and leaving events, not built-in prediction.",
      validation:
        "Authorized peak-period video with manually labeled queue joins and exits; compare current headcount. Evaluate timing definitions and errors separately.",
      limitation:
        "Exclude pickup customers and companions. Leaving does not prove payment or fulfillment. This site simulates a count threshold only, with no wait estimate.",
    },
    {
      id: 8,
      category: "retail",
      title: "Supermarket shelf-gap review",
      context:
        "Fresh-food and ambient shelves; interview supermarkets, hypermarkets and regional chains.",
      capability:
        "External shelf / product detection or segmentation + Detections filtering and annotations; flag suspected gaps for replenishment review.",
      validation:
        "One shelf level with stocked, empty and occluded images; manually check shelf-gap alerts.",
      limitation:
        "Not POS inventory. Misplaced products and customer occlusion do not automatically mean out of stock.",
    },
    {
      id: 9,
      category: "retail",
      title: "Bento missing-side-dish review",
      context:
        "Central kitchens and meal-service conveyors; interview food factories and quality teams.",
      capability:
        "External dish / compartment model + zones and box annotations; create review images based on visible sides within the same meal box.",
      validation:
        "Fixed box and menu; collect normal and missing-side samples and compare against manual missing-item labels.",
      limitation:
        "No food-safety, weight or nutrition inference. Menu changes and occlusion require revalidation.",
    },
    {
      id: 10,
      category: "environment",
      title: "Recycling overflow and mis-sorting",
      context:
        "Residential and campus collection points; interview property managers and collection contractors.",
      capability:
        "External overflow / waste model + zone rules and annotation; identify points for pickup or manual sorting.",
      validation:
        "Authorized images with lids open / closed, empty / overflowing and obvious mis-sorting; evaluate the two event types separately.",
      limitation:
        "Hidden interiors cannot establish fill percentage; appearance does not guarantee material type or hazardous-waste recognition.",
    },
    {
      id: 11,
      category: "safety",
      title: "Construction helmet and zone review",
      context:
        "Construction sites; interview contractors, site managers and safety officers.",
      capability:
        "External person / helmet models + custom object matching + PolygonZone; flag suspected missing helmets or restricted-zone entries.",
      validation:
        "Clips of correctly worn helmets, carried helmets, occlusion and staged zone entries; compare with manually labeled events.",
      limitation:
        "Not proof of regulatory compliance. No replacement for safety inspections or use for automated punishment.",
    },
    {
      id: 12,
      category: "safety",
      title: "Forklift–pedestrian shared crossing",
      context:
        "Bounded warehouse or factory crossings; interview warehouse managers and safety teams, defining events through authorized exercises.",
      capability:
        "External person / forklift models + PolygonZone + a custom simultaneous co-presence rule; send an advisory for human response.",
      validation:
        "Three staged groups: no objects, separated people / vehicles and shared-zone presence. Label anchors manually and verify events occur only during co-presence.",
      limitation:
        "2D co-presence is not calibrated distance or collision prediction. No vehicle control or replacement for interlocks. Safety value still requires operator validation.",
    },
    {
      id: 13,
      category: "production",
      title: "Small-factory visual defect review",
      context:
        "Fixed metal or plastic parts on production lines; interview quality managers.",
      capability:
        "Dedicated defect detection / segmentation + InferenceSlicer if needed + box or mask annotation for review locations.",
      validation:
        "Fixed part and lighting; compare normal, scratched and chipped samples against human inspection, recording misses and false positives.",
      limitation:
        "Transparent, reflective and tiny defects need suitable imaging. Installing the toolbox does not create an AOI system.",
    },
    {
      id: 14,
      category: "production",
      title: "Pallet loading-door movements",
      context:
        "Logistics centers and cold-chain warehouses; interview warehouse operations teams.",
      capability:
        "External pallet model + external tracker + LineZone for inbound and outbound loading-door events.",
      validation:
        "Entry, exit, stopping beside the line and turnback clips; manually verify every crossing.",
      limitation:
        "Not item quantities, SKUs or unique inventory. Stacking and occlusion need separate testing.",
    },
    {
      id: 15,
      category: "safety",
      title: "Care-facility controlled-exit advisory",
      context:
        "Shared care-facility corridors and controlled doors; interview facility managers and care teams.",
      capability:
        "Person model + PolygonZone / LineZone + custom time-of-day rules for approaches or crossings.",
      validation:
        "Only consenting staff stage approaches, pass-bys and crossings; check advisories and false positives.",
      limitation:
        "No resident identity, dementia, emotion or health-state recognition. Video cannot be the sole protective measure.",
    },
    {
      id: 16,
      category: "environment",
      title: "Swimming-lane usage",
      context:
        "Pool lanes with lawful video access; interview sports-center operators.",
      capability:
        "External swimmer-specific model + lane zones; report trends in currently visible swimmers per lane.",
      validation:
        "One lane under varied reflections and sparse / dense use, compared against manual visible counts.",
      limitation:
        "Submerged swimmers may be invisible. Never drowning detection or a substitute for lifeguards.",
    },
    {
      id: 17,
      category: "production",
      title: "Agricultural sticky-trap counting",
      context:
        "Greenhouses and orchards; interview growers, farm-service providers and research stations.",
      capability:
        "External insect-specific model + InferenceSlicer + annotation for target insects per trap.",
      validation:
        "Fixed trap design, manually label each insect and compare target counts and similar non-target false positives.",
      limitation:
        "Dirt, overlap and species need local data. No direct disease diagnosis or pesticide prescription.",
    },
    {
      id: 18,
      category: "production",
      title: "Fruit appearance grading assistance",
      context:
        "Mango or guava packing lines; interview cooperatives and packing houses.",
      capability:
        "Dedicated surface-defect / color model + segmentation or detection annotations; flag review grades under existing human specifications.",
      validation:
        "One fruit variety and fixed lighting, using manual grade labels to inspect classification confusion.",
      limitation:
        "A single view cannot cover the whole surface. RGB appearance does not guarantee sugar content or internal disease.",
    },
    {
      id: 19,
      category: "environment",
      title: "Visible aquaculture feed residue",
      context:
        "Tanks or research ponds suitable for close, fixed imaging; interview growers and aquaculture-equipment suppliers.",
      capability:
        "Visible-feed-specific detection / segmentation + zone statistics for residue trends in a fixed observation window.",
      validation:
        "Start with clear surface or controlled tank footage of known visible feed; compare visible area or particle counts.",
      limitation:
        "Not underwater consumption, fish health or biomass. If water color or reflection hides feed, declare the site unsuitable instead of claiming visual estimation.",
    },
    {
      id: 20,
      category: "environment",
      title: "River and harbor litter dispatch",
      context:
        "Fixed visible water areas in harbors and drains; interview port, water-maintenance and cleaning teams.",
      capability:
        "External floating-litter detection / segmentation + slicing if needed + zone statistics for location and visible accumulation trends.",
      validation:
        "Clips containing leaves, reflection, foam and litter; compare alerts with manual cleanup records.",
      limitation:
        "Shadows are not pollution. Visible area does not establish weight, water quality or toxicity; coastal cases do not validate water-surface performance.",
    },
  ],
};
