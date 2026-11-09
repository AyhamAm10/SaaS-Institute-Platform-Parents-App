import { useMemo } from 'react';
import { useSession } from './store';
import type { Child } from '@/core/api/types';

/** The currently selected child (STUDENT: always their own record). */
export function useSelectedChild(): Child | null {
  const me = useSession((s) => s.me);
  const id = useSession((s) => s.selectedChildId);
  return useMemo(() => me?.children.find((c) => c.id === id) ?? me?.children[0] ?? null, [me, id]);
}

export function useSelectedChildId(): number {
  // Screens render only when signed in with a child; 0 never reaches the API (queries are disabled).
  return useSelectedChild()?.id ?? 0;
}

export function useCanSwitchChild(): boolean {
  return useSession((s) => s.me?.role === 'FAMILY' && (s.me?.children.length ?? 0) > 1);
}
