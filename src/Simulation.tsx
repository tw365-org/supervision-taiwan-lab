import type { Copy, Demo } from "./locales/types";
import type { Actor, Scene } from "./model";
function Person({ actor }: { actor: Actor }) {
  const forklift = actor.kind === "forklift";
  return (
    <g transform={`translate(${actor.x} ${actor.y})`}>
      <rect
        x={forklift ? -27 : -20}
        y={forklift ? -31 : -25}
        width={forklift ? 54 : 40}
        height={forklift ? 71 : 50}
        rx="5"
        className={`detection ${forklift ? "vehicle-box" : ""}`}
      />
      {forklift ? (
        <g>
          <rect x="-17" y="-17" width="34" height="38" rx="5" fill="#dba349" />
          <rect x="-11" y="-10" width="22" height="17" rx="3" fill="#785c35" />
          <path
            d="M-13 22v14h-5M13 22v14h5"
            stroke="#785c35"
            strokeWidth="5"
            fill="none"
          />
          <path d="M-21-12v13M21-12v13" stroke="#142f3d" strokeWidth="5" />
        </g>
      ) : (
        <g>
          <ellipse
            cy="9"
            rx="13"
            ry="16"
            fill={actor.inside ? "#137b80" : "#7b9299"}
          />
          <circle cy="-7" r="10" fill={actor.inside ? "#b5dfd9" : "#d4dfe2"} />
          <path d="M-7 23v5M7 23v5" stroke="#142f3d" strokeWidth="5" />
        </g>
      )}
      <rect
        x="-20"
        y="-41"
        width="40"
        height="15"
        rx="3"
        fill={forklift ? "#936119" : "#126c72"}
      />
      <text x="0" y="-30" textAnchor="middle" className="actor-label">
        {actor.id}
      </text>
    </g>
  );
}
export default function Simulation({
  demo,
  scene,
  copy,
  zones,
}: {
  demo: Demo;
  scene: Scene;
  copy: Copy;
  zones: boolean;
}) {
  const labels = copy.lab.scene[demo];
  const zoneClass = `analysis-zone ${scene.alert ? "zone-alert" : ""} ${!zones ? "zone-off" : ""}`;
  return (
    <svg
      className="simulation"
      viewBox="0 0 640 470"
      role="img"
      aria-label={`${copy.lab.tabs[demo]} — ${copy.lab.viewport}`}
    >
      <defs>
        <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#dce6e6" strokeWidth=".7" />
        </pattern>
        <pattern
          id="hatch"
          width="9"
          height="9"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="9" stroke="#ccd9db" strokeWidth="3" />
        </pattern>
      </defs>
      <rect width="640" height="470" fill="#edf3f3" />
      <rect width="640" height="470" fill="url(#grid)" />
      <path
        d="M26 56V26h30M584 26h30v30M614 414v30h-30M56 444H26v-30"
        stroke="#98afb5"
        fill="none"
        strokeWidth="2"
      />
      {demo === "queue" && (
        <g>
          <rect x="94" y="65" width="452" height="54" rx="6" fill="#d0dee0" />
          <rect x="110" y="76" width="35" height="30" rx="4" fill="#81999f" />
          <rect x="158" y="76" width="22" height="20" rx="3" fill="#b0c4c9" />
          <text x="320" y="98" className="scene-label">
            {labels[0]}
          </text>
          <rect
            x="165"
            y="140"
            width="180"
            height="244"
            rx="12"
            className={zoneClass}
          />
          <text x="255" y="365" textAnchor="middle" className="zone-label">
            {labels[1]}
          </text>
          <rect
            x="386"
            y="140"
            width="133"
            height="204"
            rx="12"
            fill="url(#hatch)"
            opacity=".65"
          />
          <text x="453" y="328" textAnchor="middle" className="scene-label">
            {labels[2]}
          </text>
          <path
            d="M127 327v-79m-8 14 8-14 8 14M255 420v-27m-8 14 8-14 8 14"
            stroke="#9aafb4"
            fill="none"
            strokeWidth="2"
          />
          <text x="305" y="423" className="scene-label">
            {labels[3]}
          </text>
        </g>
      )}
      {demo === "parking" && (
        <g>
          <text x="62" y="61" className="scene-label">
            {labels[0]}
          </text>
          {scene.occupied.map((occupied, i) => {
            const x = 70 + (i % 6) * 82;
            const y = i < 6 ? 90 : 292;
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width="70"
                  height="105"
                  rx="4"
                  className={
                    zones
                      ? occupied
                        ? "bay occupied"
                        : "bay free"
                      : "bay zone-off"
                  }
                />
                <text x={x + 9} y={y + 18} className="bay-label">
                  {String(i + 1).padStart(2, "0")}
                </text>
                {occupied ? (
                  <g transform={`translate(${x + 35} ${y + 58})`}>
                    <path
                      d="M0-30v58"
                      stroke="#143e4b"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    <rect
                      x="-11"
                      y="-18"
                      width="22"
                      height="39"
                      rx="8"
                      fill="#6b9c9f"
                    />
                    <rect
                      x="-9"
                      y="-8"
                      width="18"
                      height="21"
                      rx="5"
                      fill="#254d57"
                    />
                    <path d="M-14-21h28" stroke="#143e4b" strokeWidth="4" />
                    <ellipse cy="-24" rx="5" ry="7" fill="#b8d6d7" />
                  </g>
                ) : (
                  <path
                    d={`M${x + 26} ${y + 60}l7 7 14-18`}
                    fill="none"
                    stroke="#168b80"
                    strokeWidth="3"
                  />
                )}
              </g>
            );
          })}
          <path
            d="M80 245h457m-13-8 13 8-13 8"
            stroke="#9bb0b5"
            fill="none"
            strokeWidth="2"
          />
          <text x="320" y="232" textAnchor="middle" className="scene-label">
            {labels[1]}
          </text>
          <text x="548" y="250" className="scene-label">
            {labels[2]}
          </text>
        </g>
      )}
      {demo === "forklift" && (
        <g>
          {[60, 415].map((x) => (
            <g key={x}>
              {[65, 340].map((y) => (
                <g key={y}>
                  <rect
                    x={x}
                    y={y}
                    width="160"
                    height="65"
                    rx="4"
                    fill="#d2dfe0"
                  />
                  <path
                    d={`M${x + 10} ${y + 10}h140v45H${x + 10}zM${x + 56} ${y + 10}v45M${x + 105} ${y + 10}v45`}
                    stroke="#a2b8bc"
                    fill="none"
                  />
                  <text
                    x={x + 80}
                    y={y + 39}
                    textAnchor="middle"
                    className="scene-label"
                  >
                    {labels[0]}
                  </text>
                </g>
              ))}
            </g>
          ))}
          <path d="M35 244H603" stroke="#d4e3e3" strokeWidth="65" />
          <path d="M283 48v378" stroke="#e5ddc9" strokeWidth="88" />
          <path
            d="M35 244H603M283 48v378"
            stroke="#a5b8ba"
            strokeDasharray="10 9"
            fill="none"
          />
          <rect
            x="219"
            y="179"
            width="128"
            height="145"
            rx="9"
            className={zoneClass}
          />
          <text x="283" y="167" textAnchor="middle" className="zone-label">
            {labels[1]}
          </text>
          <text x="420" y="290" className="scene-label">
            {labels[2]}
          </text>
          <text x="335" y="429" className="scene-label">
            {labels[3]}
          </text>
        </g>
      )}
      {scene.actors.map((actor) => (
        <Person key={actor.id} actor={actor} />
      ))}
    </svg>
  );
}
