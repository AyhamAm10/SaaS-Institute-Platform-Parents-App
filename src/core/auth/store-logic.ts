import type { Child } from '@/core/api/types';

/** Picks the preferred child if it still exists, else the first one. */
export function pickChildId(children: Pick<Child, 'id'>[], preferred: number | null): number | null {
  if (preferred !== null && children.some((c) => c.id === preferred)) return preferred;
  return children[0]?.id ?? null;
}
