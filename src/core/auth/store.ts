import { create } from 'zustand';
import type { MobileMe } from '@/core/api/types';
import { pickChildId } from './store-logic';

/** `mustChangePassword`: signed in with the default password, the app shows only the change-password screen. */
export type SessionStatus = 'restoring' | 'signedOut' | 'mustChangePassword' | 'signedIn';

interface SessionState {
  status: SessionStatus;
  me: MobileMe | null;
  selectedChildId: number | null;
  setSignedIn: (me: MobileMe, preferredChildId: number | null) => void;
  setSignedOut: () => void;
  setMustChangePassword: () => void;
  setSelectedChild: (id: number) => void;
}

export const useSession = create<SessionState>((set) => ({
  status: 'restoring',
  me: null,
  selectedChildId: null,
  setSignedIn: (me, preferredChildId) =>
    set({ status: 'signedIn', me, selectedChildId: pickChildId(me.children, preferredChildId) }),
  setSignedOut: () => set({ status: 'signedOut', me: null, selectedChildId: null }),
  setMustChangePassword: () => set({ status: 'mustChangePassword', me: null, selectedChildId: null }),
  setSelectedChild: (id) => set({ selectedChildId: id }),
}));

export const useRole = () => useSession((s) => s.me?.role ?? null);
export const useIsFamily = () => useSession((s) => s.me?.role === 'FAMILY');
