import { create } from "zustand";

interface PaginationStoreState {
  total: number;
  take: number;
  skip: number;

  setPagination: (data: { total: number; take: number; skip: number }) => void;
  resetPagination: () => void;
}

export const usePaginationStore = create<PaginationStoreState>((set) => ({
  total: 1,
  take: 20,
  skip: 0,

  setPagination: (data) =>
    set({
      total: data.total,
      skip: data.skip,
      take: data.take,
    }),

  resetPagination: () => set({ skip: 0 }),
}));
