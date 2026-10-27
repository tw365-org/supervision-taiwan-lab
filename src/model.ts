import type { LabDemo } from "./lab";
export interface Actor {
  id: string;
  kind: "person" | "forklift";
  x: number;
  y: number;
  inside: boolean;
}
export interface Mark {
  x: number;
  y: number;
  kind: string;
  size: number;
  state: number;
  zone: number;
}
export interface Crossing {
  step: number;
  direction: "in" | "out";
  zone: number;
  id: string;
}
export interface Scene {
  actors: Actor[];
  occupied: boolean[];
  unknown: number[];
  primary: number;
  secondary: number;
  alert: boolean;
  unavailable: boolean;
  marks: Mark[];
  values: number[];
  frame: number;
  scenario: number;
  control: number;
  crossings: Crossing[];
}
/** Every reading derives from the exact deterministic geometry/state rendered for this step.
 * Steps are discrete synthetic observations, never inference, accuracy or live measurements. */
export function getScene(
  demo: LabDemo,
  scenario: number,
  frame: number,
  control: number,
  enabled: boolean,
): Scene {
  const scene: Scene = {
    actors: [],
    occupied: [],
    unknown: [],
    primary: 0,
    secondary: 0,
    alert: false,
    unavailable: false,
    marks: [],
    values: [],
    frame,
    scenario,
    control,
    crossings: [],
  };
  const mark = (
    x: number,
    y: number,
    kind: string,
    size = 12,
    state = 0,
    zone = 1,
  ) => scene.marks.push({ x, y, kind, size, state, zone });
  const trackLine = (
    id: string,
    zone: number,
    line: number,
    position: (step: number) => number,
  ) => {
    for (let step = 1; step <= frame; step++) {
      const before = position(step - 1),
        after = position(step);
      if (before > line && after <= line)
        scene.crossings.push({ step, direction: "in", zone, id });
      if (before <= line && after > line)
        scene.crossings.push({ step, direction: "out", zone, id });
    }
  };
  const ticks = frame + 1;
  switch (demo) {
    case "queue": {
      const count = [3, 6, 2][scenario] + (frame % 4 === 3 ? 1 : 0);
      scene.actors = Array.from({ length: count }, (_, i) => ({
        id: `Q${Math.floor(frame / 4) + 1}.${i + 1}`,
        kind: "person",
        x: 218 + (i % 2) * 58,
        y: 175 + Math.floor(i / 2) * 64,
        inside: true,
      }));
      scene.actors.push({
        id: "P1",
        kind: "person",
        x: 454,
        y: 168 + (frame % 3) * 18,
        inside: false,
      });
      if (scenario === 2)
        scene.actors.push({
          id: "P2",
          kind: "person",
          x: 445,
          y: 290,
          inside: false,
        });
      scene.primary = count;
      scene.secondary = (frame % 4) * 5;
      scene.alert = count >= control;
      break;
    }
    case "parking": {
      scene.occupied = Array.from({ length: 12 }, (_, i) =>
        scenario === 1
          ? frame % 4 < 2 || i !== 9
          : scenario === 2
            ? i !== 3 && i !== 8
            : (i + Math.floor(frame / 3)) % 3 !== 0,
      );
      scene.unknown = scenario === 2 ? [3, 8] : [];
      scene.primary = scene.occupied.filter(
        (v, i) => !v && !scene.unknown.includes(i),
      ).length;
      scene.secondary = scene.unknown.length;
      scene.alert = scene.primary <= control;
      break;
    }
    case "forklift": {
      const person =
        scenario === 1 || (scenario === 2 && frame % 6 >= 2 && frame % 6 <= 4);
      const vehicle = scenario !== 0 || frame % 4 >= 2;
      scene.actors = [
        {
          id: "P1",
          kind: "person",
          x: person ? 292 : 440,
          y: 242,
          inside: person,
        },
        {
          id: "F1",
          kind: "forklift",
          x: 245,
          y: vehicle ? 295 : 395,
          inside: vehicle,
        },
      ];
      scene.primary = Number(person) + Number(vehicle);
      scene.secondary =
        person && vehicle ? (scenario === 1 ? ticks : (frame % 6) - 1) * 2 : 0;
      scene.alert = person && vehicle && scene.secondary >= control;
      break;
    }
    case "turning": {
      const turn = scenario === 2 ? 2 : scenario;
      const path =
        turn === 0
          ? [
              [320, 400],
              [320, 260],
              [140, 235],
            ]
          : turn === 1
            ? [
                [320, 400],
                [320, 260],
                [320, 70],
              ]
            : [
                [320, 400],
                [320, 260],
                [520, 235],
              ];
      const t = Math.min(frame, 8) / 8;
      const segment = t < 0.5 ? 0 : 1;
      const local = segment === 0 ? t * 2 : (t - 0.5) * 2;
      const a = path[segment],
        b = path[segment + 1];
      const returning = scenario === 2 && frame > 8;
      const x = returning
        ? 520 - (frame - 8) * 45
        : a[0] + (b[0] - a[0]) * local;
      const y = returning ? 235 : a[1] + (b[1] - a[1]) * local;
      mark(x, y, scenario === 0 ? "scooter" : "car", 20, turn);
      scene.values = path.flat();
      scene.primary = control === turn && frame >= 8 ? 1 : 0;
      scene.secondary = returning ? 2 : 1;
      scene.alert = scene.primary > 0;
      break;
    }
    case "loading": {
      const present =
        scenario === 0
          ? frame < 5
          : scenario === 1
            ? true
            : frame < 3 || frame >= 6;
      const start = scenario === 2 && frame >= 6 ? 6 : 0;
      if (present) mark(320, 220, "truck", 60);
      scene.primary = present ? (frame - start + 1) * 5 : 0;
      scene.secondary = scenario === 2 && frame >= 6 ? 2 : 1;
      scene.values = [present ? 1 : 0, start];
      scene.alert = present && scene.primary >= control;
      break;
    }
    case "bus": {
      for (let zone = 1; zone <= 2; zone++) {
        const base = scenario === 1 ? (zone === 1 ? 5 : 2) : zone === 1 ? 2 : 1;
        for (let i = 0; i < base; i++)
          mark(
            115 + (zone - 1) * 300 + (i % 3) * 45,
            145 + Math.floor(i / 3) * 65,
            "person",
            14,
            0,
            zone,
          );
        const position = (step: number) =>
          scenario === 2
            ? step <= 6
              ? 435 - step * 35
              : 225 + (step - 6) * 45
            : 435 - Math.max(0, step - (zone - 1) * 2) * 30;
        const y = position(frame);
        mark(205 + (zone - 1) * 300, y, "person", 14, 1, zone);
        trackLine(`B${zone}`, zone, 365, position);
      }
      scene.primary = scene.marks.filter(
        (m) => m.zone === control && m.y >= 110 && m.y <= 345,
      ).length;
      scene.secondary = scene.crossings.filter(
        (e) => e.zone === control,
      ).length;
      scene.values = [1, 2].map(
        (zone) =>
          scene.marks.filter((m) => m.zone === zone && m.y >= 110 && m.y <= 345)
            .length,
      );
      scene.alert = scene.primary >= 6;
      break;
    }
    case "market": {
      const counts =
        scenario === 0
          ? [2 + (frame % 2), 2]
          : scenario === 1
            ? [2, 6 + (frame % 3)]
            : [7 + (frame % 2), 3];
      counts.forEach((count, z) => {
        for (let i = 0; i < count; i++)
          mark(
            150 + z * 270 + (i % 2) * 40,
            115 + Math.floor(i / 2) * 65,
            "person",
            12,
            0,
            z + 1,
          );
      });
      scene.primary = Math.max(...counts);
      scene.secondary = Array.from({ length: ticks }, (_, f) =>
        scenario === 0
          ? 4 + (f % 2)
          : scenario === 1
            ? 8 + (f % 3)
            : 10 + (f % 2),
      ).reduce((a, b) => a + b, 0);
      scene.values = counts;
      scene.alert = scene.primary >= control;
      break;
    }
    case "gate": {
      for (let zone = 1; zone <= 2; zone++) {
        const position = (step: number) =>
          scenario === 2
            ? step <= 6
              ? 350 - step * 30
              : 170 + (step - 6) * 35
            : 350 - Math.max(0, step - (zone - 1) * 2) * 20;
        mark(125 + (zone - 1) * 310, position(frame), "person", 18, 0, zone);
        trackLine(`G${zone}a`, zone, 235, position);
        if (scenario === 1) {
          const outbound = (step: number) =>
            140 + Math.max(0, step - (zone - 1) * 2) * 20;
          mark(185 + (zone - 1) * 310, outbound(frame), "person", 18, 1, zone);
          trackLine(`G${zone}b`, zone, 235, outbound);
        }
      }
      scene.primary = scene.crossings.filter(
        (e) => e.zone === control && e.direction === "in",
      ).length;
      scene.secondary = scene.crossings.filter(
        (e) => e.zone === control && e.direction === "out",
      ).length;
      scene.values = [scene.primary, scene.secondary];
      scene.alert = scene.primary + scene.secondary > 0;
      break;
    }
    case "shelf": {
      for (let i = 0; i < 6; i++) {
        const state =
          scenario === 0
            ? 0
            : scenario === 1
              ? i < 2 + (frame % 3)
                ? 1
                : 0
              : i < 2
                ? 2
                : i === 4
                  ? 1
                  : 0;
        mark(105 + i * 83, 245, "product", 32, state);
      }
      scene.primary = scene.marks.filter((m) => m.state === 1).length;
      scene.secondary = scene.marks.filter((m) => m.state === 2).length;
      scene.alert = scene.primary >= control;
      break;
    }
    case "bento": {
      for (let i = 0; i < 4; i++) {
        const state =
          scenario === 0
            ? 0
            : scenario === 1
              ? i === 1
                ? 1
                : 0
              : i === 0 || i === 2
                ? 1
                : i === 3 && frame % 4 < 2
                  ? 2
                  : 0;
        mark(
          215 + (i % 2) * 210,
          175 + Math.floor(i / 2) * 165,
          "dish",
          60,
          state,
          i + 1,
        );
      }
      scene.primary = scene.marks.filter(
        (m) => m.state === 1 && (control === 0 || m.zone === control),
      ).length;
      scene.secondary = scene.marks.filter((m) => m.state === 0).length;
      scene.alert = scene.primary > 0;
      break;
    }
    case "recycling": {
      const states =
        scenario === 0
          ? [0, 0, 0]
          : scenario === 1
            ? [frame < 3 ? 0 : 1, 0, 0]
            : [0, 2, 3];
      states.forEach((s, i) => mark(145 + i * 175, 250, "bin", 50, s, i + 1));
      scene.primary = states.filter((s) =>
        control === 0 ? s === 1 : control === 1 ? s === 2 : s === 1 || s === 2,
      ).length;
      scene.secondary = states.filter((s) => s === 3).length;
      scene.alert = scene.primary > 0;
      break;
    }
    case "helmet": {
      mark(190, 245, "worker", 30, 0, 1);
      mark(
        scenario === 2 && frame >= 4 ? 455 : 310,
        255,
        "worker",
        30,
        scenario === 0 ? 0 : scenario === 1 ? 1 : 2,
        scenario === 2 && frame >= 4 ? 2 : 1,
      );
      const missing = scenario === 1 ? 1 : 0,
        restricted = scenario === 2 && frame >= 4 ? 1 : 0;
      scene.primary =
        control === 0
          ? missing
          : control === 1
            ? restricted
            : missing + restricted;
      scene.secondary = scenario === 0 ? 2 : 1;
      scene.alert = scene.primary > 0;
      break;
    }
    case "defect": {
      if (scenario === 1) mark(290 + (frame % 3) * 8, 215, "scratch", 18);
      if (scenario === 2) {
        mark(472, 125, "chip", 24);
        mark(240, 250, "glare", 45);
      }
      scene.primary = scene.marks.filter(
        (m) => m.kind !== "glare" && m.size >= control,
      ).length;
      scene.secondary = Math.max(
        0,
        ...scene.marks.filter((m) => m.kind !== "glare").map((m) => m.size),
      );
      scene.alert = scene.primary > 0;
      break;
    }
    case "pallet": {
      const x =
        scenario === 0
          ? 120 + frame * 35
          : scenario === 1
            ? 520 - frame * 35
            : frame < 4
              ? 130 + frame * 40
              : frame < 7
                ? 260
                : 260 - (frame - 6) * 30;
      mark(x, 245, "pallet", 50);
      // The anchor never reaches x=320 in scenario 2: pausing short and returning creates no event.
      const inward = scenario === 0 && frame >= 6 ? 1 : 0,
        outward = scenario === 1 && frame >= 6 ? 1 : 0;
      scene.primary = control === 0 ? inward : outward;
      scene.secondary = control === 0 ? outward : inward;
      scene.alert = scene.primary > 0;
      break;
    }
    case "care": {
      const x =
        scenario === 0
          ? 120 + frame * 25
          : scenario === 1
            ? Math.min(430, 150 + frame * 55)
            : 150 + frame * 40;
      const near = scenario !== 0 && x >= 370 && x < 530,
        crossed = scenario === 2 && x >= 530;
      mark(x, scenario === 0 ? 350 : 245, "person", 20);
      scene.primary = control === 0 && (near || crossed) ? 1 : 0;
      scene.secondary = near ? (frame - (scenario === 1 ? 3 : 5)) * 2 : 0;
      scene.values = [near ? 1 : 0, crossed ? 1 : 0];
      scene.alert = scene.primary > 0;
      break;
    }
    case "swimming": {
      for (let lane = 1; lane <= 3; lane++) {
        const count = scenario === 1 ? lane + 2 : lane === 1 ? 2 : 1;
        for (let i = 0; i < count; i++)
          mark(
            110 + ((i * 120 + frame * 12) % 430),
            110 + (lane - 1) * 120,
            "swimmer",
            20,
            scenario === 2 && i === 0 ? 1 : 0,
            lane,
          );
      }
      scene.primary = scene.marks.filter(
        (m) => m.zone === control && m.state === 0,
      ).length;
      scene.secondary = scene.marks.filter(
        (m) => m.zone === control && m.state === 1,
      ).length;
      scene.alert = scene.primary >= 4;
      break;
    }
    case "insects": {
      const count = scenario === 1 ? 18 : 10;
      for (let i = 0; i < count; i++)
        mark(
          110 + ((i * 67) % 430),
          110 + Math.floor(i / 6) * 100 + (i % 2) * 35,
          "insect",
          3 + (i % 4) * 2,
          scenario === 2 && i % 4 === 0 ? 2 : i % 3 === 0 ? 1 : 0,
        );
      scene.primary = scene.marks.filter(
        (m) => m.state === 0 && m.size >= control,
      ).length;
      scene.secondary = scene.marks.length - scene.primary;
      scene.alert = scene.primary > 0;
      break;
    }
    case "fruit": {
      const spots =
        scenario === 0
          ? [0, 2, 1, 0]
          : scenario === 1
            ? [3, 12, 22, 7]
            : [6, 18, 4, 28];
      spots.forEach((s, i) =>
        mark(
          145 + (i % 2) * 340,
          155 + Math.floor(i / 2) * 175,
          "fruit",
          55,
          s,
          i + 1,
        ),
      );
      scene.primary = spots.filter((s) => s > control).length;
      scene.secondary = Math.max(...spots);
      scene.alert = scene.primary > 0;
      break;
    }
    case "feed": {
      scene.unavailable = scenario === 2;
      const count =
        scenario === 0 ? Math.max(0, 6 - Math.floor(frame / 2)) : 4 + frame;
      if (!scene.unavailable)
        for (let i = 0; i < count; i++)
          mark(160 + ((i * 47) % 320), 150 + ((i * 53) % 160), "pellet", 5);
      scene.primary = scene.marks.length;
      scene.secondary =
        frame === 0 ? 0 : scenario === 0 ? (frame % 2 === 0 ? -1 : 0) : 1;
      scene.alert = !scene.unavailable && scene.primary >= control;
      break;
    }
    case "water": {
      for (let i = 0; i < 5; i++) {
        const y = 130 + (i % 2) * 170;
        mark(
          110 + i * 100,
          y,
          i % 2 === 0 ? "leaf" : "foam",
          18,
          0,
          y < 240 ? 1 : 2,
        );
      }
      if (scenario !== 0) {
        for (let i = 0; i < (scenario === 1 ? 5 : 3); i++) {
          const y = scenario === 2 ? 130 + frame * 18 : 150 + i * 35;
          mark(
            130 + i * 85 + (frame % 4) * 8,
            y,
            "waste",
            12 + i * 3,
            0,
            y < 240 ? 1 : 2,
          );
        }
      }
      scene.primary = scene.marks
        .filter((m) => m.kind === "waste" && m.zone === control)
        .reduce((a, m) => a + 2 * m.size * m.size, 0);
      scene.secondary = scene.marks.filter(
        (m) => m.kind !== "waste" && m.zone === control,
      ).length;
      scene.alert = scene.primary > 0;
      break;
    }
  }
  scene.alert = enabled && scene.alert;
  return scene;
}
