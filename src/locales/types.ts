export type Locale = "zh-TW" | "en";
export type Demo = "queue" | "parking" | "forklift";
export type Category =
  "all" | "mobility" | "retail" | "safety" | "production" | "environment";
export interface UseCase {
  id: number;
  category: Exclude<Category, "all">;
  title: string;
  context: string;
  capability: string;
  validation: string;
  limitation: string;
}
export interface Copy {
  title: string;
  description: string;
  brand: string;
  nav: string[];
  navigationLabel: string;
  categoriesLabel: string;
  languageLabel: string;
  languageShort: string;
  siteRepo: string;
  upstream: string;
  skip: string;
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    action: string;
    secondary: string;
    note: string;
    stamp: string;
    stampBody: string;
  };
  lab: {
    heading: string;
    intro: string;
    tabs: Record<Demo, string>;
    recommended: string;
    simulated: string;
    viewport: string;
    frame: string;
    play: string;
    pause: string;
    reset: string;
    scenario: string;
    scenarios: string[];
    threshold: string;
    thresholdUnit: string;
    zones: string;
    normal: string;
    alert: string;
    disabled: string;
    current: Record<Demo, string>;
    secondary: Record<Demo, string>;
    status: Record<Demo, string>;
    note: Record<Demo, string>;
    legend: string[];
    scene: Record<Demo, string[]>;
    controls: string;
    details: string;
    count: string;
    available: string;
    coPresence: string;
    event: string;
    noEvent: string;
  };
  catalog: {
    heading: string;
    intro: string;
    search: string;
    placeholder: string;
    filters: Record<Category, string>;
    result: string;
    empty: string;
    clear: string;
    buyer: string;
    capability: string;
    validation: string;
    limitation: string;
    recommended: string;
    inference: string;
  };
  architecture: {
    heading: string;
    intro: string;
    stages: { title: string; body: string; tag: string }[];
    facts: { title: string; body: string }[];
  };
  rollout: {
    heading: string;
    intro: string;
    steps: { title: string; body: string }[];
    privacyTitle: string;
    privacy: string;
    limitsTitle: string;
    limits: string;
  };
  sources: {
    heading: string;
    intro: string;
    links: { label: string; url: string; note: string }[];
    baseline: string;
    license: string;
    disclaimer: string;
    foot: string;
  };
  cases: UseCase[];
}
