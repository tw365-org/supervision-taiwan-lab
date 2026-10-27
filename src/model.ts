import type { Demo } from "./locales/types";
export interface Actor {
  id: string;
  kind: "person" | "forklift";
  x: number;
  y: number;
  inside: boolean;
}
export interface Scene {
  actors: Actor[];
  occupied: boolean[];
  primary: number;
  secondary: number;
  alert: boolean;
}
/** Pure mock-data module: screen geometry and readings always derive from the same frame. */
export function getScene(
  demo: Demo,
  scenario: number,
  frame: number,
  threshold: number,
  zones: boolean,
): Scene {
  if (demo === "queue") {
    const count = [3, 6, 2][scenario] + (frame % 4 === 3 ? 1 : 0);
    const actors: Actor[] = Array.from({ length: count }, (_, i) => ({
      id: `Q${i + 1}`,
      kind: "person",
      x: 218 + (i % 2) * 58,
      y: 175 + Math.floor(i / 2) * 64,
      inside: true,
    }));
    actors.push({
      id: "P1",
      kind: "person",
      x: 454,
      y: 168 + (frame % 3) * 18,
      inside: false,
    });
    if (scenario === 2)
      actors.push({ id: "P2", kind: "person", x: 445, y: 290, inside: false });
    return {
      actors,
      occupied: [],
      primary: count,
      secondary: threshold,
      alert: zones && count >= threshold,
    };
  }
  if (demo === "parking") {
    const occupied = Array.from({ length: 12 }, (_, i) =>
      scenario === 1
        ? frame % 4 < 2 || i !== 9
        : scenario === 2
          ? i !== 3 && i !== 8
          : (i + Math.floor(frame / 3)) % 3 !== 0,
    );
    const free = occupied.filter((value) => !value).length;
    return {
      actors: [],
      occupied,
      primary: free,
      secondary: 12,
      alert: zones && free === 0,
    };
  }
  const personInside = scenario === 1 || (scenario === 2 && frame % 4 >= 2);
  const forkliftInside = scenario !== 0 || frame % 4 >= 2;
  const actors: Actor[] = [
    {
      id: "P1",
      kind: "person",
      x: personInside ? 292 : 440,
      y: 242,
      inside: personInside,
    },
    {
      id: "F1",
      kind: "forklift",
      x: 245,
      y: forkliftInside ? 295 : 395,
      inside: forkliftInside,
    },
  ];
  return {
    actors,
    occupied: [],
    primary: actors.filter((a) => a.inside).length,
    secondary: 2,
    alert: zones && personInside && forkliftInside,
  };
}
