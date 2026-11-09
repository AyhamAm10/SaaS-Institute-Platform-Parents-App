import { create } from 'zustand';

interface SheetsState {
  childOpen: boolean;
  quickOpen: boolean;
  openChild: () => void;
  closeChild: () => void;
  openQuick: () => void;
  closeQuick: () => void;
}

/** Open/closed state of the two app-wide bottom sheets (mounted once in the app layout). */
export const useSheets = create<SheetsState>((set) => ({
  childOpen: false,
  quickOpen: false,
  openChild: () => set({ childOpen: true }),
  closeChild: () => set({ childOpen: false }),
  openQuick: () => set({ quickOpen: true }),
  closeQuick: () => set({ quickOpen: false }),
}));
