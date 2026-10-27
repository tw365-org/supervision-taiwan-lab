import { useEffect, useState } from "react";
import Simulation from "./Simulation";
import { getScene } from "./model";
import { definitions, labCopy, sceneIds } from "./lab";
import type { LabDemo } from "./lab";
import { zhTW } from "./locales/zh-TW";
import { en } from "./locales/en";
import type { Category, Demo, Locale } from "./locales/types";
import { SITE_REPOSITORY, UPSTREAM_REPOSITORY } from "./config";
const demos: Demo[] = ["queue", "parking", "forklift"];
function initialLocale(): Locale {
  try {
    return localStorage.getItem("vision-lab-locale") === "en" ? "en" : "zh-TW";
  } catch {
    return "zh-TW";
  }
}
function BrandIcon() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path
        d="M5 15V5h10M25 5h10v10M35 25v10H25M15 35H5V25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path d="m14 22 6-12 7 9-6 11z" fill="currentColor" />
    </svg>
  );
}
export default function App() {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const copy = locale === "zh-TW" ? zhTW : en;
  const [demo, setDemo] = useState<LabDemo>("queue");
  const [scenario, setScenario] = useState(0);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [threshold, setThreshold] = useState(5);
  const [zones, setZones] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [opened, setOpened] = useState<number[]>([]);
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = copy.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", copy.description);
    try {
      localStorage.setItem("vision-lab-locale", locale);
    } catch {
      /* Language remains usable if browser storage is disabled. */
    }
  }, [locale, copy]);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setFrame((f) => (f + 1) % 12), 1400);
    return () => clearInterval(timer);
  }, [playing]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      if (media.matches) setPlaying(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  const scene = getScene(demo, scenario, frame, threshold, zones);
  const lab = labCopy(demo, locale);
  const selectedCase = copy.cases.find((item) => item.id === lab.id)!;
  const chooseDemo = (value: LabDemo) => {
    setDemo(value);
    setScenario(0);
    setFrame(0);
    setThreshold(definitions[value].initial);
  };
  const cases = copy.cases.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      [
        item.title,
        item.context,
        item.capability,
        item.validation,
        item.limitation,
      ]
        .join(" ")
        .toLocaleLowerCase(locale)
        .includes(query.toLocaleLowerCase(locale).trim()),
  );
  const jumpToCase = () => {
    const id = lab.id;
    setCategory("all");
    setQuery("");
    setOpened((items) => (items.includes(id) ? items : [...items, id]));
    window.setTimeout(() => {
      const item = document.getElementById(`case-${id}`);
      item?.scrollIntoView({ block: "start" });
      item?.querySelector("summary")?.focus({ preventScroll: true });
    }, 0);
  };
  return (
    <>
      <a className="skip-link" href="#main">
        {copy.skip}
      </a>
      <header className="site-header">
        <a className="brand" href="#main">
          <BrandIcon />
          <span>
            {copy.brand}
            <small>
              {locale === "zh-TW"
                ? "AI Simulation Vision Lab"
                : "Taiwan / interactive concepts"}
            </small>
          </span>
        </a>
        <nav aria-label={copy.navigationLabel}>
          {copy.nav.slice(0, 3).map((label, i) => (
            <a key={i} href={["#lab", "#applications", "#technology"][i]}>
              {label}
            </a>
          ))}
          <a
            className="gratitude-link"
            href="https://roboflow.com/"
            target="_blank"
            rel="noreferrer"
          >
            {copy.gratitude}
          </a>
        </nav>
        <div className="header-actions">
          <a
            className="repo-link"
            href={SITE_REPOSITORY}
            target="_blank"
            rel="noreferrer"
          >
            {copy.siteRepo}
            <span aria-hidden="true"> ↗</span>
          </a>
          <button
            className="locale-button"
            onClick={() => setLocale(locale === "zh-TW" ? "en" : "zh-TW")}
            aria-label={copy.languageLabel}
          >
            <span aria-hidden="true">◎</span> {copy.languageShort}
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero section-wrap">
          <div>
            <p className="eyebrow">
              <span />
              {copy.hero.eyebrow}
            </p>
            <h1>{copy.hero.title}</h1>
            <p className="hero-description">{copy.hero.body}</p>
            <div className="hero-actions">
              <a className="button primary" href="#lab">
                {copy.hero.action}
                <span aria-hidden="true"> ↘</span>
              </a>
              <a className="text-link" href="#applications">
                {copy.hero.secondary}
              </a>
            </div>
            <p className="quiet hero-note">
              <span aria-hidden="true">◈</span> {copy.hero.note}
            </p>
          </div>
          <aside className="hero-aside">
            <div className="lab-mark" aria-hidden="true">
              <span className="mark-corner tl" />
              <span className="mark-corner tr" />
              <span className="mark-corner bl" />
              <span className="mark-corner br" />
              <svg viewBox="0 0 160 160">
                <path
                  d="m82 17 13 20-7 16 16 19-6 19-18 13-12 25-13 14-10-17 9-20-1-19 11-15 2-26z"
                  fill="#a5d7cf"
                />
                <path
                  d="M20 80h120M80 20v120"
                  stroke="#50777e"
                  strokeDasharray="3 5"
                />
                <circle cx="75" cy="77" r="24" fill="none" stroke="#0c7d80" />
                <circle cx="75" cy="77" r="5" fill="#d5983e" />
              </svg>
              <span className="mark-coordinate">23.7° N / 121.0° E</span>
            </div>
            <h2>{copy.hero.stamp}</h2>
            <p>{copy.hero.stampBody}</p>
          </aside>
        </section>
        <section id="lab" className="lab-section section-wrap">
          <div className="section-heading">
            <div>
              <p className="section-kicker">01 / {copy.nav[0]}</p>
              <h2>{copy.lab.heading}</h2>
            </div>
            <p>{copy.lab.intro}</p>
          </div>
          <div className="lab-shell">
            <div
              className="demo-tabs"
              role="tablist"
              aria-label={copy.lab.heading}
            >
              {demos.map((value, i) => (
                <button
                  key={value}
                  role="tab"
                  id={`tab-${value}`}
                  aria-selected={demo === value}
                  aria-controls="demo-panel"
                  tabIndex={
                    demo === value || (!demos.includes(demo as Demo) && i === 0)
                      ? 0
                      : -1
                  }
                  onKeyDown={(e) => {
                    if (
                      ["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)
                    ) {
                      e.preventDefault();
                      const index =
                        e.key === "Home"
                          ? 0
                          : e.key === "End"
                            ? 2
                            : (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                      chooseDemo(demos[index]);
                      document.getElementById(`tab-${demos[index]}`)?.focus();
                    }
                  }}
                  onClick={() => {
                    chooseDemo(value);
                  }}
                >
                  <span className="tab-order">{i + 1}</span>
                  <span>{copy.lab.tabs[value]}</span>
                  <small>{copy.lab.recommended}</small>
                </button>
              ))}
            </div>
            <div className="all-scenes-control">
              <label htmlFor="lab-demo">{lab.all}</label>
              <select
                id="lab-demo"
                value={demo}
                onChange={(e) => chooseDemo(e.target.value as LabDemo)}
              >
                {sceneIds.map((id) => (
                  <option key={id} value={id}>
                    #{String(definitions[id].id).padStart(2, "0")} ·{" "}
                    {
                      copy.cases.find((item) => item.id === definitions[id].id)!
                        .title
                    }
                  </option>
                ))}
              </select>
            </div>
            <div
              id="demo-panel"
              role="tabpanel"
              aria-label={selectedCase.title}
              className="demo-panel"
            >
              <div className="viewport">
                <div className="viewport-top">
                  <span className="mock-badge">
                    <i />
                    {copy.lab.simulated}
                  </span>
                  <span className="frame-label">
                    {copy.lab.frame} {String(frame).padStart(2, "0")} / 11
                  </span>
                </div>
                <Simulation
                  demo={demo}
                  scene={scene}
                  copy={copy}
                  zones={zones}
                  labels={lab.labels}
                  title={selectedCase.title}
                />
                <div className="viewport-bottom">
                  <span>{copy.lab.viewport}</span>
                  <div className="playback">
                    <button
                      onClick={() => setPlaying(!playing)}
                      aria-pressed={playing}
                    >
                      <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>
                      {playing ? copy.lab.pause : copy.lab.play}
                    </button>
                    <button
                      onClick={() => {
                        setPlaying(false);
                        setFrame((f) => (f + 1) % 12);
                      }}
                    >
                      {lab.step}
                    </button>
                    <button
                      onClick={() => {
                        setFrame(0);
                        setScenario(0);
                        setThreshold(definitions[demo].initial);
                        setZones(true);
                        setPlaying(false);
                      }}
                    >
                      <span aria-hidden="true">↺</span>
                      {copy.lab.reset}
                    </button>
                  </div>
                </div>
                <div className="frame-control">
                  <label htmlFor="frame">
                    {lab.timeline} <output>{frame} / 11</output>
                  </label>
                  <input
                    id="frame"
                    type="range"
                    min="0"
                    max="11"
                    value={frame}
                    onChange={(e) => {
                      setPlaying(false);
                      setFrame(Number(e.target.value));
                    }}
                  />
                </div>
                {(demo === "gate" || demo === "bus") && (
                  <div
                    className="crossing-history"
                    aria-label={
                      locale === "zh-TW"
                        ? "選區越線事件紀錄"
                        : "Selected-zone crossing history"
                    }
                  >
                    <span>
                      {locale === "zh-TW"
                        ? "越線紀錄（步數）"
                        : "Crossing history (step)"}
                    </span>
                    {scene.crossings
                      .filter((event) => event.zone === threshold)
                      .map((event) => (
                        <span key={`${event.id}-${event.step}`}>
                          {event.id} {event.direction === "in" ? "↑" : "↓"} @
                          {event.step}
                        </span>
                      ))}
                    {!scene.crossings.some(
                      (event) => event.zone === threshold,
                    ) && <span>0</span>}
                  </div>
                )}
              </div>
              <aside className="inspector" aria-label={copy.lab.controls}>
                <div className="inspector-title">
                  <span className="focus-corner" aria-hidden="true">
                    ⌖
                  </span>
                  <h3>{selectedCase.title}</h3>
                  <span className="inspector-id">
                    #{String(lab.id).padStart(2, "0")}
                  </span>
                </div>
                <label className="field-label" htmlFor="scenario">
                  {copy.lab.scenario}
                </label>
                <select
                  id="scenario"
                  value={scenario}
                  onChange={(e) => {
                    setScenario(Number(e.target.value));
                    setFrame(0);
                  }}
                >
                  {lab.scenarios.map((label, i) => (
                    <option key={i} value={i}>
                      {label}
                    </option>
                  ))}
                </select>
                <div className="reading">
                  <span>{lab.metric}</span>
                  <strong>
                    {zones && !scene.unavailable ? scene.primary : "—"}
                    <small>{lab.unit}</small>
                  </strong>
                </div>
                <div className="secondary-reading">
                  <span>{lab.secondary}</span>
                  <strong>
                    {zones && !scene.unavailable ? scene.secondary : "—"}{" "}
                    <small>{lab.secondaryUnit}</small>
                  </strong>
                </div>
                <div className="threshold-control">
                  <label htmlFor="threshold">
                    {lab.control}
                    <output htmlFor="threshold">{threshold}</output>
                  </label>
                  <input
                    id="threshold"
                    type="range"
                    min={lab.min}
                    max={lab.max}
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                  />
                  <p>
                    {threshold} {lab.controlUnit}
                  </p>
                </div>
                <label className="zone-switch">
                  <span>{lab.enabled}</span>
                  <input
                    type="checkbox"
                    role="switch"
                    checked={zones}
                    onChange={(e) => setZones(e.target.checked)}
                  />
                </label>
                <div
                  className={`status ${scene.alert ? "status-alert" : ""}`}
                  role="status"
                >
                  <span aria-hidden="true">
                    {!zones ? "○" : scene.alert ? "!" : "✓"}
                  </span>
                  <div>
                    <strong>
                      {!zones
                        ? copy.lab.disabled
                        : scene.unavailable
                          ? lab.unavailable
                          : scene.alert
                            ? copy.lab.alert
                            : copy.lab.normal}
                    </strong>
                    {zones && scene.alert && <small>{lab.rule}</small>}
                  </div>
                </div>
                <p className="simulation-note">{lab.rule}</p>
                <p className="simulation-note safety-limit">
                  {selectedCase.limitation}
                </p>
                <button className="details-link" onClick={jumpToCase}>
                  {copy.lab.details}
                  <span aria-hidden="true"> ↗</span>
                </button>
              </aside>
            </div>
            <div className="legend">
              {lab.legend.map((label, i) => (
                <span key={i}>
                  <i className={`legend-symbol symbol-${i}`} />
                  {label}
                </span>
              ))}
              <span className="legend-disclaimer">
                {copy.catalog.inference}
              </span>
            </div>
          </div>
        </section>
        <section id="applications" className="catalog-section section-wrap">
          <div className="section-heading">
            <div>
              <p className="section-kicker">02 / {copy.nav[1]}</p>
              <h2>{copy.catalog.heading}</h2>
            </div>
            <p>{copy.catalog.intro}</p>
          </div>
          <div className="catalog-tools">
            <div className="search-field">
              <span aria-hidden="true">⌕</span>
              <label className="sr-only" htmlFor="case-search">
                {copy.catalog.search}
              </label>
              <input
                id="case-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={copy.catalog.placeholder}
              />
            </div>
            <span className="result-count" role="status">
              {cases.length} / 20 {copy.catalog.result}
            </span>
          </div>
          <div
            className="filters"
            role="group"
            aria-label={copy.categoriesLabel}
          >
            {(Object.keys(copy.catalog.filters) as Category[]).map((value) => (
              <button
                key={value}
                aria-pressed={category === value}
                onClick={() => setCategory(value)}
              >
                {copy.catalog.filters[value]}
              </button>
            ))}
          </div>
          <div className="case-list">
            {cases.map((item) => (
              <details
                key={item.id}
                id={`case-${item.id}`}
                open={opened.includes(item.id)}
                onToggle={(e) => {
                  const isOpen = e.currentTarget.open;
                  setOpened((items) =>
                    isOpen
                      ? items.includes(item.id)
                        ? items
                        : [...items, item.id]
                      : items.filter((id) => id !== item.id),
                  );
                }}
              >
                <summary>
                  <span className="case-number">
                    {String(item.id).padStart(2, "0")}
                  </span>
                  <span className="case-summary">
                    <span className="case-title">{item.title}</span>
                    <span className="case-preview">{item.context}</span>
                  </span>
                  {[7, 1, 12].includes(item.id) && (
                    <span className="priority-badge">
                      {copy.catalog.recommended}{" "}
                      {[7, 1, 12].indexOf(item.id) + 1}
                    </span>
                  )}
                  <span className="expand-icon" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="case-content">
                  {[
                    [copy.catalog.buyer, item.context],
                    [copy.catalog.capability, item.capability],
                    [copy.catalog.validation, item.validation],
                    [copy.catalog.limitation, item.limitation],
                  ].map(([label, body], i) => (
                    <div key={i} className={i === 3 ? "case-limitation" : ""}>
                      <h3>{label}</h3>
                      <p>{body}</p>
                    </div>
                  ))}
                  <p className="case-assumption">{copy.catalog.inference}</p>
                </div>
              </details>
            ))}
          </div>
          {!cases.length && (
            <div className="empty-state">
              <p>{copy.catalog.empty}</p>
              <button
                className="button"
                onClick={() => {
                  setCategory("all");
                  setQuery("");
                }}
              >
                {copy.catalog.clear}
              </button>
            </div>
          )}
        </section>
        <section id="technology" className="technology-section">
          <div className="section-wrap">
            <div className="section-heading">
              <div>
                <p className="section-kicker">03 / {copy.nav[2]}</p>
                <h2>{copy.architecture.heading}</h2>
              </div>
              <p>{copy.architecture.intro}</p>
            </div>
            <div className="pipeline">
              {copy.architecture.stages.map((stage, i) => (
                <div key={i}>
                  <span className={`stage-tag ${i === 2 ? "native" : ""}`}>
                    {stage.tag}
                  </span>
                  <h3>{stage.title}</h3>
                  <p>{stage.body}</p>
                  {i < 3 && (
                    <span className="pipeline-arrow" aria-hidden="true">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="technical-facts">
              {copy.architecture.facts.map((fact, i) => (
                <article key={i}>
                  <h3>{fact.title}</h3>
                  <p>{fact.body}</p>
                </article>
              ))}
            </div>
            <div className="rollout-heading">
              <h2>{copy.rollout.heading}</h2>
              <p>{copy.rollout.intro}</p>
            </div>
            <ol className="rollout-steps">
              {copy.rollout.steps.map((step, i) => (
                <li key={i}>
                  <span>{i + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="privacy-note">
              <span aria-hidden="true">◇</span>
              <div>
                <h3>{copy.rollout.privacyTitle}</h3>
                <p>{copy.rollout.privacy}</p>
              </div>
            </div>
            <div className="research-limits">
              <h3>{copy.rollout.limitsTitle}</h3>
              <p>{copy.rollout.limits}</p>
            </div>
          </div>
        </section>
        <section id="sources" className="sources-section section-wrap">
          <div className="section-heading">
            <div>
              <p className="section-kicker">04 / {copy.nav[3]}</p>
              <h2>{copy.sources.heading}</h2>
            </div>
            <p>{copy.sources.intro}</p>
          </div>
          <div className="provenance">
            <div className="provenance-main">
              <BrandIcon />
              <h3>Roboflow / Supervision</h3>
              <p>{copy.sources.baseline}</p>
              <p>{copy.sources.license}</p>
              <a href={UPSTREAM_REPOSITORY} target="_blank" rel="noreferrer">
                {copy.upstream} ↗
              </a>
            </div>
            <div className="source-links">
              {copy.sources.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <strong>
                    {link.label}
                    <span aria-hidden="true">↗</span>
                  </strong>
                  <span>{link.note}</span>
                </a>
              ))}
            </div>
          </div>
          <p className="closing-disclaimer">{copy.sources.disclaimer}</p>
        </section>
      </main>
      <footer className="site-footer">
        <div className="section-wrap">
          <div>
            <a className="brand" href="#main">
              <BrandIcon />
              <span>{copy.brand}</span>
            </a>
            <p>{copy.sources.foot}</p>
          </div>
          <div className="footer-links">
            <a href={SITE_REPOSITORY} target="_blank" rel="noreferrer">
              {copy.siteRepo} ↗
            </a>
            <a href={UPSTREAM_REPOSITORY} target="_blank" rel="noreferrer">
              {copy.upstream} ↗
            </a>
            <a href="#sources">{copy.nav[3]}</a>
          </div>
          <p className="footer-note">{copy.sources.intro}</p>
        </div>
      </footer>
    </>
  );
}
