"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative "data city" field behind the home hero, in the spirit of the original maverickinnogarage.com
 * banner video: columns of red/orange data points stream toward the viewer through depth, with soft glowing
 * orbs, small data streaks, twinkling "+" sparkles and briefly flickering digits. The streams converge on the
 * operating-model diagram (the vanishing point), so the motion reads as flying into it.
 *
 * Lightweight by design: one 2D canvas at no more than 1x resolution, ~24 fps, a few hundred points batched into
 * a dozen fills, a pre-rendered glow sprite, paused when off-screen or when the tab is hidden, and a single still
 * frame under prefers-reduced-motion.
 * Purely decorative (aria-hidden, no pointer events); the page renders fully without it.
 */

/** A run of data points: vertical (fixed x, varying y) or a horizontal rail (fixed y, varying x). */
type Column = { x: number; z: number; ys: number[]; tint: number; rail: boolean };
type Orb = { x: number; y: number; z: number; r: number };
type Streak = { x: number; y: number; z: number; w: number };
type Sparkle = { u: number; v: number; phase: number; speed: number; s: number };
type Digit = { col: number; y: number; text: string; until: number };

const FAR = 2600;
const NEAR = 70;
const FOCAL = 430;
const SPEED = 95; // depth units per second
const RED = [255, 52, 40] as const;
const ORANGE = [255, 112, 60] as const;
const WHITE = [255, 236, 226] as const;

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(xs: readonly T[]) => xs[Math.floor(Math.random() * xs.length)]!;

export function HeroDataField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let vx = 0; // vanishing point
    let vy = 0;
    let dpr = 1;
    let columns: Column[] = [];
    let orbs: Orb[] = [];
    let streaks: Streak[] = [];
    let sparkles: Sparkle[] = [];
    let digits: Digit[] = [];
    let raf = 0;
    let last = 0;
    let visible = true;

    // Soft glow sprite, drawn once and stamped with drawImage.
    const glow = document.createElement("canvas");
    glow.width = glow.height = 64;
    const g = glow.getContext("2d")!;
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,120,80,0.95)");
    grad.addColorStop(0.25, "rgba(255,60,40,0.55)");
    grad.addColorStop(1, "rgba(255,40,30,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);

    const spawnColumn = (z: number): Column => {
      const rail = Math.random() < 0.28;
      if (rail) {
        // Horizontal rail of points (x positions in ys), on a "floor" or "ceiling" plane.
        const count = Math.round(rand(10, 18));
        const start = rand(-1800, 400);
        const gap = rand(70, 120);
        return { x: pick([-1, 1]) * rand(420, 760), z, ys: Array.from({ length: count }, (_, i) => start + i * gap), tint: Math.random(), rail };
      }
      const count = Math.round(rand(10, 18));
      const top = rand(-1200, -250);
      const gap = rand(50, 85);
      return {
        x: pick([-1, 1]) * rand(60, 1900),
        z,
        ys: Array.from({ length: count }, (_, i) => top + i * gap + rand(-6, 6)),
        tint: Math.random(),
        rail,
      };
    };
    const spawnOrb = (z: number): Orb => ({ x: rand(-1700, 1700), y: rand(-950, 950), z, r: rand(16, 38) });
    const spawnStreak = (z: number): Streak => ({ x: rand(-1500, 1500), y: rand(-700, 700), z, w: rand(18, 34) });

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      // Ambient art doesn't need full resolution: cap the backing store at 1x (0.75x on large screens).
      dpr = Math.min(window.devicePixelRatio || 1, 1) * (rect.width > 1200 ? 0.75 : 1);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const wide = width >= 1024;
      // Converge on the diagram: right column on desktop, lower half when stacked.
      vx = wide ? width * 0.73 : width * 0.5;
      vy = wide ? height * 0.5 : height * 0.72;
      const density = Math.min(1, Math.max(0.45, width / 1440));
      columns = Array.from({ length: Math.round(52 * density) }, () => spawnColumn(rand(NEAR + 200, FAR)));
      orbs = Array.from({ length: Math.round(26 * density) }, () => spawnOrb(rand(NEAR + 200, FAR)));
      streaks = Array.from({ length: Math.round(18 * density) }, () => spawnStreak(rand(NEAR + 200, FAR)));
      sparkles = Array.from({ length: Math.round(20 * density) }, () => ({
        u: Math.random(),
        v: Math.random(),
        phase: rand(0, Math.PI * 2),
        speed: rand(0.6, 1.4),
        s: rand(3, 6),
      }));
      digits = [];
    };

    // Brightness by depth: invisible at the far plane, full mid-way, fading out just before the viewer.
    const depthAlpha = (z: number) => {
      const far = 1 - z / FAR;
      const near = Math.min(1, (z - NEAR) / 260);
      return Math.max(0, Math.min(1, far * 1.7)) * Math.max(0, near);
    };

    const rgba = (c: readonly number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;

    const draw = (t: number, dt: number) => {
      ctx.clearRect(0, 0, width, height);
      const step = SPEED * dt;

      // Data columns: vertical runs of points moving toward the viewer. Points are batched into one path per
      // colour and brightness level, so a frame needs about a dozen fills instead of hundreds.
      const buckets = new Map<string, { color: readonly number[]; alpha: number; path: Path2D }>();
      const bucket = (color: readonly number[], a: number) => {
        const level = Math.max(1, Math.round(a * 5)) / 5;
        const key = `${color[1]}-${level}`;
        let b = buckets.get(key);
        if (!b) buckets.set(key, (b = { color, alpha: level, path: new Path2D() }));
        return b.path;
      };
      const heads: { x: number; y: number; r: number; a: number }[] = [];
      columns.forEach((c, i) => {
        c.z -= step;
        if (c.z < NEAR) columns[i] = c = spawnColumn(FAR);
        const scale = FOCAL / c.z;
        const a = depthAlpha(c.z);
        if (a <= 0.03) return;
        const color = c.tint > 0.85 ? WHITE : c.tint > 0.45 ? ORANGE : RED;
        const size = Math.max(1.1, 3.1 * scale);
        const path = bucket(color, Math.min(1, a * 1.05));
        if (c.rail) {
          // Horizontal rail: c.x is the plane's height, c.ys holds the x positions.
          const sy = vy + c.x * scale;
          if (sy < -10 || sy > height + 10) return;
          for (const x of c.ys) {
            const sx = vx + x * scale;
            if (sx < -10 || sx > width + 10) continue;
            path.rect(sx - size / 2, sy - size / 2, size, size);
          }
          return;
        }
        const sx = vx + c.x * scale;
        if (sx < -40 || sx > width + 40) return;
        for (const y of c.ys) {
          const sy = vy + y * scale;
          if (sy < -10 || sy > height + 10) continue;
          path.rect(sx - size / 2, sy - size / 2, size, size);
        }
        // Glowing head on nearer columns.
        if (scale > 0.3) heads.push({ x: sx, y: vy + c.ys[0]! * scale, r: 12 * scale, a: a * 0.75 });
      });
      buckets.forEach((b) => {
        ctx.fillStyle = rgba(b.color, b.alpha);
        ctx.fill(b.path);
      });
      heads.forEach((h) => {
        ctx.globalAlpha = h.a;
        ctx.drawImage(glow, h.x - h.r, h.y - h.r, h.r * 2, h.r * 2);
      });
      ctx.globalAlpha = 1;

      // Bokeh orbs.
      orbs.forEach((o, i) => {
        o.z -= step * 0.8;
        if (o.z < NEAR) orbs[i] = o = spawnOrb(FAR);
        const scale = FOCAL / o.z;
        const r = o.r * scale;
        const sx = vx + o.x * scale;
        const sy = vy + o.y * scale;
        if (sx < -r || sx > width + r || sy < -r || sy > height + r) return;
        ctx.globalAlpha = Math.min(1, depthAlpha(o.z) * 0.95);
        ctx.drawImage(glow, sx - r, sy - r, r * 2, r * 2);
        ctx.globalAlpha = 1;
      });

      // Data streaks: three short stacked dashes, like packets of text.
      streaks.forEach((s, i) => {
        s.z -= step * 1.15;
        if (s.z < NEAR) streaks[i] = s = spawnStreak(FAR);
        const scale = FOCAL / s.z;
        const sx = vx + s.x * scale;
        const sy = vy + s.y * scale;
        if (sx < -60 || sx > width + 60 || sy < -20 || sy > height + 20) return;
        const a = depthAlpha(s.z) * 0.8;
        const w = s.w * scale;
        const h = Math.max(0.8, 1.6 * scale);
        ctx.fillStyle = rgba(ORANGE, a);
        ctx.fillRect(sx, sy, w, h);
        ctx.fillRect(sx, sy + h * 2.6, w * 0.7, h);
        ctx.fillRect(sx, sy + h * 5.2, w * 0.85, h);
      });

      // Twinkling "+" sparkles (screen space).
      ctx.lineWidth = 1.2;
      sparkles.forEach((p) => {
        const a = 0.15 + 0.55 * Math.max(0, Math.sin(p.phase + t * 0.001 * p.speed));
        if (a < 0.2) return;
        const x = p.u * width;
        const y = p.v * height;
        ctx.strokeStyle = rgba(WHITE, a * 0.8);
        ctx.beginPath();
        ctx.moveTo(x - p.s, y);
        ctx.lineTo(x + p.s, y);
        ctx.moveTo(x, y - p.s);
        ctx.lineTo(x, y + p.s);
        ctx.stroke();
      });

      // Flickering digits beside a few near columns.
      if (!reduced && digits.length < 3 && Math.random() < dt * 0.9) {
        const near = columns.map((c, i) => ({ c, i })).filter(({ c }) => !c.rail && c.z < FAR * 0.45 && c.z > NEAR + 300);
        if (near.length) {
          const { c, i } = pick(near);
          digits.push({ col: i, y: pick(c.ys), text: `.${Math.floor(rand(100, 999))}`, until: t + rand(700, 1600) });
        }
      }
      digits = digits.filter((d) => d.until > t && columns[d.col]);
      ctx.font = "600 11px ui-monospace, SFMono-Regular, Menlo, monospace";
      digits.forEach((d) => {
        const c = columns[d.col]!;
        const scale = FOCAL / c.z;
        const sx = vx + c.x * scale + 6;
        const sy = vy + d.y * scale;
        const flicker = Math.random() > 0.15 ? 1 : 0.3;
        ctx.fillStyle = rgba(ORANGE, depthAlpha(c.z) * 0.9 * flicker);
        ctx.save();
        ctx.translate(sx, sy);
        ctx.scale(Math.max(0.8, scale * 1.6), Math.max(0.8, scale * 1.6));
        ctx.fillText(d.text, 0, 0);
        ctx.restore();
      });

    };

    // Ambient motion doesn't need 60 fps: draw at most ~24 frames a second to keep the main thread free.
    const FRAME_MS = 41;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (last && t - last < FRAME_MS) return;
      const dt = Math.min(0.1, last ? (t - last) / 1000 : 0.033);
      last = t;
      draw(t, dt);
    };
    const start = () => {
      if (raf || reduced || !visible || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    setup();
    if (reduced) {
      // One still frame: advance the field a little so it isn't empty, then draw once.
      draw(0, 0);
    } else {
      start();
    }

    const resize = new ResizeObserver(() => {
      setup();
      if (reduced) draw(0, 0);
    });
    resize.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      resize.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
