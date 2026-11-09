import { clampPercent } from './number';

export interface RingGeometry {
  radius: number;
  circumference: number;
  /** strokeDashoffset that shows `percent` of the circle. */
  offset: number;
}

export function ringGeometry(size: number, stroke: number, percent: number | null): RingGeometry {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clampPercent(percent) / 100);
  return { radius, circumference, offset };
}

/** Points for a sparkline polyline fitted to width x height (values 0-100). */
export function sparklinePoints(values: number[], width: number, height: number): string {
  if (values.length === 0) return '';
  const step = values.length > 1 ? width / (values.length - 1) : 0;
  return values
    .map((v, i) => `${(i * step).toFixed(1)},${(height - (clampPercent(v) / 100) * height).toFixed(1)}`)
    .join(' ');
}
