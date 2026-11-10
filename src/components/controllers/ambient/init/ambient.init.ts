export type AmbientVariant = 'dawn' | 'wave' | 'pool' | 'glow' | 'ember' | 'calm' | 'login';

/** One liquid blob: where it sits (percent / px offsets), size, strength and how it drifts. */
export interface BlobConfig {
  top?: number | `${number}%`;
  bottom?: number | `${number}%`;
  start?: number | `${number}%`;
  end?: number | `${number}%`;
  size: number;
  opacity: number;
  drift: { x: number; y: number; rotate: number };
  seconds: number;
  /** Which closed outline to use (0-1). */
  shape: 0 | 1;
}

/** Closed outlines in a 200x200 box (same command structure as the dashboard blobs). */
export const BLOB_PATHS = [
  'M100,20 C145,20 180,55 180,100 C180,145 145,180 100,180 C55,180 20,145 20,100 C20,55 55,20 100,20 Z',
  'M100,30 C150,10 190,60 175,105 C160,155 130,185 90,175 C45,165 10,135 25,90 C38,50 60,42 100,30 Z',
] as const;

/** Positions differ per screen so the app never looks like one repeated wallpaper. */
export const AMBIENT: Record<AmbientVariant, BlobConfig[]> = {
  dawn: [
    { top: -110, end: -90, size: 400, opacity: 1, drift: { x: -34, y: 28, rotate: 14 }, seconds: 16, shape: 1 },
    { top: '48%', start: -150, size: 330, opacity: 0.7, drift: { x: 30, y: -26, rotate: -18 }, seconds: 19, shape: 0 },
    { bottom: -130, end: '8%', size: 300, opacity: 0.6, drift: { x: -24, y: -20, rotate: 20 }, seconds: 22, shape: 1 },
  ],
  wave: [
    { top: -70, start: -120, size: 380, opacity: 0.95, drift: { x: 30, y: 24, rotate: -12 }, seconds: 17, shape: 0 },
    { top: '55%', end: -140, size: 360, opacity: 0.75, drift: { x: -28, y: -30, rotate: 16 }, seconds: 21, shape: 1 },
  ],
  pool: [
    { top: '20%', end: -170, size: 380, opacity: 0.85, drift: { x: -30, y: 30, rotate: 18 }, seconds: 18, shape: 1 },
    { bottom: -140, start: -100, size: 360, opacity: 0.8, drift: { x: 26, y: -22, rotate: -14 }, seconds: 23, shape: 0 },
  ],
  glow: [
    { top: -140, start: '20%', size: 430, opacity: 1, drift: { x: 24, y: 30, rotate: 10 }, seconds: 20, shape: 0 },
    { bottom: '10%', end: -150, size: 320, opacity: 0.65, drift: { x: -22, y: -26, rotate: -16 }, seconds: 17, shape: 1 },
  ],
  ember: [
    { top: -60, end: -150, size: 360, opacity: 0.9, drift: { x: -26, y: 24, rotate: 18 }, seconds: 19, shape: 1 },
    { bottom: -100, start: -130, size: 380, opacity: 0.85, drift: { x: 30, y: -24, rotate: -10 }, seconds: 22, shape: 0 },
    { top: '42%', start: '30%', size: 220, opacity: 0.45, drift: { x: -18, y: 20, rotate: 24 }, seconds: 15, shape: 1 },
  ],
  calm: [
    { top: -100, start: -60, size: 340, opacity: 0.75, drift: { x: 24, y: 20, rotate: 12 }, seconds: 21, shape: 0 },
    { bottom: -120, end: -80, size: 340, opacity: 0.6, drift: { x: -22, y: -18, rotate: -12 }, seconds: 24, shape: 1 },
  ],
  login: [
    { top: '-6%', start: '-25%', size: 520, opacity: 2.2, drift: { x: 36, y: 30, rotate: 14 }, seconds: 15, shape: 1 },
    { bottom: '-10%', end: '-30%', size: 560, opacity: 1.8, drift: { x: -34, y: -28, rotate: -12 }, seconds: 19, shape: 0 },
  ],
};
