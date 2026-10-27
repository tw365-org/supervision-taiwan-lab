import type { ReactNode } from "react";
import type { LabDemo } from "./lab";
import type { Scene, Mark } from "./model";
const ink = "#254d57",
  teal = "#137b80",
  amber = "#bd7e25",
  red = "#a64f38";
function Label({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: ReactNode;
}) {
  return (
    <text x={x} y={y} textAnchor="middle" className="scene-label">
      {children}
    </text>
  );
}
function ObjectMark({ m, selected }: { m: Mark; selected: boolean }) {
  const fill = selected ? teal : "#8a9fa4";
  const body = (() => {
    switch (m.kind) {
      case "person":
        return (
          <>
            <ellipse cy="8" rx="12" ry="18" fill={fill} />
            <circle cy="-13" r="10" fill="#b5dfd9" />
            <rect
              x="-20"
              y="-28"
              width="40"
              height="58"
              rx="4"
              fill="none"
              stroke={fill}
            />
          </>
        );
      case "scooter":
        return (
          <>
            <rect x="-10" y="-25" width="20" height="50" rx="8" fill={teal} />
            <path d="M-17-15h34M0-32v64" stroke={ink} strokeWidth="4" />
          </>
        );
      case "car":
        return (
          <>
            <rect x="-20" y="-30" width="40" height="60" rx="9" fill={amber} />
            <rect x="-14" y="-15" width="28" height="25" rx="3" fill={ink} />
          </>
        );
      case "truck":
        return (
          <>
            <rect
              x="-80"
              y="-50"
              width="115"
              height="100"
              rx="5"
              fill="#acc8cb"
              stroke={ink}
            />
            <rect x="35" y="-40" width="50" height="80" rx="5" fill={amber} />
            <path
              d="M-65-53h20M-65 53h20M50-43h20M50 43h20"
              stroke={ink}
              strokeWidth="9"
            />
          </>
        );
      case "product":
        return (
          <>
            <rect
              x="-33"
              y="-65"
              width="66"
              height="130"
              rx="3"
              fill={
                m.state === 2
                  ? "url(#hatch)"
                  : m.state === 1
                    ? "none"
                    : "#a8c9bc"
              }
              stroke={m.state === 1 ? amber : ink}
              strokeDasharray={m.state === 1 ? "6 4" : undefined}
            />
            {m.state === 0 ? (
              <>
                <rect
                  x="-22"
                  y="-40"
                  width="44"
                  height="65"
                  rx="4"
                  fill={teal}
                />
                <path d="M-12-15h24M-12-4h24" stroke="#fff" />
              </>
            ) : (
              <Label x={0} y={5}>
                {m.state === 2 ? "?" : "∅"}
              </Label>
            )}
          </>
        );
      case "dish":
        return (
          <>
            <rect
              x="-88"
              y="-67"
              width="176"
              height="134"
              rx="18"
              fill={m.state === 2 ? "url(#hatch)" : "#fff"}
              stroke={m.state === 1 ? amber : ink}
              strokeWidth="2"
            />
            {m.state === 0 ? (
              <>
                {Array.from({ length: 7 }, (_, i) => (
                  <ellipse
                    key={i}
                    cx={-43 + (i % 3) * 38}
                    cy={-25 + Math.floor(i / 3) * 24}
                    rx="23"
                    ry="13"
                    fill={
                      ["#d1b47b", "#7ca36c", "#cd8c5d", "#c7af64"][m.zone - 1]
                    }
                  />
                ))}
              </>
            ) : (
              <Label x={0} y={8}>
                {m.state === 1 ? "∅" : "?"}
              </Label>
            )}
            <Label x={0} y={55}>
              {m.zone}
            </Label>
          </>
        );
      case "bin":
        return (
          <>
            <path
              d="M-55-55h110l-8 130h-94z"
              fill={m.zone === 1 ? "#c6b184" : "#b3cccf"}
              stroke={ink}
              strokeWidth="2"
            />
            <ellipse
              cy="-55"
              rx="55"
              ry="17"
              fill={m.state === 3 ? ink : "#edf3f3"}
              stroke={ink}
            />
            {m.state === 1 ? (
              <>
                {[0, 1, 2, 3].map((i) => (
                  <rect
                    key={i}
                    x={-70 + i * 30}
                    y={-85 + (i % 2) * 22}
                    width="35"
                    height="28"
                    rx="4"
                    fill={amber}
                    stroke={ink}
                  />
                ))}
              </>
            ) : m.state === 2 ? (
              <>
                <rect
                  x="-12"
                  y="-70"
                  width="24"
                  height="50"
                  rx="8"
                  fill={red}
                />
                <rect x="-6" y="-82" width="12" height="15" fill={red} />
              </>
            ) : m.state === 3 ? (
              <Label x={0} y={-47}>
                ?
              </Label>
            ) : null}
          </>
        );
      case "worker":
        return (
          <>
            <rect x="-27" y="-10" width="54" height="75" rx="8" fill={teal} />
            <circle cy="-27" r="22" fill="#d6c9ad" />
            {m.state === 0 ? (
              <path d="M-27-27a27 27 0 0 1 54 0z" fill={amber} />
            ) : m.state === 1 ? (
              <path d="M28 25a20 20 0 0 1 40 0z" fill={amber} />
            ) : (
              <rect x="-28" y="-55" width="56" height="50" fill="url(#hatch)" />
            )}
            <rect
              x="-32"
              y="-59"
              width="64"
              height="56"
              fill="none"
              stroke={m.state === 1 ? red : ink}
              strokeDasharray="5 4"
            />
          </>
        );
      case "scratch":
        return (
          <>
            <path
              d={`M-${m.size / 2} -2l${m.size} 4`}
              stroke={red}
              strokeWidth="4"
            />
            <rect
              x={-m.size / 2 - 7}
              y="-12"
              width={m.size + 14}
              height="24"
              fill="none"
              stroke={amber}
            />
            <Label x={0} y={50}>
              {m.size} px
            </Label>
          </>
        );
      case "chip":
        return (
          <>
            <path
              d={`M-${m.size / 2} -5l${m.size / 2} ${m.size} ${m.size / 2}-${m.size}`}
              fill="#edf3f3"
              stroke={red}
              strokeWidth="4"
            />
            <Label x={0} y={60}>
              {m.size} px
            </Label>
          </>
        );
      case "glare":
        return (
          <ellipse
            rx="60"
            ry="25"
            fill="white"
            opacity=".8"
            transform="rotate(-30)"
          />
        );
      case "pallet":
        return (
          <>
            <rect
              x="-48"
              y="-44"
              width="96"
              height="88"
              fill="#c6a56d"
              stroke={ink}
              strokeWidth="2"
            />
            {[-30, 0, 30].map((x) => (
              <path
                key={x}
                d={`M${x}-40v80`}
                stroke="#846a45"
                strokeWidth="5"
              />
            ))}
            <rect
              x="-53"
              y="-50"
              width="106"
              height="100"
              fill="none"
              stroke={teal}
              strokeDasharray="5 3"
            />
            <Label x={0} y={68}>
              P1
            </Label>
          </>
        );
      case "swimmer":
        return (
          <g opacity={m.state === 1 ? 0.2 : 1}>
            <ellipse rx="28" ry="10" fill={fill} />
            <circle cx="30" r="10" fill="#d5c8ad" />
            <path d="M-8-8l-18-12M-8 8l-18 12" stroke={fill} strokeWidth="5" />
            {m.state === 1 && (
              <path d="M-40-20l80 40" stroke={ink} strokeWidth="3" />
            )}
          </g>
        );
      case "insect":
        return m.state === 2 ? (
          <path d="M-12-12l25 6-8 23-23-8z" fill="#94a19a" />
        ) : (
          <>
            <ellipse
              rx={m.size}
              ry={m.size * 1.5}
              fill={m.state === 0 ? teal : "#856445"}
            />
            <path
              d={`M-${m.size} -5l-8-7M-${m.size} 0l-8 3M${m.size}-5l8-7M${m.size} 0l8 3`}
              stroke={m.state === 0 ? teal : "#856445"}
              strokeWidth="2"
            />
            <Label x={0} y={32}>
              {m.size} px
            </Label>
          </>
        );
      case "fruit":
        return (
          <>
            <ellipse
              rx="60"
              ry="55"
              fill={m.zone % 2 === 0 ? "#d2b858" : "#9eb568"}
              stroke="#758c45"
              strokeWidth="2"
            />
            <path
              d="M0-50q-8-22 14-28"
              fill="none"
              stroke="#536e40"
              strokeWidth="6"
            />
            {m.state > 0 && (
              <ellipse
                cx="15"
                cy="5"
                rx={Math.sqrt(m.state / 100) * 60}
                ry={Math.sqrt(m.state / 100) * 55}
                fill="#8a6041"
              />
            )}
            <Label x={0} y={82}>
              {m.state}%
            </Label>
            {selected && (
              <rect
                x="-70"
                y="-65"
                width="140"
                height="130"
                rx="10"
                fill="none"
                stroke={amber}
                strokeWidth="3"
              />
            )}
          </>
        );
      case "pellet":
        return <circle r="5" fill="#846337" stroke="#5e4829" />;
      case "leaf":
        return (
          <path
            d="M-20 0q20-30 40 0-20 30-40 0M-20 0h40"
            fill="#87a47a"
            stroke="#617b56"
          />
        );
      case "foam":
        return (
          <>
            {[-10, 0, 12].map((x, i) => (
              <circle
                key={x}
                cx={x}
                cy={(i % 2) * 10}
                r="10"
                fill="white"
                stroke="#b5d0d0"
              />
            ))}
          </>
        );
      case "waste":
        return (
          <>
            <rect
              x={-m.size}
              y={-m.size / 2}
              width={m.size * 2}
              height={m.size}
              fill={amber}
              stroke={ink}
            />
            <Label x={0} y={m.size + 20}>
              {2 * m.size * m.size}
            </Label>
          </>
        );
      default:
        return null;
    }
  })();
  return <g transform={`translate(${m.x} ${m.y})`}>{body}</g>;
}
export default function DomainScene({
  demo,
  scene,
  labels,
  zoneClass,
  zones,
}: {
  demo: LabDemo;
  scene: Scene;
  labels: string[];
  zoneClass: string;
  zones: boolean;
}) {
  const zone = (x: number, y: number, w: number, h: number) => (
    <rect x={x} y={y} width={w} height={h} rx="7" className={zoneClass} />
  );
  let stage: ReactNode = null;
  switch (demo) {
    case "queue":
    case "parking":
    case "forklift":
      return null;
    case "turning":
      stage = (
        <>
          <path
            d="M250 45h140v140h200v100H390v145H250V285H50V185h200z"
            fill="#d2dfe0"
          />
          <path
            d="M320 400V235H140M320 235V70M320 235H520"
            fill="none"
            stroke="#95aeb3"
            strokeDasharray="8 7"
            strokeWidth="3"
          />
          {zone(260, 345, 120, 70)}
          <Label x={320} y={440}>
            {labels[0]}
          </Label>
          <Label x={110} y={165}>
            {labels[1]}
          </Label>
          <Label x={320} y={65}>
            {labels[2]}
          </Label>
          <Label x={530} y={165}>
            {labels[3]}
          </Label>
          <polyline
            points={scene.values
              .reduce<string[]>((a, v, i) => {
                if (i % 2 === 0) a.push(`${v},${scene.values[i + 1]}`);
                return a;
              }, [])
              .join(" ")}
            fill="none"
            stroke={scene.scenario === 0 ? teal : amber}
            strokeWidth="5"
            opacity=".5"
          />
        </>
      );
      break;
    case "loading":
      stage = (
        <>
          {zone(135, 120, 370, 195)}
          <Label x={320} y={95}>
            {labels[0]}
          </Label>
          <path d="M100 375h440" stroke="#9bb0b5" strokeWidth="12" />
          <path
            d={`M100 375h${Math.min(scene.primary / 60, 1) * 440}`}
            stroke={scene.alert ? amber : teal}
            strokeWidth="12"
          />
          <Label x={320} y={420}>
            {labels[1]} · {scene.primary} s
          </Label>
        </>
      );
      break;
    case "bus":
      stage = (
        <>
          <rect x="90" y="58" width="460" height="35" rx="8" fill="#a7c3c8" />
          {[0, 1].map((i) => (
            <g key={i}>
              {zone(75 + i * 300, 110, 190, 235)}
              <Label x={170 + i * 300} y={100}>
                {labels[i]}
              </Label>
            </g>
          ))}
          <path
            d="M70 365h500"
            stroke={teal}
            strokeWidth="4"
            strokeDasharray="9 5"
          />
          <Label x={320} y={410}>
            {labels[2]} · {scene.secondary}
          </Label>
        </>
      );
      break;
    case "market":
      stage = (
        <>
          <rect x="270" y="75" width="80" height="320" fill="#c5b185" />
          {[0, 1].map((i) => (
            <g key={i}>
              {zone(100 + i * 270, 80, 155, 320)}
              {Array.from({ length: Math.min(scene.frame + 1, 8) }, (_, j) => (
                <ellipse
                  key={j}
                  cx={175 + i * 270}
                  cy={145 + j * 23}
                  rx={30 + scene.values[i] * 2}
                  ry="30"
                  fill={amber}
                  opacity=".06"
                />
              ))}
              <Label x={180 + i * 270} y={430}>
                {labels[i]} · {scene.values[i]}
              </Label>
            </g>
          ))}
        </>
      );
      break;
    case "gate":
      stage = (
        <>
          {[0, 1].map((i) => (
            <g key={i}>
              <rect
                x={70 + i * 310}
                y="75"
                width="160"
                height="55"
                rx="4"
                fill="#b4c7bc"
              />
              <path
                d={`M${70 + i * 310} 235h160`}
                stroke={i + 1 === scene.control ? teal : "#9bb0b5"}
                strokeWidth="5"
              />
              <path
                d={`M${120 + i * 310} 320v-130m-8 12 8-12 8 12M${185 + i * 310} 175v140m-8-12 8 12 8-12`}
                stroke={i === 0 ? teal : amber}
                fill="none"
                strokeWidth="3"
              />
              <Label x={150 + i * 310} y={105}>
                {labels[i]}
              </Label>
            </g>
          ))}
          <Label x={320} y={425}>
            {labels[2]}
          </Label>
        </>
      );
      break;
    case "shelf":
      stage = (
        <>
          <rect x="55" y="150" width="530" height="175" fill="#d8e2df" />
          <path d="M55 325h530M55 150h530" stroke={ink} strokeWidth="12" />
          <Label x={320} y={105}>
            {labels[0]}
          </Label>
          <Label x={320} y={390}>
            {labels[1]}: {scene.primary} · {labels[2]}: {scene.secondary}
          </Label>
        </>
      );
      break;
    case "bento":
      stage = (
        <>
          <rect
            x="105"
            y="85"
            width="430"
            height="335"
            rx="24"
            fill="#d7ded3"
            stroke={ink}
            strokeWidth="3"
          />
          <Label x={320} y={62}>
            {labels[0]}
          </Label>
        </>
      );
      break;
    case "recycling":
      stage = (
        <>
          {labels.map((l, i) => (
            <Label key={l} x={145 + i * 175} y={400}>
              {l}
            </Label>
          ))}
        </>
      );
      break;
    case "helmet":
      stage = (
        <>
          <rect x="385" y="100" width="180" height="270" fill="url(#hatch)" />
          {zone(385, 100, 180, 270)}
          <Label x={225} y={395}>
            {labels[0]}
          </Label>
          <Label x={475} y={395}>
            {labels[1]}
          </Label>
        </>
      );
      break;
    case "defect":
      stage = (
        <>
          <path
            d="M160 125h310v225H160z"
            fill="#b9c8cb"
            stroke={ink}
            strokeWidth="4"
          />
          {[0, 1].map((i) =>
            [0, 1].map((j) => (
              <rect
                key={`${i}${j}`}
                x={145 + i * 170}
                y={110 + j * 125}
                width="190"
                height="150"
                fill="none"
                stroke={teal}
                strokeDasharray="6 5"
                opacity=".5"
              />
            )),
          )}
          <Label x={320} y={80}>
            {labels[0]}
          </Label>
          <Label x={320} y={415}>
            {labels[1]}
          </Label>
        </>
      );
      break;
    case "pallet":
      stage = (
        <>
          <rect x="320" y="70" width="250" height="330" fill="#d8e4df" />
          <path
            d="M320 80v310"
            stroke={teal}
            strokeWidth="5"
            strokeDasharray="9 6"
          />
          <path
            d={`M110 335H530m${scene.control === 0 ? "-12-8 12 8-12 8" : "-408-8-12 8 12 8"}`}
            fill="none"
            stroke={amber}
            strokeWidth="3"
          />
          <Label x={460} y={90}>
            {labels[0]}
          </Label>
          <Label x={320} y={430}>
            {labels[1]}
          </Label>
          <Label x={170} y={90}>
            {labels[2]}
          </Label>
        </>
      );
      break;
    case "care":
      stage = (
        <>
          <path d="M70 180h500v140H70" fill="#d9e5e2" />
          <path
            d="M530 130v230"
            stroke={scene.control === 0 ? amber : teal}
            strokeWidth="10"
          />
          {zone(370, 185, 140, 130)}
          <Label x={210} y={150}>
            {labels[0]}
          </Label>
          <Label x={440} y={365}>
            {labels[1]}
          </Label>
          <Label x={530} y={110}>
            {labels[2]}
          </Label>
        </>
      );
      break;
    case "swimming":
      stage = (
        <>
          <rect x="65" y="60" width="510" height="350" rx="12" fill="#cee7e8" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <path
                d={`M75 ${165 + i * 120}h490`}
                stroke="#84b4bb"
                strokeWidth="5"
                strokeDasharray="12 9"
              />
              <Label x={320} y={85 + i * 120}>
                {labels[i]}
              </Label>
              {scene.control === i + 1 && zone(75, 65 + i * 120, 490, 100)}
            </g>
          ))}
          {scene.scenario === 2 && (
            <ellipse
              cx="390"
              cy="170"
              rx="100"
              ry="20"
              fill="white"
              opacity=".7"
            />
          )}
        </>
      );
      break;
    case "insects":
      stage = (
        <>
          <rect
            x="65"
            y="65"
            width="510"
            height="350"
            rx="8"
            fill="#e8d990"
            stroke="#a69860"
            strokeWidth="3"
          />
          {[1, 2].map((i) => (
            <path
              key={i}
              d={`M${65 + i * 170} 65v350M65 ${65 + i * 117}h510`}
              stroke={teal}
              strokeDasharray="6 6"
              opacity=".6"
            />
          ))}
          <Label x={320} y={445}>
            {labels[1]} · {scene.control} px
          </Label>
        </>
      );
      break;
    case "fruit":
      stage = (
        <>
          <rect x="55" y="55" width="530" height="365" rx="15" fill="#dce4d8" />
          <Label x={320} y={80}>
            {labels[0]}
          </Label>
          <Label x={320} y={450}>
            {labels[1]}
          </Label>
        </>
      );
      break;
    case "feed":
      stage = (
        <>
          <rect
            x="70"
            y="70"
            width="500"
            height="330"
            rx="20"
            fill={scene.unavailable ? "#95a9a0" : "#c4dfe0"}
          />
          {zone(135, 120, 370, 240)}
          {scene.unavailable && (
            <>
              <path
                d="M90 100l450 260M90 360l450-260"
                stroke="#d7ded3"
                strokeWidth="45"
                opacity=".6"
              />
              <Label x={320} y={255}>
                {labels[1]}
              </Label>
            </>
          )}
          <Label x={320} y={440}>
            {labels[0]}
          </Label>
        </>
      );
      break;
    case "water":
      stage = (
        <>
          <rect x="65" y="70" width="510" height="340" rx="15" fill="#c7e0e0" />
          <path
            d="M75 240h490"
            stroke="#98b8bc"
            strokeWidth="3"
            strokeDasharray="8 6"
          />
          {zone(75, scene.control === 1 ? 80 : 250, 490, 150)}
          <Label x={320} y={100}>
            {labels[0]}
          </Label>
          <Label x={320} y={395}>
            {labels[1]}
          </Label>
          {scene.scenario === 2 && (
            <path
              d="M90 110l430 200"
              stroke="white"
              strokeWidth="28"
              opacity=".3"
            />
          )}
        </>
      );
      break;
  }
  return (
    <g data-scene={demo} opacity={zones ? 1 : 0.65}>
      {stage}
      {scene.marks.map((m, i) => (
        <ObjectMark
          key={i}
          m={m}
          selected={
            demo === "fruit"
              ? m.state > scene.control
              : demo === "insects"
                ? m.state === 0 && m.size >= scene.control
                : demo === "bento"
                  ? scene.control === 0 || m.zone === scene.control
                  : demo === "swimming" ||
                      demo === "bus" ||
                      demo === "water" ||
                      demo === "gate"
                    ? m.zone === scene.control
                    : true
          }
        />
      ))}
      <Label x={590} y={450}>
        {String(scene.frame).padStart(2, "0")}
      </Label>
    </g>
  );
}
