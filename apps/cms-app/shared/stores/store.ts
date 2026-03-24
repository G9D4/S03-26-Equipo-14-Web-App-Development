'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export const useStore = create<State>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: 'cms-app',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
