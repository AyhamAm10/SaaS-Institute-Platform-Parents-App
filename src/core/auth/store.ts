import { create } from 'zustand';
import type { MobileMe } from '@/core/api/types';
import { pickChildId } from './store-logic';

export type SessionStatus = 'restoring' | 'signedOut' | 'signedIn';

interface SessionState {
  status: SessionStatus;
  me: MobileMe | null;
  selectedChildId: number | null;
  setSignedIn: (me: MobileMe, preferredChildId: number | null) => void;
  setSignedOut: () => void;
  setSelectedChild: (id: number) => void;
}

export const useSession = create<SessionState>((set) => ({
  status: 'restoring',
  me: null,
  selectedChildId: null,
  setSignedIn: (me, preferredChildId) =>
    set({ status: 'signedIn', me, selectedChildId: pickChildId(me.children, preferredChildId) }),
  setSignedOut: () => set({ status: 'signedOut', me: null, selectedChildId: null }),
  setSelectedChild: (id) => set({ selectedChildId: id }),
}));

export const useRole = () => useSession((s) => s.me?.role ?? null);
export const useIsFamily = () => useSession((s) => s.me?.role === 'FAMILY');
