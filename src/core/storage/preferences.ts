import { kvGet, kvSet } from './kv';

const CHILD_KEY = 'pref.selectedChild';

export async function loadSelectedChildId(): Promise<number | null> {
  const raw = await kvGet(CHILD_KEY);
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) ? n : null;
}

export function saveSelectedChildId(id: number): Promise<void> {
  return kvSet(CHILD_KEY, String(id));
}
