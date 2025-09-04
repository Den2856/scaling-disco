import { useEffect, useMemo, useState } from "react";

export type DominantColorOpts = {
  size?: number;
  ignoreNearGray?: boolean;
  minSaturation?: number;
  clampLightness?: [number, number];
};


export default function useDominantColor(
  src: string | undefined,
  opts: DominantColorOpts = {}
) {
  const {
    size = 32,
    ignoreNearGray = true,
    minSaturation = 0.35,
    clampLightness = [0.3, 0.65],
  } = opts;

  const [hex, setHex] = useState<string | null>(null);

  const config = useMemo(
    () => ({ size, ignoreNearGray, minSaturation, clampLightness }),
    [size, ignoreNearGray, minSaturation, clampLightness]
  );

  useEffect(() => {
    if (!src) return;

    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.loading = "eager";
    img.src = src;

    img.onload = () => {
      if (cancelled) return;

      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      if (!w || !h) return;

      const scale =
        Math.max(w, h) > config.size ? config.size / Math.max(w, h) : 1;
      const cw = Math.max(1, Math.round(w * scale));
      const ch = Math.max(1, Math.round(h * scale));

      const canvas = document.createElement("canvas");
      canvas.width = cw;
      canvas.height = ch;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, cw, ch);
      const data = ctx.getImageData(0, 0, cw, ch).data;

      type Bucket = { count: number; r: number; g: number; b: number };
      const buckets: Map<string, Bucket> = new Map();

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        if (a < 128) continue;

        const { s, l } = rgbToHsl(r, g, b);
        if (config.ignoreNearGray && s < 0.08) continue;
        if (l < 0.06 || l > 0.94) continue;

        // 4-битная квантизация
        const key = `${r >> 4}-${g >> 4}-${b >> 4}`;
        const cell = buckets.get(key) ?? { count: 0, r: 0, g: 0, b: 0 };
        cell.count++;
        cell.r += r;
        cell.g += g;
        cell.b += b;
        buckets.set(key, cell);
      }

      const values = Array.from(buckets.values());
      if (values.length === 0) {
        setHex(null);
        return;
      }

      // самый «тяжёлый» бакет — строго типизированный reduce
      const best: Bucket = values.reduce<Bucket>((acc, v) => {
        return v.count > acc.count ? v : acc;
      }, values[0]);

      let r = Math.round(best.r / best.count);
      let g = Math.round(best.g / best.count);
      let b = Math.round(best.b / best.count);

      let { h: hh, s: ss, l: ll } = rgbToHsl(r, g, b);
      if (ss < config.minSaturation) ss = config.minSaturation;
      ll = clamp(ll, config.clampLightness[0], config.clampLightness[1]);
      const rgb = hslToRgb(hh, ss, ll);

      setHex(rgbToHex(rgb.r, rgb.g, rgb.b));
    };

    img.onerror = () => setHex(null);

    return () => {
      cancelled = true;
    };
  }, [src, config]);

  return hex;
}

function clamp(v: number, a: number, b: number) {
  return Math.min(Math.max(v, a), b);
}

function rgbToHex(r: number, g: number, b: number) {
  const to = (n: number) => n.toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number) {
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}
